import DoctoorBoster from '@/src/components/AboutUs/DoctoorBoster'
import CoverSectionSkeleton from '@/src/components/loaders/BlogSkeleton/CoverSkeleton'
import FeaturePostsSkeleton from '@/src/components/loaders/BlogSkeleton/FeatureSkeleton'
import RecentPostsSkeleton from '@/src/components/loaders/BlogSkeleton/RecentPostsSkeleton'
import React from 'react'

function loading() {
  return (
    <div className="md:mt-6">
    <div className="flex flex-col items-center lg:w-[83%] m-auto justify-center">

      <CoverSectionSkeleton />
      <FeaturePostsSkeleton />
      <div className=" w-[85%] mb-10 lg:mb-0 m-auto">
        <DoctoorBoster />
      </div>
      {/* <RecentPostsSkeleton /> */}
    </div>
  </div>
  )
}

export default loading