"use client";

import Header from "@/components/Header";
import Movies from "@/components/Movies";
// import { Header, Movies, Thumbnail } from "@/components";
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

  // const [netflixOriginals, setNetflixOriginals] = useState([]);
  // const [trendingNow, setTrendingNow] = useState([]);
  const [trendingMovies, setTendingMovies] = useState([]);
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
        trendingMovies,
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
        animatedMovies,
      ] = await Promise.all([
        // fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        // fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTrendingMovies[0]).then((res) => res.json()),
        fetch(requests.fetchTopRated[0]).then((res) => res.json()),
        fetch(requests.fetchActionMovies[0]).then((res) => res.json()),
        fetch(requests.fetchComedyMovies[0]).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies[0]).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies[0]).then((res) => res.json()),
        fetch(requests.fetchDocumentaries[0]).then((res) => res.json()),

        fetch(requests.fetchSciFiMovies[0]).then((res) => res.json()),
        fetch(requests.fetchMysteryMovies[0]).then((res) => res.json()),
        fetch(requests.fetchWarMovies[0]).then((res) => res.json()),
        fetch(requests.fetchCrimeMovies[0]).then((res) => res.json()),
        fetch(requests.fetchAnimatedMovies[0]).then((res) => res.json()),
      ]);
      // setNetflixOriginals(netflixOriginals.results);
      // setTrendingNow(trendingNow.results);
      setTendingMovies(trendingMovies.results);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(sciFiMovies);

  return (
    <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Header />
      <Movies
        trendingMovies={trendingMovies}
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
  );
};

export default page;
