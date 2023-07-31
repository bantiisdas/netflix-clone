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
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
    trendingNow: Movie[];
}

const TvShows = ({ 
    nowPlaying,
    popular,
    topRated,
    upcoming ,
    trendingNow }: Props) => {

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
            <Row title="Now Playing" movies={nowPlaying} rowClick={rowClick}/>
            <Row title="Tranding Now" movies={trendingNow} rowClick={rowClick}/>
            <Row title="Popular" movies={popular} rowClick={rowClick}/>
            <Row title="Top Rated" movies={topRated} rowClick={rowClick}/>
            <Row title="Upcoming" movies={upcoming} rowClick={rowClick}/>
          </section>
          <GridView gridMovies={gridMovies}/>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default TvShows;
