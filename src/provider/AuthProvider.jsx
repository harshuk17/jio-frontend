"use client"
import { api, ENDPOINT } from "@/lib/api";
import { userLoggedInDetails } from "@/redux/userSlice";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({children})=>{
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
            setLoading(true)
            const fetcher =async ()=>{
                try{
                    const res = await api.get(ENDPOINT.user);
                    // console.log("authProvider response",res.data.user);
                    if(res.data.status===200){
                        dispatch(userLoggedInDetails(res.data.user));
                    }
                }catch(err){
                    console.log("user needs to login");
                }finally{
                    setLoading(false);
                }
            };
            fetcher();
    }, []);

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <Loader2Icon className="w-[100px] h-[100px] animate-spin"/>
            </div>
        )
    };
    return <div>
        {children}
    </div>
}   

export default AuthProvider;