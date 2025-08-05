import React, { Suspense } from 'react'
import { Skeleton } from '../atom/Skeleton'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getWatchUrl, media } from '@/lib/api';
import { InboxIcon } from 'lucide-react';
import Link from 'next/link';
// import { getWatchUrl } from '@/lib/api';

function CategoriesSection({ title, id ,media_type, fetcher}) {
  return (
    <div className='px-8 py-5'>
      <h2 className='mb-2 text-xl scroll-mt-24' id={id}>{title}</h2>
      <Suspense fallback={<CategoriesFallback />}>
      <CategoriesContent fetcher={fetcher} media_type={media_type}/>
      </Suspense>
    </div>
  )
}
async function CategoriesContent({fetcher,media_type}){
  console.log("media type",media_type);
  if(!fetcher){
    console.log("fetcher is not provided");
  }
  const data = await fetcher();
  
  console.log("data in category ",data);

  if(!data || data.length===0){
    return<>
      <div className='flex flex-col items-center justify-center w-full h-[300px] py-12'>
        <InboxIcon
          className='w-32 h-32 text-slate-400 mb-10'
          strokeWidth={1.2}
        >
          <p className='text-lg text-gray-400'>No items found</p>
        </InboxIcon>
      </div>
    </>
  }
  return (
    <ul className='flex gap-4 w-full overflow-scroll scrollbar-hide'>
      {
        data.map((item)=>(
          <li className='min-w-[200px] h-[300px] rounded-lg  ' key={item.id}>
            <Link href={getWatchUrl(item.id,media_type,item.poster_path)}
              key={item.id}>
           <Image
              src={media(item?.poster_path)}
              alt=""
              width={700}
              height={500}
              className="w-full h-full bg-scale-600 rounded-lg object-cover"
              quality={100}
              key={item.id}
           ></Image> 
            </Link>
          </li>
        ))
      }
    </ul>
  )


}
function CategoriesFallback(){
  return(
      <ul className="flex gap-4 overflow-scroll  hover:cursor-pointer ">
        {
          new Array(12).fill(0).map((_, index) => (
            <Skeleton key={index} className='min-w-[200px] h-[300px] bg-white  rounded-md' />
          ))
        }
      </ul>
  )
}

export default CategoriesSection
