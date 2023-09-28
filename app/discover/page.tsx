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
import {
  ListBulletIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import MovieDetails from "@/components/MovieDetails";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function page() {
  // const pathname = usePathname()
  const searchParams = useSearchParams();
  // const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState<Movie>();
  const [show, setShow] = useState<Movie | null>(null);

  const [credits, setCredits] = useState<Credit[]>([]);
  const [imdbId, setImdbId] = useState<string>("");
  // const search = searchParams.get('search')
  const query =
    searchParams.get("movie")?.split("-")[0] ||
    searchParams.get("tv")?.split("-")[0] ||
    searchParams.get("person")?.split("-")[0];

  const contentType = searchParams.get("movie")
    ? "movie"
    : searchParams.get("tv")
    ? "tv"
    : "person";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${query}?language=en-US&api_key=${API_KEY}`
      );
      console.log(
        `https://api.themoviedb.org/3/movie/${query}?language=en-US&api_key=${API_KEY}`
      );

      const data = await response.json();

      // setSearchResults(data.results);
      console.log(data);
      setImdbId(data?.imdb_id);
      if (!data.media_type) {
        data.media_type = contentType;
      }
      setShow(data);
    } catch (error) {
      console.error();
    }
  };

  const fetchCredits = async () => {
    if (contentType === "movie") {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${query}/credits?language=en-US&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      const jobTitlesToFilter = [
        "Screenplay",
        "Story",
        "Director",
        "Characters",
        "Creator",
      ];

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
    }
    // else if (contentType === "tv") {
    //   const creators = data.crew.filter(
    //     (person) => person.known_for_department === "Writing"
    //   );
    //   console.log(creators);

    //   setCredits(creators);
    // }

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
  };

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
    console.log("hi" + query + "hi");
    if (query) {
      fetchData();

      fetchCredits();
    }

    console.log("ImdbId=" + imdbId);
  }, [query, contentType]);

  return (
    <RecoilRoot>
      <main className="relative ">
        <Header />
        {/* <SingleShow bannerItem={searchResults}/> */}

        <div className="relative w-screen sm:h-[88vh] mt-[72px]">
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

            <MovieDetails
              show={show}
              credits={credits}
              imdbId={imdbId}
              contentType={contentType}
            />
          </div>
        </div>
      </main>
    </RecoilRoot>
  );
}
