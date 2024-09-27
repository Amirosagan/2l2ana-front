import axios from "axios";
import Details from "@/src/components/Doctors/DoctorDetails";
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";

async function getDoctorData(id) {
  try {
    const response = await axios.get(`https://api.2l2ana.com/api/Doctor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch doctor data for ID ${id}:`, error);
    return null;
  }
}

// export async function generateStaticParams() {
//   try {
//     const response = await axios.get('https://api.2l2ana.com/api/Doctor', {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     });
//     const doctors = response.data;

//     const paths = doctors.map((doctor) => ({
//       id: doctor.id.toString(),
//     }));

//     return paths;
//   } catch (error) {
//     console.error("Failed to generate static params:", error);
//     return [];
//   }
// }

export async function generateMetadata({ params }) {
  const { id } = params;
  const doctor = await getDoctorData(id);

  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `قلقانة | ${doctor?.name || 'Doctor Details'}`,
    description: doctor?.description || "احصل على استشارة طبية من أفضل الأطباء المتخصصين.",
    keywords: "تفاصيل الطبيب, استشارة طبية, أطباء متخصصون, حجز استشارة, معلومات الطبيب",
    author: "قلقانة",
    openGraph: {
      title: `تفاصيل الطبيب | ${doctor?.name || 'Doctor Details'}`,
      description: doctor?.description || "احصل على استشارة طبية من أفضل الأطباء المتخصصين.",
      type: 'profile',
      url: `https://2l2ana.com/doctor/${id}`,
      images: [
        {
          url: doctor?.imageUrl || 'default-image-url.jpg',
          width: 800,
          height: 600,
          alt: doctor?.name || 'Doctor',
        },
      ],
    },
  };
}

const DoctorDetailsPage = async ({ params }) => {
  const { id } = params;
  const doctor = await getDoctorData(id);

  if (!doctor) {
    return <div>Failed to load doctor details. Please try again later.</div>;
  }

  return (
    <div dir="rtl" className="p-5 -mt-5 md:mt-0 md:px-32">
    
       <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
        <div className="lg:col-span-6 mb-10">
          <Details doctor={doctor} />
        </div>
        <div className="lg:col-span-3 lg:mx-5 m-auto mt-5 lg:min-w-[370px] w-full">
          <SuggestionList />
        </div>
       
      </div> 
      
    </div>
  );
};

export default DoctorDetailsPage;
