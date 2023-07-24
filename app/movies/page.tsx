"use client"

import { Header, Movies, Thumbnail } from "@/components";
import { Movie } from "@/typing";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";


const page = () => {

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
   
    const data = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=0af5fa8e782539fba3c0878860e6beb0")
    .then((response) => response.json())
    .catch((err) => console.log(err.message));
    
    setMovies(data.results)
   
  }

  useEffect(() => {
    fetchMovies();
  }, [])
  
    
  return (
    <RecoilRoot>
      <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
        <Header/>
        <Movies movies={movies}/>
      </main>
    </RecoilRoot>
  )
}

export default page