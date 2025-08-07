import React from 'react'
import { api, ENDPOINT } from "@/lib/api";
import { FilmIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
// import ShareButton from '@/components/ShareButton';
import WishlistButton from '@/components/sections/WishlistButton';

export default async function Page({ searchParams }) {
  const id =  searchParams?.id;
  const poster_path =searchParams.poster_path;
  // console.log("id in watch tv",id);
  if (!id) { 
    return (
      <div className="mt-[80px] text-center text-red-500">
        Tv ID is missing in the URL.
      </div>
    );
  }

  let videoData = null;

  try {
    const response = await api.get(ENDPOINT.fetchTvVideos(id));
    // console.log("response from watch movie",response.data);
    videoData= response.data.TvList.results[0];
    // console.log("videoData of watch in Tv",videoData);
  } catch (err) {
    console.error("Failed to fetch movie details:", err.message);
  }


  return (
    <div className="mt-[80px]">
      {videoData ? (
        <>
       <>
          <iframe
            className="w-full aspect-video lg:h-[78vh]"
            src={`https://www.youtube.com/embed/${videoData.key}`}
            title={videoData.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center justify-between">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{videoData.name }</h1>
              <span className="text-sm text-muted-foreground">
                {videoData.type} {videoData.official && '(Official)'}
              </span>
            </div>
            <div className='flex gap-2'>
           <WishlistButton
            wishlist={
               {
                id:videoData.id,
                name:videoData.name,
                poster_path:poster_path
               }

              }
           />
            <Link href="/" className='flex border-2 border-pink-500 rounded-2xl gap-1 p-2'>
              <Share2 className="cursor-pointer  mt-1" size={20} />
              Copy Link!
            </Link>
            </div>
          </div>
        </>
        </>
      ) : (
        <div className="w-full h-[60vh] flex flex-col gap-4 items-center justify-center text-slate-400">
          <FilmIcon className="w-[100px] h-[100px]" />
          <p>Uh Oh! Video is unavailable.</p>
          <Link href="/" className={buttonVariants()}>
            Take me Home
          </Link>
        </div>
      )}
    </div>
  );
}
