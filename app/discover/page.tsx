"use client";

import { modalState } from "@/atoms/modalAtom";
import { Banner, Header, MainContents, Row } from "@/components";
import SingleShow from "@/components/SingleShow";
import useAuth from "@/hooks/useAuth";
import { Movie } from "@/typing";
// import { fetchMovies } from '@/utils/requests';
import requests from "@/utils/requests";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function page() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  // const search = searchParams.get('search')
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
      );
      
      const data = await response.json();

      setSearchResults(data.results);
      console.log(data);
      
      
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    const movie = searchParams.get('movie')
    const tv = searchParams.get('tv')
    const person = searchParams.get('person')
    if(movie){
      setQuery(movie.replace(/ /g, '%20'))
    }
    else if(tv){
      setQuery(tv.replace(/ /g, '%20'))
    }
    else if(person){
      setQuery(person.replace(/ /g, '%20'))
    }
    console.log(query);
    
    fetchData();
  }, [searchParams, query]);


  return (
    <RecoilRoot>
      <main className="relative h-screen bg-gradient-to-b">
        <Header />
          <SingleShow bannerItem={searchResults}/>
      </main>
    </RecoilRoot>
  );
}
