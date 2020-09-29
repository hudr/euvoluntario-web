import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

const animationSpinner = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
`

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
  svg {
    fill: #312e38;
    -webkit-animation: ${animationSpinner} 2s infinite linear;
    animation: ${animationSpinner} 2s infinite linear;
  }
`
