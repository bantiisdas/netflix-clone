import { Movie } from "@/typing";
import Thumbnail from "./Thumbnail";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { GridCard } from ".";

interface Props {
  movies: Movie[];
}

const Movies = ({ movies }: Props) => {

    const showModal = useRecoilValue(modalState);

  return (
    <>
      <div className="relative mt-20 pt-7 pr-6 mobile:pr-20 cmd:pr-4 pl-4 pb-24 lg:space-y-24 lg:px-8">
      <div className="grid grid-cols-1 cmd:grid-cols-2 clg:grid-cols-3 cxl:grid-cols-4 c2xl:grid-cols-5 gap-4">
          {movies.map((movie: Movie) => (
            <GridCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      
      {showModal && <Modal/>}
    </>
  );
};

export default Movies;
