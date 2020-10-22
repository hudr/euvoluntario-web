import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  padding: 25px 40px;
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

export const BackTo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
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
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  a {
    text-decoration: none;
  }
`

export const Card = styled.div`
  background: rgb(41, 41, 46);
  border-width: 2px;
  border-style: solid;
  border-color: rgb(41, 41, 46);
  border-image: initial;
  border-radius: 5px;
  padding: 24px;
  transition: border 0.2s ease 0s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 56px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  span,
  p {
    color: #f4ede8;
  }

  p {
    font-size: 12px;
  }
  &:hover {
    border-color: #ff9000;
  }
`

export const EntityAction = styled.div`
  
  margin-top: 15px;
  display: flex;

  svg {
    width: 30px;
    height: 30px;

    &:first-child {
        color: #14FF25;

        &:hover {
          color: #00b80d;
        }
    }

    color: #FF5858;

    &:hover {
      color: #a33131;
    }
  }
`
