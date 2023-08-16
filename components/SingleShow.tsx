"use client";

import { baseUrl } from '@/constants/movie';
import { Movie } from '@/typing'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Row from './Row';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import Modal from './Modal';
import { useSearchParams } from 'next/navigation';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// import { useRecoilState } from 'recoil';
// import { modalState, movieState } from '@/atoms/modalAtom';

interface Props {
  bannerItem: Movie[]
}

const SingleShow = ({ bannerItem }: Props) => {
//   console.log("hello");
  
// console.log(netflixOriginals);
const searchParams = useSearchParams()
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genre, setGenre] = useState("")
  const [relatedMovies, setRelatedMovies] = useState([])
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);

const fetchRelatedMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`
    );
    
    const data = await response.json();

    setRelatedMovies(data.results);
    
  } catch (error) {
    console.error();
  }
};

  useEffect(() => {
    setMovie(bannerItem[0])
    setGenre((bannerItem[0]?.genre_ids)?.join('%7C'))
    
    fetchRelatedMovies();

    setSeeMoreDetails(false);
    
  }, [bannerItem, genre, searchParams])
    
  // console.log(genre);
  // console.log(movie);

  const trimMovieDescription = (movieOverview: String | undefined) => {
    if(!movieOverview) return;
    let maxLimit = 166;
    if (movieOverview.length <= maxLimit) {
      setSeeMoreDetails(true);
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
  
  //
  
  return (
    <>
      <div className="relative pt-7  pl-4 pb-24 lg:space-y-24 lg:pl-16">
          {/* lg:h-[65vh]  for below div deleted */}
        <div className='flex flex-col space-y-2 py-16 md:space-y-4  lg:justify-end lg:pb-12'>
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
              { seeMoreDetails ? movie?.overview : trimMovieDescription(movie?.overview) }&nbsp;&nbsp;
              {!seeMoreDetails && <button onClick={() => setSeeMoreDetails(!seeMoreDetails)} className='text-base font-light opacity-60 underline'>see more</button>}
            </p>
            
            {movie?.vote_average && <span>Rating: {Math.round((movie?.vote_average)*10)/10}</span>}

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
                  setCurrentMovie(movie)
                  setShowModal(true)
                }}
              >
                <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8'/> More Info
              </button>
            </div>
        </div>
        <Row title="People also like" movies={relatedMovies}/>
        
      </div>
      {showModal && <Modal/>}
    </>
  )
}

export default SingleShow;


