import { list } from "postcss";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchSingleShowDetails(
  contentType: string,
  query: string
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${query}?language=en-US&api_key=${API_KEY}`
  );

  const data = await response.json();
  if (!data.media_type) {
    data.media_type = contentType;
  }
  return data;
}

export async function fetchCredits(contentType: string, query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${query}/credits?language=en-US&api_key=${API_KEY}`
  );

  const data = await response.json();
  //return data;
  if (contentType === "movie") {
    const jobTitlesToFilter = [
      "Screenplay",
      "Story",
      "Director",
      "Characters",
      "Creator",
    ];

    const mergedArray = data.crew
      .filter(({ job }) => jobTitlesToFilter.includes(job))
      .reduce((mergedData, { id, name, job }) => {
        const existingEntry = mergedData.find((entry) => entry.id === id);

        if (existingEntry) {
          existingEntry.job.push(job);
        } else {
          mergedData.push({ id, name, job: [job] });
        }

        return mergedData;
      }, []);

    return mergedArray;
  }
}

export async function fetchCasts(contentType: string, query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${query}/credits?language=en-US&api_key=${API_KEY}`
  );

  const data = await response.json();
  return data.cast;
}

export async function fetchRecommendations(contentType: string, query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${query}/recommendations?language=en-US&api_key=${API_KEY}`
  );
  const data = await response.json();

  if (data.results?.length === 0) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${contentType}/${query}/similar?language=en-US&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  }

  return data.results;
}
export function getListType(type: string) {
  const listType =
    type === "watched"
      ? "Watched"
      : type === "watchLater"
      ? "Saved for later"
      : type;
  return listType;
}
