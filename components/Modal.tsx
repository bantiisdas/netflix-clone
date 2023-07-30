"use client";

import { modalState, movieState } from "@/atoms/modalAtom";
import { Genre, Movie } from "@/typing";
import { HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Element } from "@/typing";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaVolumeOff, FaVolumeUp } from "react-icons/fa";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false)


  
  const handleClose = () => {
    setShowModal(false);
  };
  // console.log(movie);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {

      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      //---------------------------------------

      // const url = `ttps://api.themoviedb.org/3/${
      //   movie?.media_type === "tv" ? "tv" : "movie"
      // }/${movie?.id}?api_key=${
      //   process.env.NEXT_PUBLIC_API_KEY
      // }&language=en-US&append_to_response=videos`

      // console.log(url);
      
      // const data = await fetch(
      //   url
      // )
      //   .then((response) => response.json())
      //   .catch((err) => console.log(err.message));


      // const data = await fetch(
      //   `https://api.themoviedb.org/3/tv/${movie?.id}?api_key=${
      //     process.env.NEXT_PUBLIC_API_KEY
      //   }&language=en-US&append_to_response=videos`
      // )
      //   .then((response) => response.json())
      //   .catch((err) => console.log(err.message));

      //---------------------------------------

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );

        setTrailer(data.videos?.results[index]?.key);
        if (data?.genres) {
          setGenres(data.genres);
        }
      }
    }

    const screenWidth = window.innerWidth;
    // console.log(screenWidth)
    if(screenWidth<=475){
      setIsMobile(true)
    }
    else{
      setIsMobile(false)
    }
    fetchMovie();
  }, [movie]);
    // console.log(movie?.media_type);
    
    // console.log(trailer);

  return (
    <MuiModal open={showModal} onClose={handleClose} className="fixed !top-0 xs:!top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            controls
            muted={muted}
          />
          <div className={`absolute bottom-10 flex w-full justify-end items-center xs:justify-between px-10`}>
            
            <div className="hidden xs:flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="xs:h-7 xs:w-7 text-black"/>
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className="h-7 w-7"/>
              </button>

              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7"/>
              </button>
            </div>
            
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted? (
                <FaVolumeOff className="h-6 w-6"/>
              ) : (
                <FaVolumeUp className="h-6 w-6"/>
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
         

          <div className="space-y-6 text-lg">
          <div className="flex w-full justify-center items-center">
            <p className="text-2xl">{movie?.name || movie?.title}</p>
          </div>
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">{movie?.vote_average *10}% Match</p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-x5">
                HD
              </div>
            </div>
            
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>

                <div>
                <span className="text-[gray]">Rating: </span>
                  {movie?.vote_average}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
