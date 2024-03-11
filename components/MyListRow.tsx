"use client";

import { Movie } from "@/typing";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShareLink } from "./ShareLink";

interface Props {
  title: string;
  isEmpty: boolean;
  shows: string;
  listId?: string;
  expandBtn?: boolean;
  noListMessage?: string;
}
interface showDetailsProps {
  showId: string;
  type: string;
  name: string;
  posterPath: string;
  backdropPath: string;
  _id: string;
}

const MyListRow = ({
  title,
  isEmpty,
  shows,
  listId,
  expandBtn,
  noListMessage,
}: Props) => {
  const router = useRouter();

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isAtFirst, setiIsAtFirst] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showDetails, setShowDetails] = useState([]);
  // console.log(shows);
  useEffect(() => {
    if (!isEmpty) {
      setShowDetails(JSON.parse(shows));
    }
  }, []);

  // console.log(showDetails);

  // const showDetails = JSON.parse(shows);
  // const isEmpty = showDetails.length === 0 || showDetails === false;
  console.log(isEmpty + " check");

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
    <div
      className={`${isEmpty ? "h-24 lg:h-7" : "h-40"} space-y-1 md:space-y-2`}
    >
      <div className="flex items-center justify-between pb-2">
        <h2 className="w-96 cursor-pointer text-base font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          {title}
        </h2>
        <div className="flex flex-row gap-4 items-center -mb-1 md:-mb-2">
          <ShareLink link={`https://watchflix-six.vercel.app/list/${listId}`} />
          <Link href={`/list/${listId}`} className="">
            <button
              className={`${
                expandBtn === false ? "hidden" : ""
              } text-[#e5e5e5] hover:text-white text-sm md:text-base font-semibold pr-4`}
              // onClick={() => {
              //   router.push(`/list/${listId}`);
              // }}
            >
              Expand
            </button>
          </Link>
        </div>
      </div>
      {isEmpty ? (
        <p className="text-sm md:text-base py-1 md:py-2 px-1 md:px-2">
          {noListMessage}
        </p>
      ) : (
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
                    `discover?${show.type || "movie"}=${show.showId}-${
                      show.name
                    }`
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
      )}
    </div>
  );
};

export default MyListRow;
