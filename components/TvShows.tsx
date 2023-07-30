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

  return (
    <>
      <div className='relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <section className='md:space-y-24'>
            <Row title="Sci-Fi Fantasy" movies={sciFiFantTv}/>
            <Row title="Action" movies={actionTv}/>
            <Row title="War & Politics" movies={warPoliticsTv}/>
            <Row title="Crime" movies={crimeTv}/>
            <Row title="Animated" movies={animatedTv}/>
            <Row title="Mystery" movies={mysteryTv}/>
            <Row title="Comedy" movies={comedyTv}/>
          </section>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default TvShows;
