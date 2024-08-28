import PodcastLayout from "./PodcastLayout";
import api from "@/src/utils/api";

const RecentPodcast = async ({ Home }) => {
    let podcasts = [];

    try {
        const response = await api.get('/Podcast');
        podcasts = response.data.podcasts;

        if (Home) {
            podcasts = podcasts.slice(0, 3); 
        }

        if (podcasts.length === 0) {
            return (
                <section className="w-full mb-5 px-5 sm:px-10 md:px-24 flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="tajawal-bold w-fit text-primary/90 inline-block mt-20 font-bold capitalize text-xl md:text-3xl">
                            {Home ? "بودكاست قلقانة" : "شاهد أيضاً"}:
                        </h2>
                    </div>
                    <p>No podcasts available.</p>
                </section>
            );
        }
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        return (
            <section className="w-full mb-5 px-5 sm:px-10 md:px-24 flex flex-col items-center justify-center">
                <p>Error loading podcasts.</p>
            </section>
        );
    }

    return (
        <section className="w-full mb-5 lg:mt-20 px-5 lg:px-24 flex flex-col items-center justify-center">
            <div className="w-full items-center flex justify-between">
                <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-xl md:text-3xl">
                    {Home ? "بودكاست قلقانة" : "شاهد أيضاً"}:
                </h2>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10">
                {podcasts.map((podcast, index) => (
                    <PodcastLayout key={index} podcast={podcast} />
                ))}
            </div>
        </section>
    );
};

export default RecentPodcast;
