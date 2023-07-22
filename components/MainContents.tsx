"use client"

import React from 'react'
import Banner from './Banner'
import Row from './Row'
import { Movie } from '@/typing';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/atoms/modalAtom';
import Modal from './Modal';

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

      const showModal = useRecoilValue(modalState)

  return (
    <>
      <div className='relative pt-7  pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={netflixOriginals}/>
          <section className='md:space-y-24'>
            <Row title="Tranding Now" movies={trendingNow}/>
            <Row title="Top Rated" movies={topRated}/>
            <Row title="Action Thrillers" movies={actionMovies}/>
            {/* My List */}
            
            <Row title="Comedies" movies={comedyMovies}/>
            <Row title="Scary Movies" movies={horrorMovies}/>
            <Row title="Romance Movies" movies={romanceMovies}/>
            <Row title="Documentaries" movies={documentaries}/>
          </section>
      </div>
      {showModal && <Modal/>}
    </>
  )
}

export default MainContents