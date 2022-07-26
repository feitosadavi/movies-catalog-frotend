import { Movie } from 'types/';

const API = process.env.API_URL ?? "http://localhost:3333/api";
const endpoint = (path: string): string => API + path;

const toGet = async (path: string): Promise<any> => {
  const res = await fetch(endpoint(path))
  if (res.status === 204) {
    return res.status
  } else {
    return res.json()
  }
};

const toPost = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

const toDelete = async (path: string): Promise<any> => {
  const res = await fetch(endpoint(path), {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.status
};


type GetMoviesInput = {
  limit?: number
  skip?: number
}
type GetMoviesOutput = {
  movies: Movie[]
  totalCount: number
}

const api = {
  getMovies: async ({ limit, skip }: GetMoviesInput): Promise<GetMoviesOutput> => {
    const movies = await toGet(`/movies?limit=${limit}&skip=${skip}`)
    return movies
  },

  deleteMovies: async (): Promise<void> => {
    await toDelete(`/movies/delete`)
  },

  updateCatalog: async (): Promise<void> => {
    await toPost('/movies', {})
  }
}

export default api
