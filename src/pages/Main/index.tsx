/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import api from 'lib/api';
import { Movie } from 'types/';
import * as S from './styles'
import { Card } from 'components/';

const getCurrentPageFromUrl = (): number | null => {
  const urlParams = new URLSearchParams(window.location.search)
  const pageFromUrl = urlParams.get('page')
  return pageFromUrl ? Number(pageFromUrl) : null
}

const changeUrl = (page?: number): void => {
  const url = new URL(window.location as any)
  url.searchParams.set('page', String(page))
  window.history.pushState(null, '', url.toString())
}

function Main () {
  const ITENS_PER_PAGE = 10
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [numberOfMovies, setNumberOfMovies] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(getCurrentPageFromUrl() ?? 1)
  const [loading, setLoading] = React.useState<boolean>(false)

  const fetchGetMovies = async () => {
    try {
      const skip = page === 1 ? 0 : (page * ITENS_PER_PAGE) - ITENS_PER_PAGE
      const { movies, totalCount } = await api.getMovies({ limit: ITENS_PER_PAGE, skip })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setMovies(movies)
      setNumberOfMovies(totalCount)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    setLoading(true)
    fetchGetMovies()
      .finally(() => setTimeout(() => setLoading(false), 750))
  }, [page])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    changeUrl(value)
  }
  const handleClick = () => {
    setLoading(true)
    api.deleteMovies()
      .then(res => setMovies([]))
      .catch(console.error)
      .finally(() => setLoading(false))
  }
  const handleUpdateCatalog = () => {
    setLoading(true)
    api.updateCatalog()
      .then(res => fetchGetMovies())
      .catch(console.error)
      .finally(() => setTimeout(() => setLoading(false), 750))
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.Header>
          <h1>Studio Ghibli - Catálogo</h1>
          <button onClick={handleClick}>Limpar catálogo</button>
        </S.Header>
        {movies.length > 0
          ?
          <ImageList variant="masonry" cols={3} gap={10}>
            {movies.map((movie) => (
              <ImageListItem key={movie._id}>
                <Card movie={movie} loading={loading} />
              </ImageListItem>
            ))}
          </ImageList>
          :
          <S.UpdateCatalog>
            <span>Parece que não há filmes no catálogo :(</span>
            <button onClick={handleUpdateCatalog}>Atualizar catálogo</button>
          </S.UpdateCatalog>
        }
      </S.Wrapper>

      <Pagination
        sx={{ marginTop: '5rem' }}
        count={Math.ceil(numberOfMovies / ITENS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </S.Container>
  );
}

export default Main;
