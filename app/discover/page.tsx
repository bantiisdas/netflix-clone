"use client";

// import { modalState } from "@/atoms/modalAtom";
import { Banner, Header, MainContents, Row } from "@/components";
import CircularRating from "@/components/CircularRating";
// import SingleShow from "@/components/SingleShow";
// import useAuth from "@/hooks/useAuth";
import { Credit, Movie } from "@/typing";
// import { fetchMovies } from '@/utils/requests';
// import requests from "@/utils/requests";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ListBulletIcon, StarIcon, HeartIcon, BookmarkIcon, PlayIcon } from "@heroicons/react/20/solid";
import MovieDetails from "@/components/MovieDetails";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export default function page() {
  // const pathname = usePathname()
  const searchParams = useSearchParams()
  // const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState<Movie>();
  const [show, setShow] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credit[]>([])
  const [imdbId, setImdbId] = useState("")
  const [omdbData, setOmdbData] = useState<any>()
  // const search = searchParams.get('search')
  const query = (searchParams.get("movie"))?.split('-')[0] || (searchParams.get("tv"))?.split('-')[0] || (searchParams.get("person"))?.split('-')[0];
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${query}?language=en-US&api_key=${API_KEY}`
      );
      console.log(`https://api.themoviedb.org/3/movie/${query}?language=en-US&api_key=${API_KEY}`);
      
      const data = await response.json();

      // setSearchResults(data.results);
      console.log(data);
      setImdbId(data?.imdb_id)
      setShow(data)
      
    } catch (error) {
      console.error();
    }
  };

  const fetchCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${query}/credits?language=en-US&api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    
    const jobTitlesToFilter = ['Screenplay', 'Story', 'Director', 'Characters'];

    const mergedArray = data.crew
      .filter(({ job }) => jobTitlesToFilter.includes(job))
      .reduce((mergedData, { id, name, job }) => {
        const existingEntry = mergedData.find((entry) => entry.id === id);
        
        if (existingEntry) {
          existingEntry.job.push(job);
        } else {
          mergedData.push({ id, name, job: [job] });
        }
        
        return mergedData;
      }, []);

    console.log(mergedArray);
    setCredits(mergedArray);



    // const filteredCast = data.crew.filter((person) => {
    //   const jobs = ['Screenplay', 'Story', 'Director', 'Characters'];
    //   return jobs.includes(person.job);
    // });
    // console.log(filteredCast);
    // const mergedCast = filteredCast.reduce((acc, person) => {
    //   const existingPerson = acc.find((p) => p.id === person.id);
    //   if (existingPerson) {
    //     if (Array.isArray(existingPerson.job)) {
    //       existingPerson.job.push(person.job);
    //     } else {
    //       existingPerson.job = [existingPerson.job, person.job];
    //     }
    //   } else {
    //     acc.push(person);
    //   }
    //   return acc;
    // }, []);
    
    // console.log(mergedCast);
    // setCredits(mergedCast);
    
  }

  const fetchContentRating = async (imdbId: string) => {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
      
    console.log(data);

    setOmdbData(data);
  }

  useEffect(() => {
    // const movie = searchParams.get('movie')
    // const tv = searchParams.get('tv')
    // const person = searchParams.get('person')
    // if(movie){
    //   setQuery(movie.split('-')[0])
    // }
    // else if(tv){
    //   setQuery((tv.replace(/ /g, '%20')).split('-')[0])
    // }
    // else if(person){
    //   setQuery((person.replace(/ /g, '%20')).split('-')[0])
    // }
    console.log("hi"+query+"hi");
    if(query)
    fetchData();

    fetchCredits()
      
    if(imdbId){
      console.log("hi");
      
      fetchContentRating(imdbId);
    }

  }, [query, imdbId]);

  useEffect(() => {
    
  }, [omdbData])
  

  const formatDate = (inputDate?: string) => {
    if(!inputDate) return;

    const parts = inputDate.split("-");
    
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    
    return formattedDate;
  }
  
  const formatDuration = (time: number) => {
    if(!time) return
    let formatedTime = '';
    if(time && time > 60){
      let hour = Math.floor(time / 60);
      let minute = Math.round(time % 60);
      formatedTime = `${hour}h ${minute}m`;
      return formatedTime;
    }
  }


  return (
    <RecoilRoot>
      <main className="relative ">
        <Header />
          {/* <SingleShow bannerItem={searchResults}/> */}

        <div  className="relative w-screen sm:h-[88vh] mt-[72px]">
      
          <div className="absolute h-[30vh] sm:h-full -z-10 w-full opacity-95 sm:opacity-20 ">
            <img
              src={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`} // Provide the URL for the backdrop image
              alt="Elemental" // Set the alt text for accessibility
              
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="relative w-screen sm:w-full h-full flex flex-col sm:flex-row justify-start sm:justify-between items-center ">
            {/* Movie Poster (on the left) */}
            <div className="w-full sm:w-1/3 h-[30vh] sm:h-full py-5 sm:py-10 pl-5 sm:pl-0 flex items-center justify-start sm:justify-center">
              
              <img
                src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} // Provide the URL for the movie poster
                alt="Movie" // Set the alt text for accessibility
                
                className="max-h-full max-w-full object-contain rounded-lg"
              />
              
            </div>

            <>
            {/* Movie Details (on the right) */}
            {/* <div className="w-screen sm:w-2/3 text-white p-4 flex flex-col items-start justify-start gap-3">
              <div className="w-full">
                <h1 className="flex flex-row mt-3 items-center justify-center sm:justify-start text-xl sm:text-4xl font-bold mb-1">{show?.title || show?.original_name}&nbsp;<p className="text-gray-200 font-normal">({(show?.release_date)?.split('-')[0]})</p></h1>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-400">
                    {omdbData?.Rated}
                  </span>
                  <span>{formatDate(show?.release_date)}&nbsp;&#x2022;</span>
                  <span>{show?.genres?.map((genre) => (
                    genre.name
                  )).join(', ')}&nbsp;&#x2022;</span> 
                  <span>{show?.runtime && formatDuration(show?.runtime)}</span>
                </div>
              </div>

              <div className="w-full mt-1 sm:mt-4 mb-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                <div className="w-full sm:w-auto flex flex-row items-center justify-between px-4 sm:px-0">
                  <div className="flex flex-row gap-0 sm:gap-3 items-center">
                    <CircularRating percent={show?.vote_average}/>
                    <div className="flex flex-row sm:flex-col font-semibold gap-1 sm:gap-0">
                      <span>User</span>
                      <span>Score</span>
                    </div>
                  </div>

                  <div className="flex sm:hidden h-7 bg-gray-500 w-[1px]"/>

                  <div className="flex sm:hidden flex-row gap-2">
                    <PlayIcon className="h-6 w-6 text-white" />Play Trailer
                  </div>
                </div>

                <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-center sm:gap-6 px-12 sm:px-0">
                  <div className="movieDetailsIconsParent">
                    <ListBulletIcon className="movieDetailsIcons" />
                  </div>

                  <div className="movieDetailsIconsParent">
                    <HeartIcon className="movieDetailsIcons" />
                  </div>

                  <div className="movieDetailsIconsParent">
                    <BookmarkIcon className="movieDetailsIcons" />
                  </div>

                  <div className="movieDetailsIconsParent">
                    <StarIcon className="movieDetailsIcons" />
                  </div>

                  <div className="hidden sm:flex flex-row gap-2">
                    <PlayIcon className="h-6 w-6 text-white" />Play Trailer
                  </div>
                </div>
              </div> */}

              {/* Info div */}
              
              {/* <div className="bg-[#333333] flex -mx-4 sm:hidden flex-col py-3 w-screen items-center justify-center gap-1 text-sm font-normal">
                <div className="flex flex-row">
                  <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-400">
                    {omdbData?.Rated}
                  </span>&nbsp;
                  <span>{formatDate(show?.release_date)}&nbsp;&#x2022;</span>&nbsp;
                  <span>{show?.runtime && formatDuration(show?.runtime)}</span>
                </div>
                <span>{show?.genres?.map((genre) => (
                    genre.name
                  )).join(', ')}</span> 
              </div>

              <div className="px-2 sm:px-0 mt-3 sm:mt-0">
                <h2 className="text-lg sm:text-xl font-bold pb-1 sm:pb-2">Overview</h2>
                <p className="text-sm mb-4">{show?.overview}</p>
              </div>
              
              <div className="flex flex-row flex-wrap px-2 sm:px-0 w-full">
                {credits.map((person) => (
                  <div className="w-1/2 pr-2 py-2">
                    <h4 className="font-medium text-sm">
                      {person.name}
                    </h4>
                    <p className="font-light text-sm">
                      {person.job?.map((job) => (
                        job
                      )).join(', ')}
                    </p>
                </div>
                ))}

              </div>
            </div> */}
            </>

            <MovieDetails show={show} credits={credits} contentRating={omdbData?.Rated}/>

          </div>
      
        </div>

      </main>
    </RecoilRoot>
  );
}
