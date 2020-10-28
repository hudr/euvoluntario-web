import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import signInBackgroundImg from '../../assets/sign-in-background.jpg'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  img {
    width: 300px;
  }
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;


  img {
    height: 80px;
    transform: rotate(45deg);
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    font-size: 20px;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    svg {
      margin-right: 16px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`

export const Card = styled.div`

  display: flex;
  flex-direction: column;
  background: rgb(41, 41, 46);
  border-width: 2px;
  border-style: solid;
  border-color: rgb(41, 41, 46);
  border-image: initial;
  border-radius: 5px;
  padding: 24px;
  transition: border 0.2s ease 0s;
  
  align-items: center;
  justify-content: center;

  margin: 8px;

  h3 {
    font-size: 40px;
  }

  span,
  p {
    color: #f4ede8;
    font-size: 12px;
  }
`
