import Image from "next/image";

const SingleDoctorPage = async ({ params }) => {
  const { id } = params;

  let doctorData = null;
  let error = null;

  try {
    const response = await fetch(`https://api.2l2ana.com/api/Doctor/${id}`, {
      headers: {
        Authorization: `Bearer your-token-here`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor data");
    }

    doctorData = await response.json();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-5 px-7 mt-5 bg-white rounded-lg shadow-lg border-solid border w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <Image src={doctorData.imageUrl} alt={doctorData.name} width={200} height={200} />
      <div>
        <h1>{doctorData.name}</h1>
        <p>{doctorData.description}</p>
        <p>{doctorData.headLine}</p>
        <p>Category: {doctorData.category}</p>
        <p>Rating: {doctorData.rating} ({doctorData.ratingCount} reviews)</p>
        <p>Consultation Price: ${doctorData.consultationPrice}</p>
        <p>{doctorData.isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default SingleDoctorPage;
