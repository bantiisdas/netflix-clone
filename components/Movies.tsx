import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { gridMovieState, modalState } from "@/atoms/modalAtom";
import { GridCard, GridView, Row } from ".";
import { useState } from "react";

// interface Props {
//   movies: Movie[];
// }

interface Props {
  topRated : Movie[];
  actionMovies : Movie[];
  comedyMovies : Movie[];
  horrorMovies : Movie[];
  romanceMovies : Movie[];
  documentaries : Movie[];
  sciFiMovies : Movie[];
  mysteryMovies : Movie[];
  warMovies : Movie[];
  crimeMovies : Movie[];
  animatedMovies : Movie[];
}

const Movies = ({ 
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  sciFiMovies,
  mysteryMovies,
  warMovies,
  crimeMovies,
  animatedMovies, }: Props) => {

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
            <Row title="Sci-Fi Movies" movies={sciFiMovies} rowClick={rowClick}/>
            <Row title="Mystery Movies" movies={mysteryMovies} rowClick={rowClick}/>
            <Row title="War Movies" movies={warMovies} rowClick={rowClick}/>
            <Row title="Crime" movies={crimeMovies} rowClick={rowClick}/>
            <Row title="Animated" movies={animatedMovies} rowClick={rowClick}/>
            
            {/* <Row title="Top Rated" movies={topRated}/>
            <Row title="Action Thrillers" movies={actionMovies}/>
            <Row title="Comedies" movies={comedyMovies}/>
            <Row title="Scary Movies" movies={horrorMovies}/>
            <Row title="Romance Movies" movies={romanceMovies}/>
            <Row title="Documentaries" movies={documentaries}/> */}
          </section>
          <GridView gridMovies={gridMovies}/>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default Movies;
