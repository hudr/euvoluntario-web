import React, { useState, useEffect } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import { Container, Content, AnimationContainer, Background } from './styles'

const Home = () => {

  const [infos, setInfos] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/dashboard')
      const { data } = response

      console.log(data)

      setInfos(data)
    }
    fetchData()
  }, [])

  if (!infos) return <h1>Carregando...</h1>

  return (
    <Container>
      <Content>
        <AnimationContainer>
          
          <h1>Eu Voluntário</h1>

          <div style={{marginTop: '20px', display: 'flex', width: '400px', justifyContent: 'space-around', flexWrap: 'wrap', justifyItems: 'center', alignItems: 'center'}}>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{color: '#ff9000', fontSize: '30px'}}>{infos.volunteersCount}</h3>
              <p style={{width: '150px'}}>Voluntário(s) Cadastrado(s)</p>
            </div>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{color: '#ff9000', fontSize: '30px'}}>{infos.entitiesCount}</h3>
              <p style={{width: '150px'}}>Entidade(s) Cadastrada(s)</p>
            </div>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{color: '#ff9000', fontSize: '30px'}}>{infos.charitiesCount}</h3>
              <p style={{width: '150px'}}>Caridade(s) Cadastrada(s)</p>
            </div>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{color: '#ff9000', fontSize: '30px'}}>{infos.charitiesInProgress}</h3>
              <p style={{width: '150px'}}>Caridade(s) em Andamento</p>
            </div>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{color: '#ff9000', fontSize: '30px'}}>{infos.charitiesCompleted}</h3>
              <p style={{width: '150px'}}>Caridade(s) Concluída(s)</p>
            </div>

            <div style={{ marginBottom: '10px', background: '#29292e', borderRadius: '5px', padding: '20px', textAlign: 'center'}}>
              <h3 style={{ color: '#ff9000', fontSize: '30px'}}>{infos.helpedPeople}</h3>
              <p style={{width: '150px'}}>Pessoa(s) Impactada(s)</p>
            </div>
          </div>

          <Link to="/entrar">
            <FiLogIn />
            Entrar
          </Link>

          <Link to="/cadastrar">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default Home
