import React from 'react'

function CategoriesSection({ title, id }) {
  return (
    <div className='px-8 py-5'>
      <h2 className='mb-2 text-xl scroll-mt-24' id={id}>{title}</h2>
      <ul className="flex gap-4 overflow-scroll scrollbar-hide   ">
        {
          new Array(12).fill(0).map((_, index) => (
            <div key={index} className='min-w-[200px] h-[300px] bg-pink-200  rounded-md' />
          ))
        }
      </ul>
    </div>
  )
}

export default CategoriesSection
