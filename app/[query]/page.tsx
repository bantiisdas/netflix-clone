'use client'
 

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { GridView, Header } from '@/components'
import { Movie } from '@/typing'
import requests from '@/utils/requests'
import { Box, LinearProgress } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

 
export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string>("");
  const queryResult = pathname.replace(/\//g, "");
  // const query = "fetch"+(queryResult.charAt(0).toUpperCase() + queryResult.slice(1))
  

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);
  

  const fetchMovies = async () => {
    
    const response = await fetch(
      requests[query]+`&page=${page}`
    );
    const data = await response.json();
    if(queryResult === "sciFiFantTv" || queryResult === "actionTv"|| queryResult === "warPoliticsTv"|| queryResult === "crimeTv"|| queryResult === "animatedTv"|| queryResult === "mysteryTv"|| queryResult === "comedyTv"){
        data.results.forEach((item: Movie) => {
          item.media_type = "tv";
        });
      }
    // console.log(data.results);
    setTotalItems(data.total_results);
    // console.log(data.total_results);
    
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
    const query = "fetch"+(queryResult.charAt(0).toUpperCase() + queryResult.slice(1))
    setQuery(query)
    // console.log(query);
    
    fetchMovies();
  }, [pathname, searchParams, query, page])

//  console.log(query);
// console.log(movies);

 
  return (
    <RecoilRoot>
      <main className={`relative h-screen bg-gradient-to-b ${movies.length !== 0 && "lg:h-[140vh]"}`}>
        <Header/>
        
        {movies.length !== 0 ? (
          <>
            <InfiniteScroll
              dataLength={movies.length} //This is important field to render the next data
              next={loadMoreMovies}
              hasMore={totalItems>movies.length}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <GridView gridMovies={movies} title={requests[query][1]}/>
              {/* <button onClick={loadMoreMovies}>Load More</button> */}
            </InfiniteScroll>
          </>
        ) : (
          <div className='flex justify-center items-center h-screen'>
            
            <p className='text-center'>Still Building</p>
          </div>
        )}
        
      </main>
    </RecoilRoot>
  )
}


  