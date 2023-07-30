"use client"

import { Header, Movies, Thumbnail } from "@/components";
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

  // const [netflixOriginals, setNetflixOriginals] = useState([]);
  // const [trendingNow, setTrendingNow] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);

  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [mysteryMovies, setMysteryMovies] = useState([]);
  const [warMovies, setWarMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);

  const fetchData = async () => {
    try {
      const [
              // netflixOriginals,
              // trendingNow,
              topRated,
              actionMovies,
              comedyMovies,
              horrorMovies,
              romanceMovies,
              documentaries,
              sciFiMovies,
              mysteryMovies,
              warMovies,
              crimeMovies,
              animatedMovies
            ] = await Promise.all([
              // fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
              // fetch(requests.fetchTrending).then((res) => res.json()),
              fetch(requests.fetchTopRated).then((res) => res.json()),
              fetch(requests.fetchActionMovies).then((res) => res.json()),
              fetch(requests.fetchComedyMovies).then((res) => res.json()),
              fetch(requests.fetchHorrorMovies).then((res) => res.json()),
              fetch(requests.fetchRomanceMovies).then((res) => res.json()),
              fetch(requests.fetchDocumentaries).then((res) => res.json()),
              
              fetch(requests.fetchSciFiMovies).then((res) => res.json()),
              fetch(requests.fetchMysteryMovies).then((res) => res.json()),
              fetch(requests.fetchWarMovies).then((res) => res.json()),
              fetch(requests.fetchCrimeMovies).then((res) => res.json()),
              fetch(requests.fetchAnimatedMovies).then((res) => res.json()),
            ])
            // setNetflixOriginals(netflixOriginals.results);
            // setTrendingNow(trendingNow.results);
            setTopRated(topRated.results);
            setActionMovies(actionMovies.results);
            setComedyMovies(comedyMovies.results);
            setHorrorMovies(horrorMovies.results);
            setRomanceMovies(romanceMovies.results);
            setDocumentaries(documentaries.results);

            setSciFiMovies(sciFiMovies.results);
            setMysteryMovies(mysteryMovies.results);
            setWarMovies(warMovies.results);
            setCrimeMovies(crimeMovies.results);
            setAnimatedMovies(animatedMovies.results);
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
  

    console.log(sciFiMovies);
    
  return (
    <RecoilRoot>
      <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
        <Header/>
        <Movies 
           actionMovies={actionMovies}
           comedyMovies={comedyMovies}
           documentaries={documentaries}
           horrorMovies={horrorMovies}
           romanceMovies={romanceMovies}
           topRated={topRated}
           sciFiMovies={sciFiMovies}
           mysteryMovies={mysteryMovies}
           warMovies={warMovies}
           crimeMovies={crimeMovies}
           animatedMovies={animatedMovies}
        />
        {/* <div className="flex justify-center items-center pb-5">
          <button className="text-black bg-white p-2 rounded" onClick={loadMoreMovies}>Load More</button>
        </div> */}
      </main>
    </RecoilRoot>
  )
}

export default page