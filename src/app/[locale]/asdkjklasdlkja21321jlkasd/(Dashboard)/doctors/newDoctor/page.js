import NewDoctorForm from './client';

export async function generateMetadata() {
  return {
    title: `Register a New Doctor | متطمنة`,
    description: `Register a new doctor on متطمنة and start offering medical consultations online.`,
    keywords: "register doctor, medical consultation, online doctor registration, متطمنة",
    author: "متطمنة",
    openGraph: {
      title: `Register a New Doctor | متطمنة`,
      description: `Register a new doctor on متطمنة and start offering medical consultations online.`,
      type: 'website',
      url: `https://mettamena.com/register`,
      images: [
        {
          url: 'https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdoctor-registration.abc123.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'Register Doctor',
        },
      ],
    },
  };
}

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <NewDoctorForm />
    </div>
  );
};

export default RegisterPage;
