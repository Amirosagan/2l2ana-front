import RegisterForm from "@/src/components/Login/RegisterForm";

export const metadata = {
  title: 'انشاء حساب | متطمنة ' ,
  description: 'اهلا بيكي في اكبر مجتمع يخص صحة النساء في الوطن العربي',
};
const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen max-h-screen h-screen overflow-hidden">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
