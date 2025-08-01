"use client"
import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button';
import { FilmIcon, Share2,FilePlus2 } from 'lucide-react';
import { toast } from "sonner"

function ShareButton() {
    const shareHandler =()=>{
        const url= window.location.href;
        // clipboard -> api browser
        navigator.clipboard.writeText(url);
        toast.success("URL copied to the clipboard").catch((err)=>{
            console.log("failed to copy ",err);
            toast.error("failed to copy URL");
        });
    };

  return (
    <div>
          <Button className='flex border-2 border-pink-500 rounded-2xl gap-1 p-2' onClick={shareHandler}>
              <Share2 className="cursor-pointer  mt-1" size={20} />
              Copy Link!
          </Button>
    </div>
  )
}

export default ShareButton