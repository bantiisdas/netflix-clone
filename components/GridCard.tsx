"use client"

import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/typing"
import Image from "next/image";
import { useRecoilState } from "recoil";

interface Props {
    movie: Movie;
}

const GridCard = ({ movie }: Props) => {

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
        key={movie.id}
        className="relative h-0 pb-[56.25%] min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-0 md:pb-[56.25%]  md:hover:scale-105"
        onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
            // console.log(movie);
        }}
    >
        <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            alt="Movie"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
        />
    </div>
  )
}

export default GridCard;