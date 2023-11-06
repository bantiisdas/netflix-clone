"use client";

import { Movie } from "@/typing";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  title: string;
  shows: string;
  search?: string;
  seeMoreBtn?: boolean;
}
interface showDetailsProps {
  showId: string;
  type: string;
  name: string;
  posterPath: string;
  backdropPath: string;
  _id: string;
}

const MyListRow = ({ title, shows, search, seeMoreBtn }: Props) => {
  const router = useRouter();

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isAtFirst, setiIsAtFirst] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  // console.log(shows);

  const showDetails = JSON.parse(shows);

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
        <h2 className="w-96 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          {title}
        </h2>
        <button
          className={`${seeMoreBtn === false ? "hidden" : ""} pr-8`}
          onClick={() => {
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
          {showDetails.map((show: showDetailsProps) => (
            <div
              key={show._id}
              className={`${
                !(show.backdropPath || show.posterPath) && "hidden"
              } relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
              onClick={() => {
                router.push(
                  `discover?${show.type || "movie"}=${show.showId}-${show.name}`
                );
              }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w400${
                  show.backdropPath || show.posterPath
                }`}
                alt="Movie"
                fill
                className="rounded-sm object-cover md:rounded"
              />
            </div>
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

export default MyListRow;
