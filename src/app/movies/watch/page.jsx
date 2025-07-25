import React from 'react'
import { api, ENDPOINT } from "@/lib/api";
import { FilmIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
// import ShareButton from '@/components/ShareButton';

export default async function Page({ searchParams }) {
  const id =  searchParams?.id;
  console.log("id in watch movie",id);
  if (!id) {
    return (
      <div className="mt-[80px] text-center text-red-500">
        Movie ID is missing in the URL.
      </div>
    );
  }

  let videoData = null;

  try {
    const response = await api.get(ENDPOINT.fetchMovieVideos(id));
    // details = response.data.results;
    console.log("response from watch movie",response);
    videoData = response.data.details.results[0]
    console.log("videoData of watch in movie",videoData);
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
          <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center">
            <h1 className="text-2xl font-bold">{videoData.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {videoData.type} {videoData.official && '(Official)'}
              </span>
              <Share2 className="cursor-pointer" size={20} />
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
