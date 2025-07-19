import axios from "axios";
import { resolve } from "styled-jsx/css";

export const ENDPOINT = {
    // auth
    login: "/auth/login",
    signup: "/auth/signup",
    // logout , user pending
    user: "/user",
    logout: "/auth/logout",
    forgetpassword: "/auth/forgetPassword",
    resetPassword: "/auth/resetPassword",

    //discover
    discoverNowPlaying: "/home/nowPlaying",
    discoverTrending: "/home/trending",
    discoverTopRated: "/home/topRated",
    discoverUpcoming: "/home/upcoming",
    // movies
    fetchActionMovies: `/movies/action`,
    fetchComedyMovies: `/movies/comedy`,
    fetchHorrorMovies: `/movies/horror`,
    fetchRomanceMovies: `/movies/romance`,
    fetchAnimeMovies: `/movies/anime`,

    //tv shows
    fetchActionTvShows: `/tv/action`,
    fetchComedyTvShows: `/tv/comedy`,
    fetchCrimeTvShows: `/tv/crime`,
    fetchDramaTvShows: `/tv/drama`,
    fetchMysteryTvShows: `/tv/mystery`,

    //eextra data 
    getMovieDetails: (id) => `/movies/details?id=${id}`,
    getTvShowsDetails: (id) => `/tv/details?id=${id}`,

    //user
    user: "/user",
    addToWishlist: "/user/wishlist",
    getWishlist: "/user/wishlist",


    //payment
    payment: "/payment/order",
    updatePremium: "/payment/update-premium-access",

    // streaming urls
    fetchAllStreamingVideos: `/video`,
    fetchStreamingVideo: (id) => `/video?id=${id}`,
    fetchVideoThumbnail: (id) => `/video/thumbnail?videoId=${id}`,
}

export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL
})

export async function getBannerData(){
    const resp = await api.get(ENDPOINT.discoverUpcoming);
    const data = resp?.data;
    return data;
}