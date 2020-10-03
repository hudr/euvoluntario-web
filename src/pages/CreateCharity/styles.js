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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  form {
    margin: 30px 0;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`
