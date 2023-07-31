import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { gridMovieState, modalState } from "@/atoms/modalAtom";
import { GridCard, GridView, Row } from ".";
import { useState } from "react";

// interface Props {
//   movies: Movie[];
// }

interface Props {
    sciFiFantTv: Movie[];
    actionTv: Movie[];
    warPoliticsTv: Movie[];
    crimeTv: Movie[];
    animatedTv: Movie[];
    mysteryTv: Movie[];
    comedyTv: Movie[];
}

const TvShows = ({ 
    sciFiFantTv,
    actionTv,
    warPoliticsTv,
    crimeTv,
    animatedTv,
    mysteryTv,
    comedyTv }: Props) => {

    const showModal = useRecoilValue(modalState);
    const [hideRows, setHideRows] = useState(false);
    const gridMovies = useRecoilValue(gridMovieState);
    
    const rowClick = () => {
      setHideRows(true);
    }

  return (
    <>
      <div className='relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <section className={`${hideRows && "hidden"} md:space-y-24`}>
            <Row title="Sci-Fi Fantasy" movies={sciFiFantTv} rowClick={rowClick}/>
            <Row title="Action" movies={actionTv} rowClick={rowClick}/>
            <Row title="War & Politics" movies={warPoliticsTv} rowClick={rowClick}/>
            <Row title="Crime" movies={crimeTv} rowClick={rowClick}/>
            <Row title="Animated" movies={animatedTv} rowClick={rowClick}/>
            <Row title="Mystery" movies={mysteryTv} rowClick={rowClick}/>
            <Row title="Comedy" movies={comedyTv} rowClick={rowClick}/>
          </section>
          <GridView gridMovies={gridMovies}/>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default TvShows;
