import { getMovies } from 'lib/api';
import React from 'react';
import { Movie } from 'types/';
import * as S from './styles'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Main () {
  const PAGE_ITEMS = 10
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [updateCatalog, setUpdateCatalog] = React.useState<boolean>(false)

  React.useEffect(() => {
    getMovies({ limit: PAGE_ITEMS })
      .then((payload) => setMovies(payload))
      .catch(console.error)
  }, [])

  const handleClick = () => setUpdateCatalog(!updateCatalog)

  return (
    <S.Container>
      <S.Wrapper>
        <S.Header>
          <h1>Filmes do Studio Ghibli</h1>
          <button onClick={handleClick}>Atualizar catálogo</button>
        </S.Header>
        <ImageList variant="masonry" cols={3} gap={10}>
          {movies.map((movie) => (
            <ImageListItem key={movie._id}>
              <Card sx={{ maxWidth: 345, marginBottom: '1rem' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={movie.banner}
                  alt="movie banner"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  <span>
                    Producer: {movie.producer}
                  </span>
                  <span>
                    Director: {movie.director}
                  </span>
                </CardContent>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </S.Wrapper>
    </S.Container>
  );
}

export default Main;
