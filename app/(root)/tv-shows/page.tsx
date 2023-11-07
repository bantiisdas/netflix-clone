"use client";

// import { Movies, Thumbnail, TvShows } from "@/components";
import Header from "@/components/Header";
import TvShows from "@/components/TvShows";
import { Movie } from "@/typing";
import requests from "@/utils/requests";
import { useEffect, useState } from "react";

interface Props {
  movies: Movie[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  const [trendingTv, setTrendingTv] = useState([]);
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
        trendingTv,
        sciFiFantTv,
        actionTv,
        warPoliticsTv,
        crimeTv,
        animatedTv,
        mysteryTv,
        comedyTv,
      ] = await Promise.all([
        fetch(requests.fetchTrendingTv[0]).then((res) => res.json()),
        fetch(requests.fetchSciFiFantTv[0]).then((res) => res.json()),
        fetch(requests.fetchActionTv[0]).then((res) => res.json()),
        fetch(requests.fetchWarPoliticsTv[0]).then((res) => res.json()),
        fetch(requests.fetchCrimeTv[0]).then((res) => res.json()),
        fetch(requests.fetchAnimatedTv[0]).then((res) => res.json()),
        fetch(requests.fetchMysteryTv[0]).then((res) => res.json()),
        fetch(requests.fetchComedyTv[0]).then((res) => res.json()),
      ]);

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

      setTrendingTv(trendingTv.results);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Header />
      <TvShows
        trendingTv={trendingTv}
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
  );
};

export default page;
