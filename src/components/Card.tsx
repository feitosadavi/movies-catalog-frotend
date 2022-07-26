import React from 'react'

import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Movie } from 'types/'

interface Props {
  movie: Movie
}

const Card: React.FC<Props> = ({ movie: {
  _id,
  title,
  description,
  banner,
  producer,
  director
} }) => {
  return (
    <MUICard sx={{ maxWidth: 345, marginBottom: '1rem' }}>
      <CardMedia
        component="img"
        height="140"
        image={banner}
        alt="movie banner"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <span>
          Producer: {producer}
        </span>
        <span>
          Director: {director}
        </span>
      </CardContent>
    </MUICard>
  )
}

export default Card