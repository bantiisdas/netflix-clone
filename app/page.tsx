

import { modalState } from '@/atoms/modalAtom';
import { Banner, Header, MainContents, Row } from '@/components'
import useAuth from '@/hooks/useAuth';
import { Movie } from '@/typing'
// import { fetchMovies } from '@/utils/requests';
import requests from '@/utils/requests'
import Image from 'next/image'
import { useRecoilValue } from 'recoil';


interface Props {
  netflixOriginals : Movie[];
  trendingNow : Movie[];
  topRated : Movie[];
  actionMovies : Movie[];
  comedyMovies : Movie[];
  horrorMovies : Movie[];
  romanceMovies : Movie[];
  documentaries : Movie[];
}

export default async function Home() {
  
  // const netflixOriginals = await fetchMovies();
  // console.log(netflixOriginals);
  
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  // const { loading } = useAuth();
  // if(loading) return "Loading";

  // const showModal = useRecoilValue(modalState)

  // console.log(netflixOriginals.results);

  return (
    <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Header/>
      <MainContents 
        netflixOriginals={netflixOriginals.results}
        actionMovies={actionMovies.results}
        comedyMovies={comedyMovies.results}
        documentaries={documentaries.results}
        horrorMovies={horrorMovies.results}
        romanceMovies={romanceMovies.results}
        topRated={topRated.results}
        trendingNow={trendingNow.results}
        />
    </main>
  )
}


// export const getServerSideProps = async () => {
//   const [
//     netflixOriginals,
//     trendingNow,
//     topRated,
//     actionMovies,
//     comedyMovies,
//     horrorMovies,
//     romanceMovies,
//     documentaries,
//   ] = await Promise.all([
//     fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
//     fetch(requests.fetchTrending).then((res) => res.json()),
//     fetch(requests.fetchTopRated).then((res) => res.json()),
//     fetch(requests.fetchActionMovies).then((res) => res.json()),
//     fetch(requests.fetchComedyMovies).then((res) => res.json()),
//     fetch(requests.fetchHorrorMovies).then((res) => res.json()),
//     fetch(requests.fetchRomanceMovies).then((res) => res.json()),
//     fetch(requests.fetchDocumentaries).then((res) => res.json()),
//   ])

//   return {
//     props: {
//       netflixOriginals: netflixOriginals.results,
//       trendingNow: trendingNow.results,
//       topRated: topRated.results,
//       actionMovies: actionMovies.results,
//       comedyMovies: comedyMovies.results,
//       horrorMovies: horrorMovies.results,
//       romanceMovies: romanceMovies.results,
//       documentaries: documentaries.results,
//     }
//   }
// }