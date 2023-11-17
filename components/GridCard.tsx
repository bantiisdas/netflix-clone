"use client";

import { Movie } from "@/typing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  showId: string;
  showName: string;
  mediaType: string;
  backdropPath: string;
  posterPath: string;
}

const GridCard = ({
  showId,
  showName,
  mediaType,
  backdropPath,
  posterPath,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="relative h-0 pb-[56.25%]  cursor-pointer transition duration-200 ease-out md:h-0 md:pb-[56.25%]  md:hover:scale-105"
      // onClick={() => {
      //   router.push(`discover?${mediaType || "movie"}=${showId}-${showName}`);
      // }}
    >
      <Link href={`/discover?${mediaType || "movie"}=${showId}-${showName}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${backdropPath || posterPath}`}
          alt={showName}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </Link>
    </div>
  );
};

export default GridCard;
