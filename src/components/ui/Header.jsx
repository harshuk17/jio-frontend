import Image from "next/image"
import { Search, Crown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies/watch" },
    { name: "TV Shows", href: "/tv-shows/watch" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Jio+", href: "/jio-plus/watch" },
  ]

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-[1440px] mx-auto">
        {/* Logo and Premium Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="JioCinema Logo"
                width={20}
                height={20}
                className="invert"
              />
            </div>
            <span className="text-xl font-semibold">JioCinema</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            <Crown className="w-4 h-4" />
            Go Premium
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium group"
            >
              {item.name}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pink-600 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
        </nav>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600"
            />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>

          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
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
                  {navItems.map((item) => (
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
  )
}
