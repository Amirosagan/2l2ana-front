import PodcastLayoutSkeleton from "./PodcastLayoutSkeleton";

const RecentPodcastSkeleton = ({ Home }) => {
    return (
        <section className="w-full mb-5 lg:mt-20 px-5 lg:px-24 flex flex-col items-center justify-center animate-pulse">
            <div className="w-full items-center flex justify-between">
                <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-xl md:text-3xl">
                    {Home ? "بودكاست قلقانة" : "شاهد أيضاً"}:
                </h2>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10">
                {[...Array(Home ? 3 : 6)].map((_, index) => (
                    <PodcastLayoutSkeleton key={index} />
                ))}
            </div>
        </section>
    );
};

export default RecentPodcastSkeleton;
