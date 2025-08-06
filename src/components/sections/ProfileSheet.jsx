import React, { useState } from 'react'
import Image from "next/image"; // ✅ Correct
import { ChevronRight , SquareArrowOutUpRight} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogOutDetails } from '@/redux/userSlice';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { ENDPOINT } from '@/lib/api';
import { api } from '@/lib/api';
import { toast } from 'sonner';

  const navLinks = [
    { name: "Home", key: "", href: "/" },
    { name: "Movies", key: "movies", href: "/movies" },
    { name: "Tv Shows", key: "tv-shows", href: "/tv-shows" },
    { name: "Watchlist", key: "watchlist", href: "/watchlist" },
    { name: "Jio+", key: "jio-plus", href: "/jio-plus" },
  ];

function ProfileSheet() {
    const router = useRouter();
    const [open,setOpen]=useState(false);
    const userData= useSelector((state)=> state.user);
    console.log("user data in profile sheet",userData);
    const dispatch =useDispatch();

    const handleLogout =async()=>{
        try{
            console.log("handle logout is called")
            const response = await api.post(ENDPOINT.logout, {}, {
            withCredentials: true
            });
            if(response.status===200){
                toast("Logout Succesfully")
                dispatch(userLogOutDetails());
                router.push("/");
            }
        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="w-8 h-8 ">
            <Image
              src="/avatar.svg"
              alt="User Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
            {/* profile */}
        </SheetTrigger>
        <SheetContent side={"right"} className="px-6 bg-black h-screen w-[25rem] p-6  flex flex-col">
            <div className='flex flex-col items-center justify-center border-2 bg-gray-900 rounded-3xl mt-[80px] h-[180px] relative'>
            <Image
              src="/avatar.svg"
              alt="User Profile"
              width={40}
              height={40}
              className="w-[80px] h-[80px] object-cover mt-15 absolute top-0 -translate-y-25 "
            />
            <p className='text-xl font-bold'>
                {userData.isLoggedIn? userData.user.name : "Guest"} 
            </p>
            {userData.isLoggedIn ? (
                <button
                onClick={handleLogout}
                className="mt-5 border bg-pink-600 px-10 py-3 rounded-3xl hover:bg-pink-400"
                >
                Logout
                </button>
            ) : (
                <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-5 border bg-green-600 px-10 py-3 rounded-3xl hover:bg-pink-400"
                >
                Login
                </Link>
            )}
            </div>
            <div className='flex flex-col '>
                <Link className='flex justify-between' href='/subscription' onClick={()=>{
                    setOpen(false);
                }}>Subscribe Now    <ChevronRight /></Link>
                <hr className="border-gray-600 my-5" />
            {
                navLinks.map((item)=>(
                    <Link
                        key={item.name}
                        href={item.href}
                        className='px-1.5 py-2 flex justify-between'
                        onClick={()=>{
                            setOpen(false);
                        }}
                    >
                        {item.name}
                        <SquareArrowOutUpRight className='h-4'/>
                    </Link>
                ))
            }
            <hr className="border-gray-600 my-5" />
            <Link className='flex justify-between' onClick={()=>{
                setOpen(false);
            }}
            href='/'>Help and Legal <ChevronRight /></Link>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default ProfileSheet