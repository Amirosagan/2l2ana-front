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



const DoctorDetailsPage = async ({ params }) => {
  const { id } = params;
  const doctor = await getDoctorData(id);

  if (!doctor) {
    return <div>Failed to load doctor details. Please try again later.</div>;
  }

  return (
    <div dir="rtl" className="p-5 -mt-5 md:mt-0 md:px-32">
      <h2 className="tajawal-bold text-[22px] hidden md:block text-primary">تفاصيل</h2>
      {/* <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
        <div className="lg:col-span-6 mb-10">
          <Details doctor={doctor} />
        </div>
        <div className="lg:col-span-3 lg:mx-5 m-auto mt-5 lg:min-w-[370px] w-full">
          <SuggestionList />
        </div>
      </div> */}
    </div>
  );
};

export default DoctorDetailsPage;
