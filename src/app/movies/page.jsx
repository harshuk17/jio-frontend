import BannerSection from "@/components/sections/BannerSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import JumperSection from "@/components/sections/JumperSection";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  const list = [
    {
      label:"Action Movies",
      href:"action",
      fetcher: async function getActionMovieData(){
        const response = await api.get(ENDPOINT.fetchActionMovies);
        const data = response?.data?.movieList?.results;
        return data;
      }
    },
    {
      label:"Comedy Movie",
      href:"comedy",
      fetcher: async function getComedyMovieData(){
        const response = await api.get(ENDPOINT.fetchComedyMovies);
        const data = response?.data?.movieList?.results;
        return data;
      }
    },
    {
      label:"Horror Movie",
      href:"horror",
      fetcher: async function getHorrorMovieData(){
        const response = await api.get(ENDPOINT.fetchHorrorMovies);
        const data = response?.data?.movieList?.results;
        return data;
      }
    },
    {
      label:"Romance Movie",
      href:"romance",
      fetcher: async function getRomanceMovieData(){
        const response = await api.get(ENDPOINT.fetchRomanceMovies);
        const data = response?.data?.movieList?.results;
        return data;
      }
    },
    {
      label:"Anime Movie",
      href:"anime",
      fetcher: async function getAnimeMovieData(){
        const response = await api.get(ENDPOINT.fetchAnimeMovies);
        const data = response?.data?.movieList?.results;
        return data;
      }
    }
  ];
    async function getMovieBannerData(){
    const response = await api.get(ENDPOINT.fetchComedyMovies);
    const data = response?.data?.movieList?.results;
    return data;
}
  return (
    <div className=" ">
      <JumperSection list={list}/>
      <BannerSection fetcher={getMovieBannerData}/>
      {
        list.map((item)=>{
          return <CategoriesSection key={item.label} title={item.label} id={item.href} fetcher={item.fetcher}/>
        })
      }
    </div>
  );
}
