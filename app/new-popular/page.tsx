"use client";

import { modalState } from '@/atoms/modalAtom';
import { Banner, Header, MainContents, NewPopular, Row } from '@/components'
import useAuth from '@/hooks/useAuth';
import { Movie } from '@/typing'
// import { fetchMovies } from '@/utils/requests';
import requests from '@/utils/requests'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';



export default function Home() {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);


  const fetchData = async () => {
    try {
      const [
              nowPlaying,
              popular,
              topRated,
              upcoming,
              trendingNow
            ] = await Promise.all([
              fetch(requests.fetchNowPlaying[0]).then((res) => res.json()),
              fetch(requests.fetchPopular[0]).then((res) => res.json()),
              fetch(requests.fetchTopRated[0]).then((res) => res.json()),
              fetch(requests.fetchUpcoming[0]).then((res) => res.json()),
              fetch(requests.fetchTrendingNow[0]).then((res) => res.json()),
            ])
            setNowPlaying(nowPlaying.results);
            setPopular(popular.results);
            setTopRated(topRated.results);
            setUpcoming(upcoming.results);
            setTrendingNow(trendingNow.results);
            
    } catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  
  return (
    //<RecoilRoot>
    <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Header/>
      <NewPopular 
        nowPlaying={nowPlaying}
        popular={popular}
        topRated={topRated}
        upcoming={upcoming}
        trendingNow={trendingNow}
      />
    </main>
    //</RecoilRoot>
  )
}


