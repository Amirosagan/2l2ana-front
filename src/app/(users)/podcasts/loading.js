import CoverSectionSkeleton from '@/src/components/loaders/CoverPodcastSkeleton'
import RecentPodcastSkeleton from '@/src/components/loaders/RecentPodcastSkeleton'

function loading() {
  return (
    <div className='mt-5'>
    <div className="flex flex-col items-center justify-center lg:w-[83%] m-auto">
        <CoverSectionSkeleton/>
        <div className='flex items-center justify-start w-[90%] lg:w-[83%] lg:-mb-5 mb-10 mt-5 text-sm md:text-base'>
          
        </div>
        <RecentPodcastSkeleton />
    </div>
</div>
  )
}

export default loading
