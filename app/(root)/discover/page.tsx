import Image from "next/image";

import MovieDetails from "@/components/MovieDetails";
import CastCard from "@/components/CastCards";
import Row from "@/components/Row";
import Header from "@/components/Header";
import {
  fetchCasts,
  fetchCredits,
  fetchRecommendations,
  fetchSingleShowDetails,
} from "@/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import {
  isShowLikedByUser,
  isShowSavedForLaterByUser,
  isShowWatchedByUser,
} from "@/lib/actions/list.actions";
import { log } from "console";

interface SearchProps {
  searchParams: {
    movie: string;
    tv: string;
    person: string;
  };
}

export default async function page({ searchParams }: SearchProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const query =
    searchParams.movie?.split("-")[0] ||
    searchParams.tv?.split("-")[0] ||
    searchParams.person?.split("-")[0];

  const contentType = searchParams.movie
    ? "movie"
    : searchParams.tv
    ? "tv"
    : "person";

  const showDetails = await fetchSingleShowDetails(contentType, query);

  const credits = await fetchCredits(contentType, query);

  const casts = await fetchCasts(contentType, query);

  const recommendations = await fetchRecommendations(contentType, query);

  // console.log(isLiked);

  return (
    <main className="relative ">
      <Header />
      {/* <SingleShow bannerItem={searchResults}/> */}

      <div className="relative w-screen sm:h-[88vh] mt-[72px]">
        <div className="absolute h-[30vh] sm:h-full -z-10 w-full opacity-95 sm:opacity-20 ">
          <Image
            src={`https://image.tmdb.org/t/p/original${showDetails?.backdrop_path}`} // Provide the URL for the backdrop image
            alt={showDetails?.name || showDetails?.title || "Backdrop"} // Set the alt text for accessibility
            fill
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Details */}

        <MovieDetails
          show={showDetails}
          credits={credits}
          imdbId={showDetails.imdb_id}
          showId={query}
          contentType={contentType}
          userId={mongoUser._id}
        />
      </div>
      <div className="relative pt-5 md:pt-7 mt-5 md:mt-8 pl-4 pb-5 lg:pl-16">
        <CastCard casts={casts} title="Cast" />
      </div>
      <div className="relative pt-5 md:pt-7 mt-3 md:mt-7 pl-4 pb-5 md:pb-24 lg:pl-16">
        <Row
          movies={recommendations}
          title="People Also Liked"
          seeMoreBtn={false}
        />
      </div>

      {/* <p>{isLiked ? "Liked" : "Not Liked"}</p>
      <p>{isWatched ? "Watched" : "Not Watched"}</p>
      <p>{isSavedForLater ? "Saved For Later" : "Not Saved For Later"}</p> */}
    </main>
  );
}
