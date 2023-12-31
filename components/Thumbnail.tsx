"use client";

// import { modalState, movieState } from "@/atoms/modalAtom";
import { Cast, Movie } from "@/typing";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useRecoilState } from "recoil";

interface Props {
  movie: Movie;
  isCast?: boolean;
}

const Thumbnail = ({ movie, isCast }: Props) => {
  // const [showModal, setShowModal] = useRecoilState(modalState);
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const router = useRouter();

  const movieName = (movie?.name || movie?.title)?.replace(/ /g, "-");

  return (
    <div
      className={`${
        !(movie.backdrop_path || movie.poster_path) && "hidden"
      } relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        router.push(
          `discover?${movie?.media_type || "movie"}=${movie.id}-${movieName}`
        );
        // console.log(movie);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt="Movie"
        fill
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
};

export default Thumbnail;
