"use client";

import { modalState } from '@/atoms/modalAtom';
import { Banner, Header, MainContents, Row } from '@/components'
import useAuth from '@/hooks/useAuth';
import { Movie } from '@/typing'
// import { fetchMovies } from '@/utils/requests';
import requests from '@/utils/requests'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';


// interface Props {
//   netflixOriginals : Movie[];
//   trendingNow : Movie[];
//   topRated : Movie[];
//   actionMovies : Movie[];
//   comedyMovies : Movie[];
//   horrorMovies : Movie[];
//   romanceMovies : Movie[];
//   documentaries : Movie[];
// }

export default function Home() {
  
  // const netflixOriginals = await fetchMovies();
  // console.log(netflixOriginals);

  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);



  const fetchData = async () => {
    try {
      const [
              netflixOriginals,
              trendingNow,
              topRated,
              actionMovies,
              comedyMovies,
              horrorMovies,
              romanceMovies,
              documentaries,
            ] = await Promise.all([
              fetch(requests.fetchNetflixOriginals[0]).then((res) => res.json()),
              fetch(requests.fetchTrendingNow[0]).then((res) => res.json()),
              fetch(requests.fetchTopRated[0]).then((res) => res.json()),
              fetch(requests.fetchActionMovies[0]).then((res) => res.json()),
              fetch(requests.fetchComedyMovies[0]).then((res) => res.json()),
              fetch(requests.fetchHorrorMovies[0]).then((res) => res.json()),
              fetch(requests.fetchRomanceMovies[0]).then((res) => res.json()),
              fetch(requests.fetchDocumentaries[0]).then((res) => res.json()),
            ])
            setNetflixOriginals(netflixOriginals.results);
            setTrendingNow(trendingNow.results);
            setTopRated(topRated.results);
            setActionMovies(actionMovies.results);
            setComedyMovies(comedyMovies.results);
            setHorrorMovies(horrorMovies.results);
            setRomanceMovies(romanceMovies.results);
            setDocumentaries(documentaries.results);
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
      <MainContents 
        netflixOriginals={netflixOriginals}
        actionMovies={actionMovies}
        comedyMovies={comedyMovies}
        documentaries={documentaries}
        horrorMovies={horrorMovies}
        romanceMovies={romanceMovies}
        topRated={topRated}
        trendingNow={trendingNow}
        />
    </main>
    //</RecoilRoot>
  )
}


