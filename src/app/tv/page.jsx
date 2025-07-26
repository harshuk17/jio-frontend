import BannerSection from "@/components/sections/BannerSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import JumperSection from "@/components/sections/JumperSection";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  const media_type="tv";
  const list = [
    {
      label:"Action TV Show",
      href:"action",
      media_type:"tv",
      fetcher: async function getActionTVData(){
        const response = await api.get(ENDPOINT.fetchActionTvShows);
        const data = response?.data?.TvList?.results;
        return data;
      }
    },
    {
      label:"Comedy TV Show",
      href:"comedy",
      media_type:"tv",
      fetcher: async function getComedyTVData(){
        const response = await api.get(ENDPOINT.fetchComedyTvShows);
        const data = response?.data?.TvList?.results;
        return data;
      }
    },
    {
      label:"Crime TV Show",
      href:"crime",
      media_type:"tv",
      fetcher: async function getCrimeTVData(){
        const response = await api.get(ENDPOINT.fetchCrimeTvShows);
        const data = response?.data?.TvList?.results;
        return data;
      }
    },
    {
      label:"Drama TV Show",
      href:"drama",
      media_type:"tv",
      fetcher: async function getDramaTVData(){
        const response = await api.get(ENDPOINT.fetchDramaTvShows);
        const data = response?.data?.TvList?.results;
        return data;
      }
    },
    {
      label:"Mystery TV Show",
      href:"mystery",
      media_type:"tv",
      fetcher: async function getMysteryTVData(){
        const response = await api.get(ENDPOINT.fetchMysteryTvShows);
        const data = response?.data?.TvList?.results;
        return data;
      }
    }
  ];
    async function getTVBannerData(){
    const response = await api.get(ENDPOINT.fetchDramaTvShows);
    const data = response?.data?.TvList?.results;
    // console.log("output of TV data",data);
    return data;
}
  return (
    <div className=" ">
      <JumperSection list={list}/>
      <BannerSection fetcher={getTVBannerData} media_type={media_type}/>
      {
        list.map((item)=>{
          return <CategoriesSection key={item.label} title={item.label} id={item.href} media_type={item.media_type} fetcher={item.fetcher}/>
        })
      }
    </div>
  );
}
