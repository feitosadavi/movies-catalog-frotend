import { getMovies } from 'lib/api';
import React from 'react';
import { Movie } from 'types/';
import * as S from './styles'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Card } from 'components/';

function Main () {
  const PAGE_ITEMS = 10
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [updateCatalog, setUpdateCatalog] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getMovies({ limit: PAGE_ITEMS })
      .then((payload) => setMovies(payload))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleClick = () => setUpdateCatalog(!updateCatalog)

  if (loading) return <h1>Loading...</h1>
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
              <Card key={movie._id} movie={movie} />
            </ImageListItem>
          ))}
        </ImageList>
      </S.Wrapper>
    </S.Container>
  );
}

export default Main;
