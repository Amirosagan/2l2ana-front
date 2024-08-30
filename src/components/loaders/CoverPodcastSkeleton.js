const CoverSectionSkeleton = () => {
    return (
        <div className="w-full md:mt-5 lg:mt-0 md:inline-block">
            <h1 className='text-3xl mx-4 mb-5 md:hidden text-primary/90'>بودكاست</h1>
            <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative rounded-3xl bg-neutral-300 animate-pulse">
                <div className="relative w-full h-72 rounded-3xl z-20 overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center">
                        <div className="w-10/12 h-52 bg-gray-400 rounded-lg"></div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default CoverSectionSkeleton;
