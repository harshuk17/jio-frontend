"use client";
import { buttonVariants } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { FolderLockIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSelector } from "react-redux";
import { Button } from '@/components/ui/button';
import { useSearchParams } from "next/navigation"; // ✅ import this

function WatchJio() {
    const searchParams = useSearchParams(); // ✅ use this hook
    const videoId = searchParams.get("id"); // ✅ safely access "id"

    const userData = useSelector((state) => state.user);

    // login wala ui
    if (!userData.isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
                <FolderLockIcon
                    className="w-32 h-32 text-slate-400"
                    strokeWidth={1.2}
                />
                <p className="text-base text-slate-400">
                    Login to view premium content.
                </p>
                <Link
                    href={"/login"}
                    className={cn(buttonVariants(), "rounded-full px-6 mt-4")}
                >
                    <Button className="bg-pink-500 rounded-2xl hover:cursor-pointer hover:bg-pink-400">
                        Login
                    </Button>
                </Link>
            </div>
        );
    }

    // check -> if you are premium or not 
    if (!userData.user?.isPremium) {
        return (
            <div className="h-screen w-screen flex justify-center items-center text-white bg-black text-xl flex-col gap-6">
                You need premium access to watch this content.
                <Link href="/subscription" className={buttonVariants()}>
                    Buy Premium
                </Link>
            </div>
        );
    }

    // show the video
    return (
        <video
            src={API_BASE_URL + `/video/watch/?id=${videoId}`}
            controls
            autoPlay
            muted
            className="w-screen h-screen"
            crossOrigin="anonymous"
        />
    );
}

export default WatchJio;
