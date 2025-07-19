import { getBannerData } from '@/lib/api'
import React, { Suspense } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

async function BannerSection() {

  return (
  <BannerSectionContent/>
  )
}
async function  BannerSectionContent(){
  const data= await getBannerData();
  const bannerList = data.homeList.results;
  return (
    <>
      <Carousel
        opts={{
        align: "start",
        loop: true,
      }}
      className="w-screen md:px-0 px-4"
      >
          <CarouselContent className="-ml-4 pl-8 pr-8">
            {
              bannerList?.map((vid)=>(
                <CarouselItem key={vid.id} className="max-w-[700px] h-[500px] border-2 basis-1/3 md:basis-1/2 pl-4">
                    <h2>{vid.title}</h2>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <div>
            <CarouselPrevious className="h-[60px] w-[60px] ml-25"/>
            <CarouselNext className="h-[60px] w-[60px] mr-25"/>
          </div>

      </Carousel>
    </>
   
  )

}
function BannerSectionFallback(){
  return(
  <div className='flex items-center justify-center gap-5'>
    <Suspense className="h-[500px] w-[700px] rounded-lg"/>
    <Suspense className="h-[500px] w-[700px] rounded-lg"/>
    <Suspense className="h-[500px] w-[700px] rounded-lg"/>
  </div>

  )
}
export default BannerSection