import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";

interface Props {
  movies: Movie[];
}

const Movies = ({ movies }: Props) => {

    const showModal = useRecoilValue(modalState);

  return (
    <>
      <div className="relative  mt-20 pt-7 pr-4 pl-4 pb-24 lg:space-y-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {movies.map((movie: Movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default Movies;
