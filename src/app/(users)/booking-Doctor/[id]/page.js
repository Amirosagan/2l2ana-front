import api from "@/src/utils/api";
import DoctorDetailsPageClient from "./client";

export async function generateMetadata({ params }) {
  const { id } = params;
  const response = await api.get(`/Doctor/${id}`);
  const doctor = response.data;

  return {
    title: ` قلقانة | ${doctor.name}`,
    description: doctor.description || "احصل على استشارة طبية من أفضل الأطباء المتخصصين.",
    keywords: "تفاصيل الطبيب, استشارة طبية, أطباء متخصصون, حجز استشارة, معلومات الطبيب",
    author: "قلقانة",
    openGraph: {
      title: `تفاصيل الطبيب | ${doctor.name}`,
      description: doctor.description || "احصل على استشارة طبية من أفضل الأطباء المتخصصين.",
      type: 'profile',
      url: `https://2l2ana.com/doctor/${id}`,
      images: [
        {
          url: doctor.imageUrl,
          width: 800,
          height: 600,
          alt: doctor.name,
        },
      ],
    },
  };
}

export async function getDoctorData(id) {
  try {
    const response = await api.get(`/Doctor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch doctor data:", error);
    return null;
  }
}

const DoctorDetailsPageServer = async ({ params }) => {
  const { id } = params;
  const doctor = await getDoctorData(id);

  return <DoctorDetailsPageClient doctor={doctor} />;
};

export default DoctorDetailsPageServer;
