"use client";

import { Cast, Movie } from "@/typing";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Thumbnail from "./Thumbnail";
import ShowCastCard from "./ShowCastCard";
import {
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useRecoilState } from "recoil";
import { gridMovieState } from "@/atoms/modalAtom";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  title: String;
  casts: Cast[];
  search?: string;
}

const Row = ({ title, casts, search }: Props) => {
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
    <div className="h-full space-y-0.5 md:space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          } `}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-start space-x-1.5 overflow-x-scroll md:space-x-2.5 p-2 md:px-4 scrollbar-hide"
        >
          {casts.map((cast) => (
            <div
              className={`${
                !cast.profile_path && "hidden"
              } h-[200px] md:h-[270px] flex flex-col shadow-sm shadow-black rounded-md`}
            >
              <div
                className={`${
                  !cast.profile_path && "hidden"
                } relative h-[120px] min-w-[100px]  cursor-pointer transition duration-200 ease-out md:h-[180px] md:min-w-[128px] `}
                onClick={() => {
                  router.push(`discover?person=${cast.cast_id}`);
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt="Cast"
                  fill
                  className="rounded-t-sm object-cover md:rounded-t-md"
                />
              </div>
              <div className=" w-full ">
                <p className="flex justify-start pt-2 md:pt-3 px-2 text-xs md:text-sm font-medium">
                  {cast.name}
                </p>
                <span className="mt-1 md:mt-2 flex justify-start font-light md:font-normal text-xs px-2">
                  {cast.character}
                </span>
              </div>
            </div>
          ))}
        </div>
        <ChevronRightIcon
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            isAtEnd && "hidden"
          }`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
