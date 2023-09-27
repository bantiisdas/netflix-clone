"use client"
import { useEffect, useState } from "react";
import { formatDate, formatDuration } from '@/constants/functions'
import { Credit, Movie } from '@/typing'
import CircularRating from './CircularRating';
import { ListBulletIcon, StarIcon, HeartIcon, BookmarkIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import Modal from './Modal';


interface Props {
  show: Movie | null;
  credits: Credit[];
  imdbId: string;
}

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

const MovieDetails = ({ show, credits, imdbId }: Props) => {
  const [omdbData, setOmdbData] = useState<any>()
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const playBtnClick = () => {
    setCurrentMovie(show)
    setShowModal(true)
  }
  
  

  const fetchContentRating = async (imdbId: string) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    console.log(`https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`);
    
    const data = await response.json();
      
    console.log(data);

    setOmdbData(data);
  }

  useEffect(() => {
    if(imdbId){
      fetchContentRating(imdbId);
    }
  }, [imdbId])
  
  return (
    <>
      <div className="w-screen sm:w-2/3 text-white p-4 flex flex-col items-start justify-start gap-3">
        <div className="w-full">
          <h1 className="flex flex-row mt-3 items-center justify-center sm:justify-start text-xl sm:text-4xl font-bold mb-1">{show?.title || show?.original_name}&nbsp;<p className="text-gray-200 font-normal">({(show?.release_date)?.split('-')[0]})</p></h1>
          <div className="hidden sm:flex items-center gap-2">
            <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-400">
              {omdbData?.Rated}
            </span>
            <span>{formatDate(show?.release_date)}&nbsp;&#x2022;</span>
            <span>{show?.genres?.map((genre) => (
              genre.name
            )).join(', ')}&nbsp;&#x2022;</span> 
            <span>{show?.runtime && formatDuration(show?.runtime)}</span>
          </div>
        </div>

        <div className="w-full mt-1 sm:mt-4 mb-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          <div className="w-full sm:w-auto flex flex-row items-center justify-between px-4 sm:px-0">
            <div className="flex flex-row gap-0 sm:gap-3 items-center">
              <CircularRating percent={show?.vote_average}/>
              <div className="flex flex-row sm:flex-col font-semibold gap-1 sm:gap-0">
                <span>User</span>
                <span>Score</span>
              </div>
            </div>

            <div className="flex sm:hidden h-7 bg-gray-500 w-[1px]"/>

            <div className="flex sm:hidden flex-row gap-2 cursor-pointer" onClick={playBtnClick}>
              <PlayIcon className="h-6 w-6 text-white" />Play Trailer
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-center sm:gap-6 px-12 sm:px-0">
            <div className="movieDetailsIconsParent">
              <ListBulletIcon className="movieDetailsIcons" />
            </div>

            <div className="movieDetailsIconsParent">
              <HeartIcon className="movieDetailsIcons" />
            </div>

            <div className="movieDetailsIconsParent">
              <BookmarkIcon className="movieDetailsIcons" />
            </div>

            <div className="movieDetailsIconsParent">
              <StarIcon className="movieDetailsIcons" />
            </div>

            <div className="hidden sm:flex flex-row gap-2 cursor-pointer" onClick={playBtnClick}>
              <PlayIcon className="h-6 w-6 text-white" />Play Trailer
            </div>
          </div>
        </div>

        {/* Info div */}
        <div className="bg-[#333333] flex -mx-4 sm:hidden flex-col py-3 w-screen items-center justify-center gap-1 text-sm font-normal">
          <div className="flex flex-row">
            <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-400">
              {omdbData?.Rated}
            </span>&nbsp;
            <span>{formatDate(show?.release_date)}&nbsp;&#x2022;</span>&nbsp;
            <span>{show?.runtime && formatDuration(show?.runtime)}</span>
          </div>
          <span>{show?.genres?.map((genre) => (
              genre.name
            )).join(', ')}</span> 
        </div>

        <div className="px-2 sm:px-0 mt-3 sm:mt-0">
          <h2 className="text-lg sm:text-xl font-bold pb-1 sm:pb-2">Overview</h2>
          <p className="text-sm mb-4">{show?.overview}</p>
        </div>
      
        <div className="flex flex-row flex-wrap px-2 sm:px-0 w-full">
          {credits.map((person) => (
            <div className="w-1/2 pr-2 py-2">
              <h4 className="font-medium text-sm">
                {person.name}
              </h4>
              <p className="font-light text-sm">
                {person.job?.map((job) => (
                  job
                )).join(', ')}
              </p>
          </div>
          ))}

        </div>
      </div>
      {showModal && <Modal/>}
    </>
  
  )
}

export default MovieDetails