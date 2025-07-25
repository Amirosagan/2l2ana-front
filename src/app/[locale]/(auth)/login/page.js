import LoginForm from "@/src/components/Login/LoginForm";
import Head from "next/head";


const LoginPage = () => {
  return (
    <>
      <Head>
        <title>تسجيل الدخول | متطمنة</title>
        <meta name="description" content="تسجيل الدخول إلى منصة متطمنة للوصول إلى حسابك والاستفادة من جميع الخدمات الطبية المقدمة." />
        <meta name="keywords" content="تسجيل الدخول, متطمنة, منصة طبية, استشارة طبية, خدمات طبية, طبيب اونلاين" />
        <meta name="author" content="متطمنة" />
        <meta property="og:title" content="تسجيل الدخول | متطمنة" />
        <meta property="og:description" content="تسجيل الدخول إلى منصة متطمنة للوصول إلى حسابك والاستفادة من جميع الخدمات الطبية المقدمة." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mettamena.com/login" />
        <meta property="og:image" content="https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin-image.abc123.png&w=1080&q=75" />
      </Head>
      <div className="flex justify-center items-center min-h-screen max-h-screen h-screen overflow-hidden">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
