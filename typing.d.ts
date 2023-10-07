export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  genres?: Genre[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  imdb_id?: string;
  last_air_date?: string;
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

export interface Requests {
  fetchTrending: string;
  fetchNetflixOriginals: string;
  fetchTopRated: string;
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchRomanceMovies: string;
  fetchDocumentaries: string;
  fetchSciFiMovies: string;
  fetchMysteryMovies: string;
  fetchWarMovies: string;
  fetchCrimeMovies: string;
  fetchAnimatedMovies: string;
  fetchSciFiFantTv: string;
  fetchActionTv: string;
  fetchDramaTv: string;
  fetchCrimeTv: string;
  fetchAnimatedTv: string;
  fetchMysteryTv: string;
  fetchComedyTv: string;
  fetchWarPoliticsTv: string;
  fetchNowPlaying: string;
  fetchPopular: string;
  fetchUpcoming: string;
}

export interface Credit {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  credit_id?: string;
  department?: string;
  job?: string[];
}

export interface OMDBMovie {
  Rated: string;
  Released: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: numberstring;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order?: 0;
}
