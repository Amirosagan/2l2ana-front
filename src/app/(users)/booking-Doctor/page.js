import api from '@/src/utils/api';
import DoctorList from "@/src/components/Doctors/DoctorList";
import DoctorSearchClient from "@/src/components/Doctors/DoctorSearchClient";

export async function generateMetadata() {
  try {
    const res = await api.get('/Doctor/GetDoctors', {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
    const data = res.data;

    const doctorInfo = data.items.map(doctor => `${doctor.firstName} ${doctor.lastName} - ${doctor.category}`).join(', ');

    return {
      metadataBase: new URL('https://2l2ana.com'),
      title: `احجز دكتور اونلاين | قلقانة`,
      description: `اكتشف أفضل الأطباء واستفد من الاستشارات الطبية المتخصصة. تشمل القائمة: ${doctorInfo}.`,
      keywords: "احجز دكتور, استشارة طبية, نصائح طبية, حجز استشارة طبية, طبيب اونلاين, طبيب عبر الإنترنت, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص",
      author: "قلقانة",
      openGraph: {
        title: `احجز دكتور | قلقانة`,
        description: `اكتشف أفضل الأطباء واستفد من الاستشارات الطبية المتخصصة. تشمل القائمة: ${doctorInfo}.`,
        type: 'website',
        url: `https://2l2ana.com/doctors`,
        images: [
          {
            url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdoctor-image.abc123.png&w=1080&q=75', 
            width: 800,
            height: 600,
            alt: 'احجز دكتور',
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Error | قلقانة",
      description: "Error generating metadata",
    };
  }
}

export default async function MainDoctorPage({ searchParams }) {
  const { searchTerm = "", category = "" } = searchParams || {};

  try {
    const response = await api.get('/Doctor/GetDoctors', {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
  
    const filteredDoctors = response.data.items.filter(doctor => 
      doctor.isAvailable &&
      (category ? doctor.category.trim().toLowerCase() === category.trim().toLowerCase() : true) &&
      (searchTerm ? (
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
    );
  
    const initialDoctorList = filteredDoctors.slice(0, 12);
  
    return (
      <div className="mt-14 md:mt-5 lg:-mt-5 pb-3">
        <div className="xl:mx-[7%] mx-10 m-auto">
          <DoctorSearchClient searchTerm={searchTerm} category={category} />
  
          <DoctorList doctorList={initialDoctorList} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return <div>Error loading doctors</div>;
  }
}
