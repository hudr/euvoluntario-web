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

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user')
      const { data } = response
      const { volunteers } = data

      const filtered = volunteers.filter(
        (volunteer) => volunteer.role === 'volunteer'
      )

      setVolunteers(filtered)
    }
    fetchData()
  }, [])

  if (!volunteers) return <h1>Carregando...</h1>

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
        <h2>Lista de Voluntários</h2>

        <div>
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <Link to={`/painel/perfil/${volunteer._id}`} key={volunteer._id}>
                <Card>
                  <img
                    src={
                      volunteer.avatarUrl
                        ? `https://euvoluntario.s3.amazonaws.com/users/${volunteer.avatarUrl}`
                        : 'https://api.hello-avatar.com/adorables/186/abott@adorable.io.png'
                    }
                    alt={volunteer.name}
                  />
                  <span>{volunteer.name}</span>

                  <p>Contato - {volunteer.phone}</p>
                  <p>
                    {`Desde - ${format(
                      new Date(volunteer.createdAt),
                      'dd/MM/yy'
                    )}`}
                  </p>
                </Card>
              </Link>
            ))
          ) : (
            <p>Ainda não existem voluntários cadastrados.</p>
          )}
        </div>
      </Content>
    </Container>
  )
}

export default Volunteers
