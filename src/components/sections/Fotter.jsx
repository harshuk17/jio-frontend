import Image from "next/image";
import Link from "next/link";

const headings = [
    {
        title:"JIOCINEMA",
        links:["For You","Movies","Tv Shows","Sports"]
    },
    {
        title:"SUPPORT",
        links:["Help Center","Terms of Use","Privacy Policy","Content Complaints"]
    }
];
const appDownloadLink = [
    {
        icon:"/playStore.png",
        alt:"Google Play",
        href:"https://play.google.com/store/apps/details?id=com.jio.media.ondemand"
    },
    {
        icon:"/appleStore.png",
        alt:"Apple Play",
        href:"https://apps.apple.com/in/app/jiocinema-movies-tv-sports/id1067318593"
    }
];
const connectWithUsLink = [
    {
        icon:"fb_icon.png",
        href:"#"
    },
    {
        icon:"instagramLogo.png",
        href:"#"
    },
    {
        icon:"twitterLogo.png",
        href:"#"
    },
    {
        icon:"youtubeLogo.png",
        href:"#"
    }
];
export default function Footer() {
    return (
        <footer className="bg-[#17181a] text-gray-300">
            <div className="md:mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start px-8 py-4 ">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mt-4 ml-5 ">
                        {headings.map((heading, index) => (
                            <div key={index} className="flex flex-col justify-items-start gap-4 pt-5">
                                <h3 className="text-lg font-bold uppercase text-pink-500">{heading.title}</h3>
                                <div className="flex flex-col">
                                    {heading.links.map((link, linkIndex) => (
                                        <Link href="#" key={linkIndex}>
                                            {link}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 md:gap-8 mt-8">
                        <h3 className="text-lg font-bold uppercase text-pink-500">Connect With Us</h3>
                        <div className="flex gap-4">
                            {connectWithUsLink.map((link, linkIndex) => (
                                <Link
                                    key={linkIndex}
                                    href={link.href}
                                    className="rounded-full bg-gray-700 p-2 hover:bg-gray-600"
                                >
                                    <Image
                                        src={"/" + link.icon}
                                        alt={link.href}
                                        width={40}
                                        height={40}
                                        className="md:h-10 md:w-10 h-8 w-8"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-0 md:gap-5  md:mt-0 md:mr-10">
                        <h3 className="text-lg font-bold uppercase mt-8 text-pink-500   ">
                            Download the App
                        </h3>
                    <div className="flex gap-4 ">
                        {appDownloadLink.map((link, linkIndex) => (
                    <Link key={linkIndex} className="flex items-center"   
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer">
                        <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
                        <Image
                        src={link.icon}
                        alt={link.alt}
                        width={120}
                        height={120}
                        className="w-20 h-20 object-cover"
                        />
                    </div>
                    </Link>
  ))}
</div>

                    </div>
                </div>

                <div className=" relative md:text-center text-start mt-8 flex w-full justify-center items-center bg-[#202123] py-4 px-4">
                    <p className="md:text-sm text-xs">
                        Copyright © 2024 Viacom18 Media PVT LTD. All rights reserved.
                    </p>
                    <Image
                        src="/jioLogo.png"
                        alt="Jio Logo"
                        width={48}
                        height={48}
                        className="md:h-12 md:w-12 h-10 w-10 absolute right-4  "
                    />
                </div>
            </div>
        </footer>
    );
}
