import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";

import Row from "./Row";
import { Modal } from "@mui/material";

// interface Props {
//   movies: Movie[];
// }

interface Props {
  trendingMovies: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  sciFiMovies: Movie[];
  mysteryMovies: Movie[];
  warMovies: Movie[];
  crimeMovies: Movie[];
  animatedMovies: Movie[];
}

const Movies = ({
  trendingMovies,
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
  animatedMovies,
}: Props) => {
  // const showModal = useRecoilValue(modalState);
  // const [hideRows, setHideRows] = useState(false);
  // const gridMovies = useRecoilValue(gridMovieState);

  return (
    <>
      <div className="relative pt-7 mt-20 pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <section className={`md:space-y-24`}>
          <Row
            title="Trending Now"
            movies={trendingMovies}
            search="trendingMovies"
          />
          <Row
            title="Sci-Fi Movies"
            movies={sciFiMovies}
            search="sciFiMovies"
          />
          <Row
            title="Mystery Movies"
            movies={mysteryMovies}
            search="mysteryMovies"
          />
          <Row title="War Movies" movies={warMovies} search="warMovies" />
          <Row title="Crime" movies={crimeMovies} search="crimeMovies" />
          <Row
            title="Animated"
            movies={animatedMovies}
            search="animatedMovies"
          />

          {/* <Row title="Top Rated" movies={topRated}/>
            <Row title="Action Thrillers" movies={actionMovies}/>
            <Row title="Comedies" movies={comedyMovies}/>
            <Row title="Scary Movies" movies={horrorMovies}/>
            <Row title="Romance Movies" movies={romanceMovies}/>
            <Row title="Documentaries" movies={documentaries}/> */}
        </section>
        {/* <GridView gridMovies={gridMovies}/> */}
      </div>

      {/* {showModal && <Modal />} */}
    </>
  );
};

export default Movies;
