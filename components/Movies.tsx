import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { GridCard, Row } from ".";

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

  return (
    <>
      <div className='relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <section className='md:space-y-24'>
            <Row title="Sci-Fi Movies" movies={sciFiMovies}/>
            <Row title="Mystery Movies" movies={mysteryMovies}/>
            <Row title="War Movies" movies={warMovies}/>
            <Row title="Crime" movies={crimeMovies}/>
            <Row title="Animated" movies={animatedMovies}/>
            
            {/* <Row title="Top Rated" movies={topRated}/>
            <Row title="Action Thrillers" movies={actionMovies}/>
            <Row title="Comedies" movies={comedyMovies}/>
            <Row title="Scary Movies" movies={horrorMovies}/>
            <Row title="Romance Movies" movies={romanceMovies}/>
            <Row title="Documentaries" movies={documentaries}/> */}
          </section>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default Movies;