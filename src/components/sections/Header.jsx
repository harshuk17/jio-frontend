"use client"

import Image from "next/image"
import { Search, Crown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ProfileSheet from "./ProfileSheet"

// ✅ You forgot this function wrapper before
export default function Header() {
  const path = usePathname();
  const activeTabKey = path.split("/")[1];
  console.log("active tab key -", activeTabKey);

  const navLinks = [
    { name: "Home", key: "", href: "/" },
    { name: "Movies", key: "movies", href: "/movies/watch" },
    { name: "Tv Shows", key: "tv-shows", href: "/tv-shows/watch" },
    { name: "Watchlist", key: "watchlist", href: "/watchlist" },
    { name: "Jio+", key: "jio+", href: "/jio+/watch" },
  ];

  return (
    <header className="bg-black text-white top-0 z-50 fixed border-b border-gray-800 w-screen">
       
      <div className="flex items-center justify-between px-4 py-3 max-w-screen mx-auto ">
        {/* Logo and Premium Button */}
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-2  ">
            <Link
              href="/"
              className="flex"
            >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/jioCinemaLogo.png"
                alt="JioCinema Logo"
                width={25}
                height={25}
                // className="invert"
              />
            </div>
            <span className="text-xl font-semibold">JioCinema</span>
            </Link>
          </div>
        <Link
        href="/subscription">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black cursor-pointer"
          >
            <Crown className="w-4 h-4" />
            Go Premium
          </Button>
        </Link>
         {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8  ">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-1 py-2 font-medium text-[#b6b8b8] hover:text-white ${activeTabKey === item.key
                ? "border-b-2 border-pink-500 text-white"
                : ""
                } `}
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pink-600 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>
        </div>


        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600 rounded-3xl"
            />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>

          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <ProfileSheet/>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden text-gray-300 hover:text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-gray-800">
              <div className="flex flex-col space-y-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:hidden flex items-center gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black justify-start"
                >
                  <Crown className="w-4 h-4" />
                  Go Premium
                </Button>

                <div className="md:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600"
                    />
                  </div>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pink-600 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
