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
import { Color } from "color-thief-react";

import { resolve } from "path";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Loading = () => <div>Loading...</div>;

export default function page() {
  // const pathname = usePathname()
  const searchParams = useSearchParams();
  // const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState<Movie>();
  const [show, setShow] = useState<Movie | null>(null);

  const [credits, setCredits] = useState<Credit[]>([]);
  const [imdbId, setImdbId] = useState<string>("");
  // const search = searchParams.get('search')

  // const ColorThief = require("colorthief");

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

      // if (data?.poster_path) {
      //   const img = resolve(
      //     process.cwd(),
      //     `https://image.tmdb.org/t/p/original/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg`
      //   );

      //   ColorThief.getColor(img)
      //     .then((color) => {
      //       console.log(color);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }

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
            <Image
              src={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`} // Provide the URL for the backdrop image
              alt="Elemental" // Set the alt text for accessibility
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Details */}

          <MovieDetails
            show={show}
            credits={credits}
            imdbId={imdbId}
            contentType={contentType}
          />
        </div>
      </main>
    </RecoilRoot>
  );
}
