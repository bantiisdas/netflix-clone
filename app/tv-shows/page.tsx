"use client"

import { Header, Movies, Thumbnail, TvShows } from "@/components";
import { Movie } from "@/typing";
import requests from "@/utils/requests";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

interface Props {
  movies: Movie[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const page = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  const [sciFiFantTv, setSciFiFantTv] = useState([]);
  const [actionTv, setActionTv] = useState([]);
  const [warPoliticsTv, setWarPoliticsTv] = useState([]);
  const [crimeTv, setCrimeTv] = useState([]);
  const [animatedTv, setAnimatedTv] = useState([]);
  const [mysteryTv, setMysteryTv] = useState([]);
  const [comedyTv, setComedyTv] = useState([]);

  const fetchData = async () => {
    try {
      const [
              sciFiFantTv,
              actionTv,
              warPoliticsTv,
              crimeTv,
              animatedTv,
              mysteryTv,
              comedyTv
            ] = await Promise.all([
              fetch(requests.fetchSciFiFantTv).then((res) => res.json()),
              fetch(requests.fetchActionTv).then((res) => res.json()),
              fetch(requests.fetchWarPoliticsTv).then((res) => res.json()),
              fetch(requests.fetchCrimeTv).then((res) => res.json()),
              fetch(requests.fetchAnimatedTv).then((res) => res.json()),
              fetch(requests.fetchMysteryTv).then((res) => res.json()),
              fetch(requests.fetchComedyTv).then((res) => res.json()),
            ])


            sciFiFantTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            actionTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            warPoliticsTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            crimeTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            animatedTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            mysteryTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });
            comedyTv.results.forEach((item: Movie) => {
              item.media_type = "tv";
            });

            setSciFiFantTv(sciFiFantTv.results);
            setActionTv(actionTv.results);
            setWarPoliticsTv(warPoliticsTv.results);
            setCrimeTv(crimeTv.results);
            setAnimatedTv(animatedTv.results);
            setMysteryTv(mysteryTv.results);
            setComedyTv(comedyTv.results);
    } catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const fetchMovies = async () => {
   
  //   const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`)
  //   .then((response) => response.json())
  //   .catch((err) => console.log(err.message));
    
  //   if(!movies){
  //     setMovies(data.results)
  //   }
  //   else{
  //     setMovies([...movies, ...data.results]);
  //   }
  //   console.log(movies);
  //   // console.log(movies);
    
  // }

  // const loadMoreMovies = async () => {

  //   // const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0af5fa8e782539fba3c0878860e6beb0&language=en-US&page=${page+1}`)
  //   // .then((response) => response.json())
  //   // .catch((err) => console.log(err.message));
    
    
  //   // setMovies([...movies, ...data.results]);
  //   setPage(page+1);
  //   // console.log(movies);
    
  // }

  // useEffect(() => {
  //   fetchMovies();
  // }, [page])
  

    
    
  return (
    <RecoilRoot>
      <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
        <Header/>
        <TvShows 
           sciFiFantTv={sciFiFantTv}
           actionTv={actionTv}
           warPoliticsTv={warPoliticsTv}
           crimeTv={crimeTv}
           animatedTv={animatedTv}
           mysteryTv={mysteryTv}
           comedyTv={comedyTv}
        />
        {/* <div className="flex justify-center items-center pb-5">
          <button className="text-black bg-white p-2 rounded" onClick={loadMoreMovies}>Load More</button>
        </div> */}
      </main>
    </RecoilRoot>
  )
}

export default page