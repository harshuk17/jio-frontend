"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { api, ENDPOINT } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { userLoggedInDetails } from "@/redux/userSlice";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useSelector } from "react-redux";

export default function CardDemo() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const [confirmpassword,setConfirmPassword]= useState("");
  const [loading,setLoading]= useState(false);
  const dispatch =useDispatch();
  const router = useRouter();
  const userData= useSelector((state)=> state.user);

  if(userData.isLoggedIn){
    return router.push("/");
  }

 const onSubmit =async()=>{
     try{  
       if(!name||!email || !password || !confirmpassword){
         return(
           alert("Fill the required fields")
         )
       };
       setLoading(true);
       const response = await api.post(ENDPOINT.signup,{
         name:name,
         email:email,
         password:password,
         confirmpassword:confirmpassword
       });
       if(response.status===200){
         // alert("Successfully Loged In")
          dispatch(userLoggedInDetails(response.data.user));
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.push("/")
       }
       
     }catch(err){
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.push("/")
       console.log("errr:",err);
       alert("invalid credentials");
    
     }finally{
       setLoading(false)
     }
   };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      
    <Card className="w-full max-w-sm shadow-lg shadow-pink-500/100">
      <CardHeader>
        <CardTitle className='font-bold text-2xl'>Sign Up to your account</CardTitle>
        <CardDescription>
          Enter your information below for creating an account
        </CardDescription>
        <CardAction>
          <Link  href=
          "/login">
          <Button variant="link" className='border bg-pink-400 text-black hover:bg-pink-300 font-semibold'>Sign in</Button>
          
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Joseph Andrew"
                required
                onChange={
                  (e)=>{
                    setName(e.target.value)
                  }
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={
                  (e)=>{
                    setEmail(e.target.value)
                  }
                }
              
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required onChange={
                  (e)=>{
                    setPassword(e.target.value)
                  }
                }/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="confirmPassword" type="password" required onChange={
                  (e)=>{
                    setConfirmPassword(e.target.value)
                  }
                }/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-pink-400 text-black font-semibold hover:bg-pink-300 hover:cursor-pointer" variant='outline' onClick={onSubmit}
        >
         {loading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" />
         
        </>
      ) : (
        'Sign Up'
      )}
        </Button>
        <Button variant="outline" className="w-full bg-gradient-to-r 
                   from-red-500 via-yellow-400 via-green-400 text-black font-semibold hover:cursor-pointer">
          Sign Up with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
