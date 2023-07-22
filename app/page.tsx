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

  // useEffect( () => {
  //   async function fetchData(){
  //     const [
  //       netflixOriginals,
  //       trendingNow,
  //       topRated,
  //       actionMovies,
  //       comedyMovies,
  //       horrorMovies,
  //       romanceMovies,
  //       documentaries,
  //     ] = await Promise.all([
  //       fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
  //       fetch(requests.fetchTrending).then((res) => res.json()),
  //       fetch(requests.fetchTopRated).then((res) => res.json()),
  //       fetch(requests.fetchActionMovies).then((res) => res.json()),
  //       fetch(requests.fetchComedyMovies).then((res) => res.json()),
  //       fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  //       fetch(requests.fetchRomanceMovies).then((res) => res.json()),
  //       fetch(requests.fetchDocumentaries).then((res) => res.json()),
  //     ])
      

  //     setNetflixOriginals(netflixOriginals.results);
  //     setTrendingNow(trendingNow.results);
  //     setTopRated(topRated.results);
  //     setActionMovies(actionMovies.results);
  //     setComedyMovies(comedyMovies.results);
  //     setHorrorMovies(horrorMovies.results);
  //     setRomanceMovies(romanceMovies.results);
  //     setDocumentaries(documentaries.results);
  //   }
  //   fetchData();
  // }, [])

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
              fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
              fetch(requests.fetchTrending).then((res) => res.json()),
              fetch(requests.fetchTopRated).then((res) => res.json()),
              fetch(requests.fetchActionMovies).then((res) => res.json()),
              fetch(requests.fetchComedyMovies).then((res) => res.json()),
              fetch(requests.fetchHorrorMovies).then((res) => res.json()),
              fetch(requests.fetchRomanceMovies).then((res) => res.json()),
              fetch(requests.fetchDocumentaries).then((res) => res.json()),
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
  
  
  
  // const [
  //   netflixOriginals,
  //   trendingNow,
  //   topRated,
  //   actionMovies,
  //   comedyMovies,
  //   horrorMovies,
  //   romanceMovies,
  //   documentaries,
  // ] = await Promise.all([
  //   fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
  //   fetch(requests.fetchTrending).then((res) => res.json()),
  //   fetch(requests.fetchTopRated).then((res) => res.json()),
  //   fetch(requests.fetchActionMovies).then((res) => res.json()),
  //   fetch(requests.fetchComedyMovies).then((res) => res.json()),
  //   fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  //   fetch(requests.fetchRomanceMovies).then((res) => res.json()),
  //   fetch(requests.fetchDocumentaries).then((res) => res.json()),
  // ])

  // const { loading } = useAuth();
  // if(loading) return "Loading";

  // const showModal = useRecoilValue(modalState)

  // console.log(netflixOriginals.results);

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}


// export const getServerSideProps = async () => {
//   const [
//     netflixOriginals,
//     trendingNow,
//     topRated,
//     actionMovies,
//     comedyMovies,
//     horrorMovies,
//     romanceMovies,
//     documentaries,
//   ] = await Promise.all([
//     fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
//     fetch(requests.fetchTrending).then((res) => res.json()),
//     fetch(requests.fetchTopRated).then((res) => res.json()),
//     fetch(requests.fetchActionMovies).then((res) => res.json()),
//     fetch(requests.fetchComedyMovies).then((res) => res.json()),
//     fetch(requests.fetchHorrorMovies).then((res) => res.json()),
//     fetch(requests.fetchRomanceMovies).then((res) => res.json()),
//     fetch(requests.fetchDocumentaries).then((res) => res.json()),
//   ])

//   return {
//     props: {
//       netflixOriginals: netflixOriginals.results,
//       trendingNow: trendingNow.results,
//       topRated: topRated.results,
//       actionMovies: actionMovies.results,
//       comedyMovies: comedyMovies.results,
//       horrorMovies: horrorMovies.results,
//       romanceMovies: romanceMovies.results,
//       documentaries: documentaries.results,
//     }
//   }
// }