"use client"
import React from 'react'
import Image from 'next/image'
import { CircleArrowLeft,Crown, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import SpecialOfferCard from '@/components/atom/SpecialOfferCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { ENDPOINT } from '@/lib/api';
import { updateUserPremium } from '@/redux/userSlice';
import { api } from '@/lib/api';
import {useRazorpay} from "react-razorpay"

const offers = [
  {
    title:"premium Monthly",
    features:[
      "Ad-Free(excepts sports & live)",
      "Include all Premium content",
      "Any 1 device at a time - 4k Quality",
      "Download and watch anytime"
      
    ],
    price:"29",
    originalPrice:"59",
    discountLabel:"51% OFF ",
    duration:"1 Month"
  },
  {
    title:"Family",
    features:["Enjoy all Premium plan benefits on up to 4 devices"],
    price:"89",
    originalPrice:"149",
    discountLabel:"40% OFF",
    duration: "1 Month"
  }
]

function page() {
    const [activePrice, setActivePrice] = useState("");
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const { Razorpay } = useRazorpay();
    const [loading, setLoading] = useState(false);

    const payHandler =async()=>{
         if (activePrice === "") {
            toast(
                "Select a card to join premium"
            )
            return
        }
        // not logged then send to home page
        if (!userData.isLoggedIn) {
            router.push("/login");
            return;
        }
        try {
            setLoading(true);
            // order
           
            const res = await api.post(`${ENDPOINT.payment}`, {
                email: userData.user?.email,
                amount: activePrice
            })
           
            const options = {
                key: process.env.NEXT_PUBLIC_KEY_ID ?? "",
                amount: res.data.amount,
                currency: "INR",
                name: "Jio Corp",
                description: "Test JIO CINEMA Transaction",
                order_id: res.data.orderId,
                handler: async function (response) {
                    toast(`Payment Successfull ${response.razorpay_order_id}`)
                    try {
                        // backend 
                        const updatePremium = await api.patch(ENDPOINT.updatePremium, {
                            email: userData.user?.email
                        })
                        if (updatePremium.status === 200) {
                            // frontend
                            dispatch(updateUserPremium(true))
                            toast("Premium access updated successfully")
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
            // razorpay -> porta
            const rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                toast.error("reason " + response.error.reason)
            })
            // gateway open
            rzp1.open();
            // upgrade to premium
            dispatch(updateUserPremium(true))
            toast.success("Premium access updated successfully");
        } catch (err) {
          let errorMessage = err.response.data.error
            toast.error(errorMessage)
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="h-screen relative  w-full mt-[65px] gap-3">
      <Image src="/subscription.jpg" 
             alt='background image '
             fill={true}
             objectFit='cover'
             className='-z-50'
      ></Image>
      <Link href="/">
        <CircleArrowLeft height={30} width={30} className='absolute mt-[10px] ml-[10px] text-black'/>
      </Link>
      <div className='flex pl-22 pt-22 flex-col gap-3'>
        <h1 className='text-black text-3xl font-bold flex items-center'><span className='text-pink-700 mr-[8px]'>JioCinema</span> Premium  <Crown className='text-amber-300'/></h1>
        <p className='w-[60%] font-medium'>Entertainment Redefined - The best of Hollywood, Before TV
          premieres, Blockbuster movies, Exclusive series, India{`'`}s biggest
          Kids & Family hub + 365 days of reality!</p>
      </div>
      <div className='pl-22 flex flex-col md:flex-row w-full md:gap-8 gap-2 pt-10'>
        {offers.map((offer,index)=>(
          <SpecialOfferCard
            title={offer.title}
            key={index}
            features={offer.features}
            price={offer.price}
            originalPrice={offer.originalPrice}
            discountLabel={offer.discountLabel}
            duration={offer.duration}
            isActive={activePrice === offer.price}
            onClick={() => setActivePrice(offer.price)}
          />
        ))}
      </div>
      <Button className="ml-22 mt-10 bg-pink-600 font-medium hover:cursor-pointer hover:bg-pink-500" onClick={payHandler}>
        {loading?<Loader2Icon className="animate-spin h-4 w-4"/>:"Continue & Pay"}
      </Button>
    </div>
  )
}

export default page