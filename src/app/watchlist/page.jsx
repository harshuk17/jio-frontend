"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import { FolderLock } from 'lucide-react';
import Link from 'next/link';
import CategoriesSection from '@/components/sections/CategoriesSection';
import { useState,useEffect } from 'react';
import { useCallback } from 'react';
import { api, ENDPOINT } from "@/lib/api"; 


function watchlist() {
  const userData = useSelector((state)=>state.user);
  const [watchlistData, setWatchlistData] = useState(null);
  const title = "Watchlist"

   useEffect(() => {
        const fetchData = async () => {
            if (userData.isLoggedIn) {
                try {
                    const res = await api.get(ENDPOINT.getWishlist);
                    setWatchlistData(res.data.data);
                } catch (error) {
                    console.error("Error fetching watchlist:", error);
                }
            } 
        };
        fetchData();
    }, [userData.isLoggedIn]);

    // Create memoized fetcher function that returns cached data
    const fetcher = useCallback(async () => {
        return watchlistData || [];
    }, [watchlistData]);
  return (
    <div className="h-screen flex justify-center items-center mt-[80px] p-4">
      
      {userData.isLoggedIn?  <CategoriesSection 
                fetcher={fetcher} title={title} id="watchlistheading"
            />:<div className='flex flex-col justify-center items-center gap-2 '>
        <FolderLock className='h-25 w-25'/>
        <p className='text-xl'>Login to watch your watchlist</p>
        <Link href="/login">
          <button className='hover:cursor-pointer hover:bg-pink-400 mt-6  px-8 py-4 rounded-2xl bg-pink-500 font-bold '>
            Login
          </button>
        </Link>
      </div>
      }
    </div>
  )
}

export default watchlist