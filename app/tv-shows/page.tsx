"use client"

import { Header, Movies, Thumbnail } from "@/components";
import { Movie } from "@/typing";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
interface Props {
  movies: Movie[];
}

const page = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchMovies = async () => {
   
    const data = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0af5fa8e782539fba3c0878860e6beb0&language=en-US&page=${page}&with_networks=213`)
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

    // const data = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0af5fa8e782539fba3c0878860e6beb0&language=en-US&page=${page+1}&with_networks=213`)
    // .then((response) => response.json())
    // .catch((err) => console.log(err.message));
    
    // data.results.forEach((item: Movie) => {
    //   item.media_type = "tv";
    // });

    // setMovies([...movies, ...data.results]);
    setPage(page+1);
    // console.log(movies);
    
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