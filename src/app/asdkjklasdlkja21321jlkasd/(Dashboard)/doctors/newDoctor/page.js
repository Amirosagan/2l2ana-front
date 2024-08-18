import NewDoctorForm from './client';

export async function generateMetadata() {
  return {
    title: `Register a New Doctor | قلقانة`,
    description: `Register a new doctor on قلقانة and start offering medical consultations online.`,
    keywords: "register doctor, medical consultation, online doctor registration, قلقانة",
    author: "قلقانة",
    openGraph: {
      title: `Register a New Doctor | قلقانة`,
      description: `Register a new doctor on قلقانة and start offering medical consultations online.`,
      type: 'website',
      url: `https://2l2ana.com/register`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdoctor-registration.abc123.png&w=1080&q=75', 
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
