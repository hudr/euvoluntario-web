import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import {
  Container,
  Header,
  HeaderContent,
  BackTo,
  Content,
  Card,
} from './styles'

const Charities = () => {
  const [charities, setCharities] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/charity')
      const { data } = response
      const { charities } = data
      setCharities(charities)
    }
    fetchData()
  }, [])

  if (!charities) return <h1>Carregando...</h1>

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackTo>
            <Link to="/painel">
              <FiArrowLeft />
              <div>
                <div>
                  <span>Voltar para</span>
                  <strong>Menus</strong>
                </div>
              </div>
            </Link>
          </BackTo>
        </HeaderContent>
      </Header>
      <Content>
        <h2>Lista de Caridades</h2>

        <div>
          {charities.length > 0 ? (
            charities.map((charity) => (
              <Link to={`/painel/caridade/${charity._id}`} key={charity._id}>
                <Card>
                  <span>{charity.title}</span>
                  <p>Instituição - {charity.assignedTo.name}</p>
                  <p>Local - {charity.address}</p>
                  <p>
                    {`Quando - ${format(
                      new Date(charity.date),
                      'dd/MM/yy HH:mm'
                    )}h`}
                  </p>
                </Card>
              </Link>
            ))
          ) : (
            <p>Ainda não existem eventos de caridade cadastrados.</p>
          )}
        </div>
      </Content>
    </Container>
  )
}

export default Charities
