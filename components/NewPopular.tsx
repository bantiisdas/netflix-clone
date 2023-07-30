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

  return (
    <>
      <div className='relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <section className='md:space-y-24'>
            <Row title="Now Playing" movies={nowPlaying}/>
            <Row title="Tranding Now" movies={trendingNow}/>
            <Row title="Popular" movies={popular}/>
            <Row title="Top Rated" movies={topRated}/>
            <Row title="Upcoming" movies={upcoming}/>
          </section>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default TvShows;
