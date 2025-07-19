import Link from 'next/link'
import React from 'react'

function JumperSection({list}) {
  return (
    <div className='gap-5 p-5 flex mt-15 text-nowrap overflow-scroll scrollbar-hidden'>
        {
            list.map((item)=>(
                <Link 
                    key={item.href}
                    className='px-5 py-3 rounded-3xl text-sm border-2 bg-gray-800 hover:border-pink-500 '
                    href={`#${item.href}`}
                >
                    {item.label}
                </Link>
            ))
        }


    </div>
  )
}

export default JumperSection