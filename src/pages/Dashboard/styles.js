import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  padding: 25px 0;
  background: #28262e;
`

export const HeaderContent = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`

export const Profile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  a {
    text-decoration: none;
  }
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: row;
    div {
      flex-direction: column;
      margin-left: 16px;
      line-height: 24px;
      span {
        color: #f4ede8;
      }
      strong {
        color: #ff9000;
      }
    }
  }
`

export const Content = styled.div`
  padding: 32px 30px;
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
    gap: 16px;
  }
  a {
    text-decoration: none;
  }
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
  svg {
    width: 24px;
    height: 24px;
    color: #ff9000;
    margin-bottom: 12px;
  }
  span {
    color: #f4ede8;
    max-width: 30px;
  }
  &:hover {
    border-color: #ff9000;
  }
`
