"use client"

import React, { useState } from 'react'
import Banner from './Banner'
import Row from './Row'
import { Movie } from '@/typing';
import { useRecoilValue } from 'recoil';
import { gridMovieState, modalState } from '@/atoms/modalAtom';
import Modal from './Modal';
import GridView from './GridView';

interface Props {
    netflixOriginals : Movie[];
    trendingNow : Movie[];
    topRated : Movie[];
    actionMovies : Movie[];
    comedyMovies : Movie[];
    horrorMovies : Movie[];
    romanceMovies : Movie[];
    documentaries : Movie[];
  }

const MainContents = ({ 
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries }: Props) => {

    const showModal = useRecoilValue(modalState);
    const [hideRows, setHideRows] = useState(false);
    const gridMovies = useRecoilValue(gridMovieState);
    
    const rowClick = () => {
      setHideRows(true);
    }

  return (
    <>
      <div className='relative pt-7  pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={netflixOriginals}/>
          <section className={`${hideRows && "hidden"} md:space-y-24`}>
            <Row title="Tranding Now" movies={trendingNow} rowClick={rowClick}/>
            <Row title="Top Rated" movies={topRated} rowClick={rowClick}/>
            <Row title="Action Thrillers" movies={actionMovies} rowClick={rowClick}/>
            {/* My List */}
            
            <Row title="Comedies" movies={comedyMovies} rowClick={rowClick}/>
            <Row title="Scary Movies" movies={horrorMovies} rowClick={rowClick}/>
            <Row title="Romance Movies" movies={romanceMovies} rowClick={rowClick}/>
            <Row title="Documentaries" movies={documentaries} rowClick={rowClick}/>
          </section>
          <GridView gridMovies={gridMovies}/>
      </div>
      {showModal && <Modal/>}
    </>
  )
}

export default MainContents