import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight } from "lucide-react";
import logoLams from "@/assets/logo-new.webp";

const normalizeSiteOrigin = (value?: string | null) => {
  const raw = (value || "").trim();
  if (!raw) return "";

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "";
  }
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("أدخل البريد الإلكتروني أولاً");
      return;
    }

    setLoading(true);

    const { data: siteSetting } = await supabase
      .from("company_settings")
      .select("value")
      .eq("key", "site_url")
      .maybeSingle();

    const configuredOrigin = normalizeSiteOrigin(siteSetting?.value);
    const redirectBase = configuredOrigin || window.location.origin;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${redirectBase}/reset-password`,
    });

    if (error) {
      if (/redirect/i.test(error.message)) {
        setError("رابط الموقع الرسمي غير مضبوط بشكل صحيح من إعدادات الأدمن.");
      } else {
        setError("حدث خطأ. تأكد من البريد الإلكتروني وحاول مرة أخرى.");
      }
    } else {
      setResetSent(true);
    }

    setLoading(false);
  };

  if (resetSent) {
    return (
      <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 text-center">
          <Mail className="h-16 w-16 mx-auto text-secondary mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">تم إرسال رابط الاستعادة</h1>
          <p className="text-muted-foreground text-sm mb-4">
            تم إرسال رابط استعادة كلمة المرور إلى <strong dir="ltr">{email}</strong>
            <br />تفقد بريدك الإلكتروني واتبع التعليمات
          </p>
          <Button onClick={() => { setResetSent(false); setForgotMode(false); }} variant="outline" className="font-bold">
            العودة لتسجيل الدخول
          </Button>
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
            <h1 className="text-2xl font-bold text-foreground">
              {forgotMode ? "استعادة كلمة المرور" : "لوحة التحكم"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {forgotMode ? "أدخل بريدك الإلكتروني لإرسال رابط الاستعادة" : "تسجيل دخول المدير"}
            </p>
          </div>

          <form onSubmit={forgotMode ? handleForgotPassword : handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10"
                required
                dir="ltr"
              />
            </div>

            {!forgotMode && (
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                  dir="ltr"
                />
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full bg-primary font-bold h-12" disabled={loading}>
              {loading ? "جاري المعالجة..." : forgotMode ? "إرسال رابط الاستعادة" : "تسجيل الدخول"}
            </Button>

            <button
              type="button"
              onClick={() => { setForgotMode(!forgotMode); setError(""); }}
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              {forgotMode ? (
                <>
                  <ArrowRight className="h-3 w-3" />
                  العودة لتسجيل الدخول
                </>
              ) : (
                "نسيت كلمة المرور؟"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
