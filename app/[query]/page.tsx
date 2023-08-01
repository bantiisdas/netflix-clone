'use client'
 
import { GridView, Header } from '@/components'
import { Movie } from '@/typing'
import requests from '@/utils/requests'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
 
export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // const [query, setQuery] = useState<string>("");
  const queryResult = pathname.replace(/\//g, "");
  const query = "fetch"+(queryResult.charAt(0).toUpperCase() + queryResult.slice(1))
  
  // const queryGenerator = () => {
  //   const queryResult = pathname.replace(/\//g, "");
  //   const query = "fetch"+(queryResult.charAt(0).toUpperCase() + queryResult.slice(1))
  //   setQuery(query);
  // }

 

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  
  

  const fetchMovies = async () => {
    
    const response = await fetch(
      requests[query]
    );
    const data = await response.json();
    if(queryResult === "sciFiFantTv" || queryResult === "actionTv"|| queryResult === "warPoliticsTv"|| queryResult === "crimeTv"|| queryResult === "animatedTv"|| queryResult === "mysteryTv"|| queryResult === "comedyTv"){
        data.results.forEach((item: Movie) => {
          item.media_type = "tv";
        });
      }
    
    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchMovies();
  }, [pathname, searchParams])

//  console.log(query);
console.log(movies);

 
  return (
    <RecoilRoot>
      <main className={`relative h-screen bg-gradient-to-b ${movies.length !== 0 && "lg:h-[140vh]"}`}>
        <Header/>
        {movies.length !== 0 ? (
          <GridView gridMovies={movies}/>
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <p className='text-center'>Still Building</p>
          </div>
        )}
        
      </main>
    </RecoilRoot>
  )
}


  