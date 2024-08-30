import CoverSectionSkeleton from '@/src/components/loaders/CoverPodcastSkeleton'
import RecentPodcastSkeleton from '@/src/components/loaders/RecentPodcastSkeleton'
import React from 'react'

function loading() {
  return (
    <div className='mt-5'>
    <div className="flex flex-col items-center justify-center lg:w-[83%] m-auto">
        <CoverSectionSkeleton/>
        <div className='flex items-center justify-start w-[90%] lg:w-[83%] lg:-mb-5 mb-10 mt-5 text-sm md:text-base'>
            <Link href="/booking-Doctor" className='tajawal-medium hover:underline transition-all duration-300 text-accent'>
                محتارة في استشارة ؟ احجز مكالمة صوتية او فيديو الان مع افضل الدكاترة في مصر من بيتك
            </Link>
        </div>
        <RecentPodcastSkeleton />
    </div>
</div>
  )
}

export default loading
