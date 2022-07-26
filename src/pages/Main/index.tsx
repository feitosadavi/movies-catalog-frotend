import { getMovies } from 'lib/api';
import React from 'react';
import { Movie } from 'types/';
import * as S from './styles'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Card } from 'components/';

function Main () {
  const ITENS_PER_PAGE = 10
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [updateCatalog, setUpdateCatalog] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getMovies({ limit: ITENS_PER_PAGE })
      .then((payload) => setMovies(payload))
      .catch(console.error)
      .finally(() => setTimeout(() => setLoading(false), 800))
  }, [])

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
    </S.Container>
  );
}

export default Main;
