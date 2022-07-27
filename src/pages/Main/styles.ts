import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70rem;
  min-height: 100vh;
  padding: 1rem;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;

  h1 {
    color: #1f1f1f;
  }

  @media screen and (max-width: 900px) {
    h1 {
      font-size: 16pt
    }
    margin-bottom: 2rem;
  }
`

export const UpdateCatalog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 50rem;
  gap: 1rem;
`