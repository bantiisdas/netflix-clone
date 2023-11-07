import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
import {
  CheckIcon,
  HandThumbUpIcon,
  PlayIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

interface Props {
  showId: string;
  mediaType: string;
  // showTrailer: boolean;
}

const VideoPlayer = ({ showId, mediaType }: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  // const [showModal, setShowModal] = useState(showTrailer);
  const [trailer, setTrailer] = useState("");

  // const handleClose = () => {
  //   setShowModal(false);
  // };
  const handleClose = () => setOpen(false);

  async function fetchMovie() {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${showId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .catch((err) => console.log(err.message));

    console.log(data.videos.results);

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element: Element) => element.type === "Trailer"
      );

      setTrailer(data.videos?.results[index]?.key);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [showId, mediaType]);

  return (
    // <MuiModal
    //   open={showModal}
    //   onClose={handleClose}
    //   className="fixed !top-[20vh] xs:!top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    // >
    //   <>
    //     <button
    //       onClick={handleClose}
    //       className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
    //     >
    //       <XMarkIcon className="h-6 w-6" />
    //     </button>
    //     <div className="relative pt-[56.25%]">
    //       <ReactPlayer
    //         url={`https://www.youtube.com/watch?v=${trailer}`}
    //         width="100%"
    //         height="100%"
    //         style={{ position: "absolute", top: "0", left: "0" }}
    //         playing
    //         controls
    //         muted={false}
    //       />
    //       <div
    //         className={`hidden absolute bottom-10  w-full justify-end items-center xs:justify-between px-10`}
    //       >
    //         <div className="hidden xs:flex space-x-2">
    //           <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
    //             <FaPlay className="xs:h-7 xs:w-7 text-black" />
    //             Play
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // </MuiModal>

    <div>
      <div className="flex flex-row gap-2" onClick={handleOpen}>
        <PlayIcon className="h-6 w-6 text-white" />
        <span className="text-white">Play Trailer</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed !top-[20vh] xs:!top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              controls
              muted={false}
            />
          </div>
        </>
      </Modal>
    </div>
  );
};

export default VideoPlayer;
