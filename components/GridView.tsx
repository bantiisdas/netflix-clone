import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { gridMovieState, modalState } from "@/atoms/modalAtom";
import { GridCard } from ".";
import { useEffect, useState } from "react";

interface Props {
    gridMovies: Movie[] | null;
}

const GridView = ({gridMovies}: Props) => {

    const showModal = useRecoilValue(modalState);
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
      <div className="relative mt-20 pt-7 pr-6 mobile:pr-20 cmd:pr-4 pl-4 pb-24 lg:space-y-24 lg:px-8">
      <div className="grid grid-cols-1 cmd:grid-cols-2 clg:grid-cols-3 cxl:grid-cols-4 c2xl:grid-cols-5 gap-4">
          {gridMovies?.map((movie: Movie) => (
            <GridCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default GridView;
