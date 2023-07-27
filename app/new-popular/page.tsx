"use client"

import { Header, Movies, Thumbnail } from "@/components";
import { Movie } from "@/typing";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

interface Props {
  movies: Movie[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const page = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchMovies = async () => {
   
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((response) => response.json())
    .catch((err) => console.log(err.message));
    
    data.results.forEach((item: Movie) => {
      item.media_type = "tv";
    });
    if(!movies){
      setMovies(data.results)
    }
    else{
      setMovies([...movies, ...data.results]);
    }
    console.log(movies);
    
  }

  const loadMoreMovies = async () => {
    setPage(page+1);
  }

  useEffect(() => {
    fetchMovies();
  }, [page])
  

    
  return (
    <RecoilRoot>
      <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
        <Header/>
        <Movies movies={movies}/>
        <div className="flex justify-center items-center pb-5">
          <button className="text-black bg-white p-2 rounded" onClick={loadMoreMovies}>Load More</button>
        </div>
      </main>
    </RecoilRoot>
  )
}

export default page