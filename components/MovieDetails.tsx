"use client";
import { useEffect, useState } from "react";
import { formatDate, formatDuration } from "@/constants/functions";
import { Credit, Movie } from "@/typing";
import CircularRating from "./CircularRating";
import {
  ListBulletIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import Modal from "./Modal";
import { useSearchParams } from "next/navigation";
import { useColor } from "color-thief-react";
import {
  isShowLikedByUser,
  isShowSavedForLaterByUser,
  isShowWatchedByUser,
  removeFromLikedList,
  removeFromWatchLaterList,
  removeFromWatchedList,
  updateToLikedList,
  updateToWatchLaterList,
  updateToWatchedList,
} from "@/lib/actions/list.actions";
import {
  CheckIcon,
  PaperAirplaneIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

interface Props {
  show: Movie | null;
  credits: Credit[];
  imdbId: string;
  showId: string;
  contentType: string;
  userId: string;
  isLiked?: boolean;
  isWatched?: boolean;
  isSavedForLater?: boolean;
}

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

const MovieDetails = ({
  show,
  credits,
  imdbId,
  showId,
  contentType,
  userId,
}: Props) => {
  const [omdbData, setOmdbData] = useState<any>();
  // const [showModal, setShowModal] = useRecoilState(modalState);
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const searchParams = useSearchParams();
  const [liked, setLiked] = useState<boolean>();
  const [watched, setWatched] = useState<boolean>();
  const [savedForLater, setSavedForLater] = useState<boolean>();

  const playBtnClick = () => {
    // setCurrentMovie(show);
    // setShowModal(true);
  };

  const fetchSavedTOList = async () => {
    const isLikedByUser = await isShowLikedByUser({
      userId: userId,
      showId: showId,
      type: contentType,
    });
    setLiked(isLikedByUser);

    const isWatchedByUser = await isShowWatchedByUser({
      userId: userId,
      showId: showId,
      type: contentType,
    });
    setWatched(isWatchedByUser);

    const isSavedLaterByUser = await isShowSavedForLaterByUser({
      userId: userId,
      showId: showId,
      type: contentType,
    });
    setSavedForLater(isSavedLaterByUser);
  };

  const likeBtnClick = async () => {
    if (liked) {
      const removed = await removeFromLikedList({
        userId: userId,
        showId: showId,
        type: contentType,
      });
      if (removed) setLiked(false);
    } else {
      const added = await updateToLikedList({
        ownerId: userId,
        showDetails: {
          showId: show?.id.toString() || "",
          type: show?.media_type || "movie",
          name: show?.name || show?.title || show?.original_name || "",
          posterPath: show?.poster_path || "",
          backdropPath: show?.backdrop_path || "",
        },
      });
      if (added) setLiked(true);
    }
  };
  const watchedBtnClick = async () => {
    if (watched) {
      const removed = await removeFromWatchedList({
        userId: userId,
        showId: showId,
        type: contentType,
      });
      if (removed) setWatched(false);
    } else {
      const added = await updateToWatchedList({
        ownerId: userId,
        showDetails: {
          showId: show?.id.toString() || "",
          type: show?.media_type || "movie",
          name: show?.name || show?.title || show?.original_name || "",
          posterPath: show?.poster_path || "",
          backdropPath: show?.backdrop_path || "",
        },
      });
      if (added) setWatched(true);
    }
  };

  const watchLaterBtnClick = async () => {
    if (savedForLater) {
      const removed = await removeFromWatchLaterList({
        userId: userId,
        showId: showId,
        type: contentType,
      });
      if (removed) setSavedForLater(false);
    } else {
      const added = await updateToWatchLaterList({
        ownerId: userId,
        showDetails: {
          showId: show?.id.toString() || "",
          type: show?.media_type || "movie",
          name: show?.name || show?.title || show?.original_name || "",
          posterPath: show?.poster_path || "",
          backdropPath: show?.backdrop_path || "",
        },
      });
      if (added) setSavedForLater(true);
    }
  };

  const showYear = () => {
    let showYearstring = `123`;

    if (contentType === "movie") {
      showYearstring = `(${show?.release_date?.split("-")[0]})`;
    } else if (contentType === "tv") {
      if (
        show?.first_air_date?.split("-")[0] ===
          show?.last_air_date?.split("-")[0] ||
        !show?.last_air_date
      ) {
        showYearstring = `(${show?.first_air_date?.split("-")[0]})`;
      } else {
        showYearstring = `(${show?.first_air_date?.split("-")[0]}-${
          show?.last_air_date?.split("-")[0]
        })`;
      }
    }
    return showYearstring;
  };

  const fetchContentRating = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?${contentType === "tv" ? "t" : "i"}=${
        contentType === "tv"
          ? show?.name || show?.title || show?.original_name
          : imdbId
      }&apikey=${OMDB_API_KEY}`
    );

    const data = await response.json();

    // console.log(data);

    setOmdbData(data);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const copyUrl = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement("input");
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select the URL text and copy it to the clipboard
    tempInput.select();
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, you can provide feedback to the user
    alert("Current URL copied to clipboard");
  };

  useEffect(() => {
    // console.log(contentType);

    fetchContentRating();
    fetchSavedTOList();

    window.addEventListener("resize", handleResize);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, [imdbId, contentType, show, showId]);

  const { data, loading, error } = useColor(
    `https://image.tmdb.org/t/p/w500${show?.poster_path}`,
    "hex",
    { quality: 40, crossOrigin: "anonymous" }
  );
  // console.log("Color=" + data + "-" + typeof data);

  return (
    <>
      <div
        style={{
          backgroundColor: `${screenWidth > 640 ? data + "66" : "transparent"}`,
        }}
        className="relative w-screen sm:w-full h-full flex flex-col sm:flex-row justify-start sm:justify-between items-center "
      >
        {/* Movie Poster (on the left) */}
        <div className="w-full sm:w-1/3 h-[30vh] sm:h-full py-5 sm:py-10 pl-5 sm:pl-0 flex items-center justify-start sm:justify-center">
          <img
            src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} // Provide the URL for the movie poster
            alt="Movie" // Set the alt text for accessibility
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
        <div
          style={{
            backgroundColor: `${screenWidth <= 640 ? data : "transparent"}`,
          }}
          className={`bg-opacity-0 w-screen sm:w-2/3 text-white p-4 flex flex-col items-start justify-start gap-3`}
        >
          <div className="w-full">
            <h1 className="inline-block mt-3 items-center justify-center sm:justify-start text-xl sm:text-4xl font-bold mb-1">
              {show?.name || show?.title || show?.original_name}&nbsp;
              <p className="inline-block text-gray-200 text-base sm:text-2xl font-normal">
                {showYear()}
              </p>
            </h1>
            <div className="hidden sm:flex items-center gap-2">
              {omdbData?.Rated !== "NA" && omdbData?.Rated !== "Not Rated" && (
                <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-400">
                  {omdbData?.Rated}
                </span>
              )}
              <span>
                {formatDate(
                  contentType === "movie"
                    ? show?.release_date
                    : show?.first_air_date
                )}
                &nbsp;&#x2022;
              </span>
              <span>{show?.genres?.map((genre) => genre.name).join(", ")}</span>
              {show?.runtime && (
                <span>&#x2022;&nbsp;{formatDuration(show?.runtime)}</span>
              )}
            </div>
          </div>

          <div className="w-full mt-1 sm:mt-4 mb-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="w-full sm:w-auto flex flex-row items-center justify-between px-4 sm:px-0">
              <div className="flex flex-row gap-0 sm:gap-2 items-center">
                <CircularRating
                  percent={
                    omdbData?.imdbRating !== "N/A"
                      ? omdbData?.imdbRating
                      : show?.vote_average
                  }
                />
                <div className="flex flex-row sm:flex-col font-semibold gap-1 sm:gap-0">
                  <span>IMDb</span>
                  <span>Rating</span>
                </div>
              </div>

              <div className="flex sm:hidden h-7 bg-gray-500 w-[1px]" />

              <div
                className="flex sm:hidden flex-row gap-2 cursor-pointer"
                onClick={playBtnClick}
              >
                <PlayIcon className="h-6 w-6 text-white" />
                Play Trailer
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-center sm:gap-6 px-12 sm:px-0">
              <div
                className={`movieDetailsIconsParent ${
                  savedForLater ? "text-red-500" : "text-white"
                }`}
              >
                <PlusIcon
                  className="movieDetailsIcons"
                  onClick={watchLaterBtnClick}
                />
              </div>

              <div
                className={`movieDetailsIconsParent ${
                  liked ? "text-red-500" : "text-white"
                }`}
                onClick={likeBtnClick}
              >
                <HeartIcon className="movieDetailsIcons" />
              </div>

              <div
                className={`movieDetailsIconsParent ${
                  watched ? "text-red-500" : "text-white"
                }`}
              >
                <CheckIcon
                  className="movieDetailsIcons"
                  onClick={watchedBtnClick}
                />
              </div>

              <div className="movieDetailsIconsParent">
                <PaperAirplaneIcon
                  className="movieDetailsIcons"
                  onClick={copyUrl}
                />
              </div>

              <div
                className="hidden sm:flex flex-row gap-2 cursor-pointer"
                onClick={playBtnClick}
              >
                <PlayIcon className="h-6 w-6 text-white" />
                Play Trailer
              </div>
            </div>
          </div>

          {/* Info div */}
          <div className="bg-[#333333] bg-opacity-10  flex -mx-4 sm:hidden flex-col py-3 w-screen items-center justify-center gap-1 text-sm font-normal">
            <div className="flex flex-row">
              <span className="flex items-center justify-center rounded border border-gray-400 p-[1px] text-xs text-gray-300">
                {omdbData?.Rated}
              </span>
              &nbsp;
              <span>
                {formatDate(
                  contentType === "movie"
                    ? show?.release_date
                    : show?.first_air_date
                )}
              </span>
              &nbsp;
              {show?.runtime && (
                <span>&#x2022;&nbsp;{formatDuration(show?.runtime)}</span>
              )}
            </div>
            <span>{show?.genres?.map((genre) => genre.name).join(", ")}</span>
          </div>

          <div className="px-2 sm:px-0 mt-3 sm:mt-0">
            <h2 className="text-lg sm:text-xl font-bold pb-1 sm:pb-2">
              Overview
            </h2>
            <p className="text-sm mb-4">{show?.overview}</p>
          </div>

          <div className="flex flex-row flex-wrap px-2 sm:px-0 w-full">
            {contentType === "movie"
              ? credits.map((person) => (
                  <div className="w-1/2 pr-2 py-2">
                    <h4 className="font-medium text-sm">{person.name}</h4>
                    <p className="font-light text-sm">
                      {person?.job?.map((job) => job).join(", ")}
                    </p>
                  </div>
                ))
              : omdbData?.Writer?.split(", ").map((person: any) => (
                  <div className="w-1/2 pr-2 py-2">
                    <h4 className="font-medium text-sm">{person}</h4>
                    <p className="font-light text-sm">Creator</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/* {showModal && <Modal />} */}
    </>
  );
};

export default MovieDetails;
