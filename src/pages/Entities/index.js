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

const Entities = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user')
      const { data } = response
      const { volunteers } = data

      const filtered = volunteers.filter(
        (volunteer) => volunteer.role === 'entity'
      )

      setEntities(filtered)
    }
    fetchData()
  }, [])

  if (!entities) return <h1>Carregando...</h1>

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
        <h2>Lista de Entidades</h2>

        <div>
          {entities.length > 0 ? (
            entities.map((entity) => (
              <Link to={`/painel/perfil/${entity._id}`} key={entity._id}>
                <Card>
                  <img
                    src={
                      entity.avatarUrl
                        ? `https://euvoluntario.s3.amazonaws.com/users/${entity.avatarUrl}`
                        : 'https://api.adorable.io/avatars/186/abott@adorable.io.png'
                    }
                    alt={entity.name}
                  />
                  <span>{entity.name}</span>
                  <p>Local - {entity.address}</p>
                  <p>Contato - {entity.phone}</p>
                  <p>
                    {`Desde - ${format(
                      new Date(entity.createdAt),
                      'dd/MM/yy'
                    )}`}
                  </p>
                </Card>
              </Link>
            ))
          ) : (
            <p>Ainda não existem entidades cadastradas.</p>
          )}
        </div>
      </Content>
    </Container>
  )
}

export default Entities
