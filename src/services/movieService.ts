import axios from 'axios';
import type { Movie } from '../types/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;
interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
const fetchMovies = async (name: string): Promise<Movie[]> => {
  const response = await axios.get<SearchResponse>('https://api.themoviedb.org/3/search/movie', {
    params: {
      query: name,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data.results;
};
export default fetchMovies;

// export default async function fetchMovies (name: string) {
//     const response = await axios.get<SearchResponse>('https://api.themoviedb.org/3/search/movie', {
//         params: {
//            query: name,
//         },
//         headers: {
//           Authorization: `Bearer ${myKey}`,
//         },
//     });
//     return response.data.results;
// };