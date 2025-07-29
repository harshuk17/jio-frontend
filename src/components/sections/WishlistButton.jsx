"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FilePlus2, Loader2Icon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { ENDPOINT } from '@/lib/api';

function WishlistButton({wishlist}) {
  const user = useSelector((state)=> state.user);
  const [loading,setLoading]=useState(false);
  if(!user.isLoggedIn){
    return<></>
  }
  const addToWishlist = async()=>{
    // logic to add into the wishlist 
    try{
      setLoading(true);
      const response = await api.post(ENDPOINT.addToWishlist,wishlist);
      if(response.status === 200){
        alert("Added to Wishlist");
      }
    }catch(err){
      alert(err.response.data.message);
    }finally{
      setLoading(false0);
    }

  }  
  return (
     <div>
    <button
      onClick={addToWishlist}
      className={`flex border-2 border-pink-500 rounded-2xl gap-1 p-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      disabled={loading}
    >
      {loading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <FilePlus2 className="mt-1" size={20} />
      )}
      Add to Watchlist
    </button>
  </div>
  )
}

export default WishlistButton