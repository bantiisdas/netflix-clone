"use client";

import { Cast, Movie } from "@/typing";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Thumbnail from "./Thumbnail";

import { useRef, useState } from "react";

import { useRouter } from "next/navigation";

interface Props {
  title: String;
  movies: Movie[];
  search?: string;
  seeMoreBtn?: boolean;
}

const Row = ({ title, movies, search, seeMoreBtn }: Props) => {
  // const [gridMovies, setGridMovies] = useRecoilState(gridMovieState);

  const router = useRouter();

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isAtFirst, setiIsAtFirst] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // if (rowRef.current) {
  //   const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
  //   setiIsAtFirst(scrollLeft === 0);
  // }

  const handleClick = (direction: String) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      if (scrollTo + clientWidth >= scrollWidth) {
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          {title}
        </h2>
        <button
          className={`${seeMoreBtn === false ? "hidden" : ""} pr-8`}
          onClick={() => {
            // setGridMovies(movies)
            router.push(`${search}`);
          }}
        >
          See More
        </button>
      </div>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`max-md:hidden absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          } `}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-1.5 overflow-x-scroll md:space-x-2.5 md:p-2  scrollbar-hide"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className={`max-md:hidden absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            isAtEnd && "hidden"
          }`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
