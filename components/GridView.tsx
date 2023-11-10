import { Movie } from "@/typing";

import GridCard from "./GridCard";

interface Props {
  gridMovies: Movie[] | null;
  title: string;
}

const GridView = ({ gridMovies, title }: Props) => {
  // const gridMovies = useRecoilValue(gridMovieState);
  // console.log(gridMovies);

  //-------------
  //   const [movies, setMovies] = useState<Movie[]>([]);
  // const [page, setPage] = useState<number>(1);

  // const fetchMovies = async () => {
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=0af5fa8e782539fba3c0878860e6beb0&language=en-US&page=${page}`
  //   );
  //   const data = await response.json();

  //   if (page === 1) {
  //     setMovies(data.results);
  //   } else {
  //     setMovies((prevMovies) => [...prevMovies, ...data.results]);
  //   }
  // };

  // const loadMoreMovies = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // useEffect(() => {
  //   fetchMovies();
  // }, [page]);

  //-------------

  return (
    <>
      <div className="relative mt-16 pt-7 pr-2  cmd:pr-4 pl-4 pb-24 lg:px-8">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
        <div className="grid grid-cols-1 mobile:grid-cols-2 clg:grid-cols-3 cxl:grid-cols-4 c2xl:grid-cols-5 gap-2 cmd:gap-4">
          {gridMovies?.map((movie: Movie) => (
            <GridCard
              key={movie.id}
              showId={movie.id.toString()}
              showName={movie.name || movie.title}
              mediaType={movie.media_type || "movie"}
              backdropPath={movie.backdrop_path}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GridView;
