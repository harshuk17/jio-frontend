import { getBannerData, getWatchUrl } from '@/lib/api'
import React, { Suspense } from 'react'
import Image from 'next/image';
import { media } from '@/lib/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';

async function BannerSection({fetcher,media_type}) {

  return (
  <BannerSectionContent fetcher={fetcher} media_type={media_type}/>
  )
}
async function  BannerSectionContent({fetcher,media_type}){
  const data= await fetcher();
  // const bannerList = response?.data?.TvList?.results;

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
              data?.map((vid)=>(
                <CarouselItem key={vid.id} className="max-w-[500px] h-[500px]  basis-1/3 md:basis-1/2 pl-4">
                    {/* <h2>{vid.title||vid.original_name}</h2> */}
                    <Link href={getWatchUrl(vid.id,media_type,vid.poster_path)}>
                    <Image
                      src={media(vid?.poster_path)}
                      alt="image not found"
                      width={500}
                      height={300}
                      className="w-[500px] h-[700px] bg-scale-6 00 rounded-lg object-cover"
                      quality={100}
                      >
                    </Image>
                    </Link>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <div>
            <CarouselPrevious className="h-[60px] w-[60px] ml-25 bg-black "/>
            <CarouselNext className="h-[60px] w-[60px] mr-25 bg-black"/>
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