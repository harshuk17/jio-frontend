import BannerSection from "@/components/sections/BannerSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import JumperSection from "@/components/sections/JumperSection";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  const list = [
  {
    label: "Popular",
    href: "popular",
    fetcher: async function getPopularData() {
      try {
        const response = await api.get(ENDPOINT.discoverNowPlaying);
        const data = response?.data?.homeList?.results;
        return data;
      } catch (error) {
        console.error("Error fetching popular data:", error.message);
        return [];
      }
    }
  },
  {
    label: "Upcoming",
    href: "upcoming",
    fetcher: async function getUpcomingData() {
      try {
        const response = await api.get(ENDPOINT.discoverUpcoming);
        const data = response?.data?.homeList?.results;
        return data;
      } catch (error) {
        console.error("Error fetching upcoming data:", error.message);
        return [];
      }
    }
  }
];

// Outside of the array
async function getBannerData() {
  try {
    const resp = await api.get(ENDPOINT.discoverUpcoming);
    const data = resp?.data?.homeList?.results;
    return data;
  } catch (error) {
    console.error("Error fetching banner data:", error.message);
    return [];
  }
}

  return (
    <div className=" ">
      <JumperSection list={list}/>
      <BannerSection fetcher={getBannerData}/>
      {
        list.map((item)=>{
          return <CategoriesSection key={item.label} title={item.label} id={item.href} fetcher={item.fetcher}/>
        })
      }
    </div>
  );
}
