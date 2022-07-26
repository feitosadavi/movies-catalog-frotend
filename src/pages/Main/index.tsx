import React from 'react';
import * as S from './styles'

function Main () {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Header>
          <h1>Filmes do Studio Ghibli</h1>
          <button>Atualizar catálogo</button>
        </S.Header>
      </S.Wrapper>
    </S.Container>
  );
}

export default Main;
