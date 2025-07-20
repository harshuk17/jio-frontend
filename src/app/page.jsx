import BannerSection from "@/components/sections/BannerSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import JumperSection from "@/components/sections/JumperSection";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  const list = [
    {
      label:"Top Rated",
      href:"topRated",
      fetcher: async function getTopRatedData(){
        const response = await api.get(ENDPOINT.discoverTrending);
        const data = response?.data?.homeList?.results;
        return data;
      }
    },
    {
      label:"Popular",
      href:"popular",
      fetcher: async function getPopularData(){
        const response = await api.get(ENDPOINT.discoverNowPlaying);
        const data = response?.data?.homeList?.results;
        return data;
      }
    },
    {
      label:"Upcoming",
      href:"upcoming",
      fetcher: async function getUpcomingData(){
        const response = await api.get(ENDPOINT.discoverUpcoming);
        const data = response?.data?.homeList?.results;
        return data;
      }
    }
  ];
    async function getBannerData(){
    const resp = await api.get(ENDPOINT.discoverUpcoming);
    const data = resp?.data?.homeList.results;
    return data;
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
