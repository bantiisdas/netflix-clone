const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface Requests {
  [key: string]: string[];
}

const requests: Requests = {
  //For Movies
  fetchTrendingNow: [
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`,
    "Trending Now",
  ],
  fetchNetflixOriginals: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
    "Netflix Originals",
  ],
  fetchTopRated: [
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    "Top Rated",
  ],

  fetchTrendingMovies: [
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    "Trending Now Movie",
  ],
  fetchActionMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    "Action Thrillers",
  ],
  fetchComedyMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    "Comedies",
  ],
  fetchHorrorMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    "Scary Movies",
  ],
  fetchRomanceMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    "Romance Movies",
  ],
  fetchDocumentaries: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
    "Documentaries",
  ],

  fetchSciFiMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
    "Sci-Fi Movies",
  ],
  fetchMysteryMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=9648`,
    "Mystery Movies",
  ],
  fetchWarMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`,
    "War Movies",
  ],
  fetchCrimeMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=80`,
    "Crime",
  ],
  fetchAnimatedMovies: [
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
    "Animated",
  ],

  //For TV Series
  fetchTrendingTv: [
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    "Trending Now Tv",
  ],
  fetchSciFiFantTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
    "Sci-Fi Fantasy",
  ],
  fetchActionTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
    "Action",
  ],
  fetchDramaTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=18`,
    "Drama",
  ],
  fetchCrimeTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=80`,
    "Crime",
  ],
  fetchAnimatedTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16`,
    "Animated",
  ],
  fetchMysteryTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
    "Mystery",
  ],
  fetchComedyTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
    "Comedy",
  ],
  fetchWarPoliticsTv: [
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10768`,
    "War & Politics",
  ],

  //New & Popular
  fetchNowPlaying: [
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    "Now Playing",
  ],
  fetchPopular: [
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
    "Popular",
  ],
  fetchUpcoming: [
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    "Upcoming",
  ],
};

export default requests;

// export async function fetchMovies() {

//   const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=0af5fa8e782539fba3c0878860e6beb0&language=en-US`);

//   const result = await response.json();

//   return result.results;
// }
