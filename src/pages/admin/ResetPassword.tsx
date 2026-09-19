import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, CheckCircle2 } from "lucide-react";
import logoLams from "@/assets/logo-new.webp";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("حدث خطأ أثناء تحديث كلمة المرور. حاول مرة أخرى.");
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 3000);
    }
    setLoading(false);
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 text-center">
          <img src={logoLams} alt="لمس" className="h-16 w-16 mx-auto rounded-xl object-cover mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">رابط غير صالح</h1>
          <p className="text-muted-foreground text-sm mb-4">يرجى استخدام رابط استعادة كلمة المرور المرسل إلى بريدك الإلكتروني</p>
          <Button onClick={() => navigate("/admin/login")} className="bg-primary font-bold">
            العودة لتسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 text-center">
          <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">تم تحديث كلمة المرور بنجاح!</h1>
          <p className="text-muted-foreground text-sm">جاري التحويل لصفحة تسجيل الدخول...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src={logoLams} alt="لمس" className="h-16 w-16 mx-auto rounded-xl object-cover mb-4" />
            <h1 className="text-2xl font-bold text-foreground">تعيين كلمة مرور جديدة</h1>
            <p className="text-muted-foreground text-sm mt-1">أدخل كلمة المرور الجديدة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="كلمة المرور الجديدة"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
                dir="ltr"
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                required
                dir="ltr"
              />
            </div>

            {error && <p className="text-destructive text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full bg-primary font-bold h-12" disabled={loading}>
              {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
