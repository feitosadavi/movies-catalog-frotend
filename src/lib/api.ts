import { Movie } from 'types/';

const API = "http://localhost:3333/api";
const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  const res = await fetch(endpoint(path))
  const json = await res.json()
  return json
};

const post = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};


type GetMoviesInput = {
  limit?: number
  skip?: number
}
export const getMovies = async ({ limit, skip }: GetMoviesInput): Promise<Movie[]> => {
  const movies = await get(`/get-movies?limit=${limit}&skip${skip}`)
  console.log(movies)
  return movies
}
