"use client";

import { baseUrl } from '@/constants/movie';
import { Movie } from '@/typing'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import { useRouter } from 'next/navigation';

interface Props {
  bannerItem: Movie[]
}

const Banner = ({ bannerItem }: Props) => {
//   console.log("hello");
  
// console.log(netflixOriginals);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const router = useRouter()
  useEffect(() => {
    setMovie(
      bannerItem[Math.floor(Math.random() * bannerItem.length)]
    )
  }, [bannerItem])

  // console.log(movie);

  const trimMovieDescription = (movieOverview: String) => {
    let maxLimit = 166;
    if (movieOverview.length <= maxLimit) {
      return movieOverview;
    }
  
    const trimmedString = movieOverview.substring(0, maxLimit);
  
    if (trimmedString.lastIndexOf('.') >= 0) {
      return trimmedString.substring(0, trimmedString.lastIndexOf('.') + 1);
    } else {
      const words = trimmedString.trim().split(/\s+/);
      let result = '';
      let count = 0;
  
      for (const word of words) {
        if (count + word.length + 1 <= maxLimit) {
          result += word + ' ';
          count += word.length + 1;
        } else {
          break;
        }
      }

      result = result.trim();
      if (result[result.length - 1] !== '.') {
        result += '...';
      }
  
      return result;
    }
  }
  
  
  
  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt='Banner Poster'
          fill
          objectFit="cover"
          priority={true}
        
        />
      </div>

        <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
          { movie?.overview && trimMovieDescription(movie?.overview)}
        </p>

        <div className='flex space-x-3'>
          <button className='bannerButton bg-white text-black'
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          >
            <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7'/> Play
          </button>
          <button className='bannerButton bg-[gray]/70'
            onClick={() => {
              router.push(`discover?movie=${movie?.id}-${movie?.name || movie?.title}`)
            }}
          >
            <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8'/> More Info
          </button>
        </div>
    </div>
  )
}

export default Banner;


