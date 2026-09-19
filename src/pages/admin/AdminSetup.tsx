import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoLams from "@/assets/logo-lams.webp";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setLoading(false);
      return;
    }

    const { data, error: fnError } = await supabase.functions.invoke("setup-admin", {
      body: { email, password },
    });

    if (fnError || data?.error) {
      setError(data?.error || fnError?.message || "حدث خطأ");
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src={logoLams} alt="لمس" className="h-16 w-16 mx-auto rounded-xl object-cover mb-4" />
            <Shield className="h-8 w-8 mx-auto text-secondary mb-2" />
            <h1 className="text-2xl font-bold text-foreground">إعداد حساب المدير</h1>
            <p className="text-muted-foreground text-sm mt-1">إنشاء أول حساب مدير للوحة التحكم</p>
          </div>

          {success ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-bold text-lg mb-2">✅ تم إنشاء حساب المدير بنجاح!</p>
              <p className="text-muted-foreground text-sm">جاري التوجيه لصفحة تسجيل الدخول...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="pr-10" required dir="ltr" />
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="كلمة المرور (6 أحرف على الأقل)" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" required dir="ltr" />
              </div>
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-primary font-bold h-12" disabled={loading}>
                {loading ? "جاري الإنشاء..." : "إنشاء حساب المدير"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
