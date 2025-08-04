  "use client"
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import { useDispatch } from "react-redux";
  import { userLoggedInDetails } from "@/redux/userSlice";
  import { Loader2 } from "lucide-react";
  // import { useState } from "react";
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
  import { useEffect, useState } from "react"
  import { api, ENDPOINT } from "@/lib/api";
  import { useRouter } from "next/navigation";
  import { useSelector } from "react-redux";
  import { toast } from "sonner"

  export default function CardDemo() {
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [loading,setLoading] = useState(false);
    const dispatch =useDispatch();
    const router = useRouter();
    const userData= useSelector((state)=> state.user);

    
  useEffect(() => {
    if (userData.isLoggedIn) {
      router.push("/");
    }
  }, [userData.isLoggedIn]); // 

    const onSubmit =async()=>{
      try{  
        if(!email || !password){
          return(
            toast("Fill the required fields")
          )
        };
        setLoading(true);
        const response = await api.post(ENDPOINT.login,{
          email,
          password
        });
        if(response.status===200){
          dispatch(userLoggedInDetails(response.data.user));
          toast.success("Successfully Loged In")
          router.push("/")
        }
        
      }catch(err){
        console.log("errr:",err.message);
        toast.error(err.response?.data?.message || "Invalid credentials");
    
      }finally{
        setLoading(false)
        setEmail("");
        setPassword("");
      }
    };

    return (
      <div className="h-screen w-screen flex items-center justify-center">
        
      <Card className="w-full max-w-sm shadow-lg shadow-pink-500/100">
        <CardHeader>
          <CardTitle className='font-bold text-2xl'>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link  href=
            "/signup">
            <Button variant="link" className='border bg-pink-400 text-black hover:bg-pink-300 font-semibold'>Sign Up</Button>
            
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/resetPassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required   onChange={(e)=>{
                    setPassword(e.target.value);
                  }}  autoComplete="new-password"/>
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
        'Login'
      )}
        </Button>
         
        </CardFooter>
      </Card>
      </div>
    )
  }
