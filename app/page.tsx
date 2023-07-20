import { Banner, Header, Row } from '@/components'
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

  // const showModal = useRecoilValue()

  // console.log(netflixOriginals.results);

  return (
    <main className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Header/>
      <div className='relative pt-7  pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals.results}/>
        <section className='md:space-y-24'>
          <Row title="Tranding Now" movies={trendingNow.results}/>
          <Row title="Top Rated" movies={topRated.results}/>
          <Row title="Action Thrillers" movies={actionMovies.results}/>
          {/* My List */}
          
          <Row title="Comedies" movies={comedyMovies.results}/>
          <Row title="Scary Movies" movies={horrorMovies.results}/>
          <Row title="Romance Movies" movies={romanceMovies.results}/>
          <Row title="Documentaries" movies={documentaries.results}/>
        </section>
      </div>
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