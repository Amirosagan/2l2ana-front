const CoverSection = ({ podcastData, selectedPodcast }) => {
    if (!selectedPodcast) {
        return <div>Error loading podcast</div>;
    }

    const spotifyUrl = selectedPodcast.audioUrl;

    return (
        <div className="w-full md:mt-5 lg:mt-0 md:inline-block">
            <h1 className='text-3xl mx-4 mb-5 md:hidden text-primary/90'>بودكاست</h1>
            <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative rounded-3xl bg-neutral-300">
                <div className="relative w-full h-full rounded-3xl z-20 overflow-hidden">
                    {spotifyUrl ? (
                        <iframe
                            src={`https://open.spotify.com/embed/episode/${spotifyUrl.split('/').pop()}`}
                            width="100%"
                            height="352px"
                            frameBorder="0"
                            allow="encrypted-media"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xl">Error loading podcast</span>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default CoverSection;
