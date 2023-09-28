import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { gridMovieState, modalState } from "@/atoms/modalAtom";
import { Row } from ".";
import { useState } from "react";

// interface Props {
//   movies: Movie[];
// }

interface Props {
  trendingTv: Movie[];
  sciFiFantTv: Movie[];
  actionTv: Movie[];
  warPoliticsTv: Movie[];
  crimeTv: Movie[];
  animatedTv: Movie[];
  mysteryTv: Movie[];
  comedyTv: Movie[];
}

const TvShows = ({
  trendingTv,
  sciFiFantTv,
  actionTv,
  warPoliticsTv,
  crimeTv,
  animatedTv,
  mysteryTv,
  comedyTv,
}: Props) => {
  const showModal = useRecoilValue(modalState);
  // const [hideRows, setHideRows] = useState(false);
  // const gridMovies = useRecoilValue(gridMovieState);

  return (
    <>
      <div className="relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <section className={`md:space-y-24`}>
          <Row title="Trending Now" movies={trendingTv} search="trendingTv" />
          <Row
            title="Sci-Fi Fantasy"
            movies={sciFiFantTv}
            search="sciFiFantTv"
          />
          <Row title="Action" movies={actionTv} search="actionTv" />
          <Row
            title="War & Politics"
            movies={warPoliticsTv}
            search="warPoliticsTv"
          />
          <Row title="Crime" movies={crimeTv} search="crimeTv" />
          <Row title="Animated" movies={animatedTv} search="animatedTv" />
          <Row title="Mystery" movies={mysteryTv} search="mysteryTv" />
          <Row title="Comedy" movies={comedyTv} search="comedyTv" />
        </section>
        {/* <GridView gridMovies={gridMovies}/> */}
      </div>

      {showModal && <Modal />}
    </>
  );
};

export default TvShows;
