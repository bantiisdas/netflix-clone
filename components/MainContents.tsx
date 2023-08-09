"use client"

import React, { useState } from 'react'
import Banner from './Banner'
import Row from './Row'
import { Movie } from '@/typing';
import { useRecoilValue } from 'recoil';
import { gridMovieState, modalState } from '@/atoms/modalAtom';
import Modal from './Modal';
// import GridView from './GridView';

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
    // const [hideRows, setHideRows] = useState(false);
    // const gridMovies = useRecoilValue(gridMovieState);
    
    

  return (
    <>
      <div className='relative pt-7  pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner bannerItem={netflixOriginals}/>
          <section className={`md:space-y-24`}>
            <Row title="Tranding Now" movies={trendingNow} search="trendingNow" />
            <Row title="Top Rated" movies={topRated} search="topRated" />
            <Row title="Action Thrillers" movies={actionMovies} search="actionMovies" />
            {/* My List */}
            
            <Row title="Comedies" movies={comedyMovies} search="comedyMovies" />
            <Row title="Scary Movies" movies={horrorMovies} search="horrorMovies" />
            <Row title="Romance Movies" movies={romanceMovies} search="romanceMovies" />
            <Row title="Documentaries" movies={documentaries} search="documentaries" />
          </section>
          {/* <GridView gridMovies={gridMovies}/> */}
      </div>
      {showModal && <Modal/>}
    </>
  )
}

export default MainContents