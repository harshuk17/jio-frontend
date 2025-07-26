"use client"
import React from 'react'
import Link from 'next/link'
import { FilePlus2 } from 'lucide-react';
import { useSelector } from 'react-redux';

function WishlistButton() {
  const user = useSelector((state)=> state.user);
  if(!user.isLoggedIn){
    return<></>
  }
  const addToWishlist =()=>{
    // logic to add into the wishlist 
  }  
  return (
      <div>
         <Link href="/" className='flex border-2 border-pink-500 rounded-2xl gap-1 p-2'>
              <FilePlus2 className="cursor-pointer  mt-1" size={20}/>
              Add to Watchlist
            </Link>
    </div>
  )
}

export default WishlistButton