import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { getMovies } from 'lib/api';
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
  const [updateCatalog, setUpdateCatalog] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    console.log(page === 1 ? 0 : page * ITENS_PER_PAGE)
    getMovies({ limit: ITENS_PER_PAGE, skip: page === 1 ? 0 : (page * ITENS_PER_PAGE) - ITENS_PER_PAGE })
      .then(({ movies, totalCount }) => {
        setMovies(movies)
        setNumberOfMovies(totalCount)
      })
      .catch(console.error)
      .finally(() => setTimeout(() => setLoading(false), 800))
  }, [page])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    changeUrl(value)
  } 
  const handleClick = () => setUpdateCatalog(!updateCatalog)

  return (
    <S.Container>
      <S.Wrapper>
        <S.Header>
          <h1>Studio Ghibli - Catálogo</h1>
          <button onClick={handleClick}>Atualizar catálogo</button>
        </S.Header>
        <ImageList variant="masonry" cols={3} gap={10}>
          {movies.map((movie) => (
            <ImageListItem key={movie._id}>
              <Card movie={movie} loading={loading} />
            </ImageListItem>
          ))
          }
        </ImageList>
      </S.Wrapper>
      <Pagination
        sx={{ padding: '1rem' }}
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
