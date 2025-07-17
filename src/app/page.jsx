import BannerSection from "@/components/sections/BannerSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import JumperSection from "@/components/sections/JumperSection";
import Image from "next/image";

export default function Home() {
  const list = [
    {
      label:"Top Rated",
      href:"topRated"
    },
    {
      label:"Popular",
      href:"popular"
    },
    {
      label:"Upcoming",
      href:"upcoming"
    }
  ]
  return (
    <div className=" ">
      <JumperSection list={list}/>
      <BannerSection/>
      {
        list.map((item)=>{
          return <CategoriesSection key={item.label} title={item.label} id={item.href}/>
        })
      }
    </div>
  );
}
