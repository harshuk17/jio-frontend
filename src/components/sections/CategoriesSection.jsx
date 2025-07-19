import React, { Suspense } from 'react'
import { Skeleton } from '../atom/skeleton'


function CategoriesSection({ title, id , fetcher}) {
  return (
    <div className='px-8 py-5'>
      <h2 className='mb-2 text-xl scroll-mt-24' id={id}>{title}</h2>
      <Suspense fallback={<CategoriesFallback/>}>
          <CategoriesContent fetcher={fetcher}/>
      </Suspense>
    </div>
  )
}
async function CategoriesContent({fetcher}){
  if(!fetcher){
    console.log("fetcher is not provided");
  }
  const data = await fetcher();
  console.log(data);
  return (
    <ul className='flex gap-4 w-full overflow-scroll scrollbar-hide'>
      {
        data.map((item)=>(
          <li className='min-w-[200px] h-[300px] rounded-lg border-2 ' key={item.id}>{item.title||item.original_name}</li>
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
