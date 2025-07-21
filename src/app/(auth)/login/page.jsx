"use client"
import { Button } from "@/components/ui/button";
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
import { useState } from "react"

export default function CardDemo() {
  const [email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      
    <Card className="w-full max-w-sm shadow-lg shadow-pink-500/100">
      <CardHeader>
        <CardTitle className='font-bold text-2xl'>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" className='border bg-pink-400 text-black hover:bg-pink-300 font-semibold'>Sign Up</Button>
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
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-pink-400 text-black font-semibold hover:bg-pink-300" variant='outline'>
          Login
        </Button>
        <Button variant="outline" className="w-full bg-gradient-to-r 
                   from-red-500 via-yellow-400 via-green-400 text-black font-semibold">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
