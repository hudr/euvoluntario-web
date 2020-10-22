import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { AiFillCheckSquare, AiFillCloseCircle } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import Map from '../../components/Map'

import { Container, Header, HeaderContent, BackTo, Content, Card, EntityAction } from './styles'

const Charity = () => {
  const { user } = useAuth()

  const { charityId } = useParams()

  const [charity, setCharity] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/charity/${charityId}`)
      const { data } = response
      const { charity } = data
      setCharity(charity)
    }
    fetchData()
  }, [charityId])

  const charityVolunteers =
    charity.volunteers &&
    charity.volunteers.filter((volunteer) => {
      if(user.role === 'entity') {
        if(volunteer.approved === 'true' || volunteer.approved === 'false') return volunteer
      } else {
        return volunteer.approved === 'true'
      }
    })

  async function approveUser(subscribeId) {
    const response = await api.patch(`/charity/approve/${charityId}`, {
      subscribeId
    })

    const { data } = response
    const { charity } = data
    setCharity(charity)
  } 

  async function denyUser(subscribeId) {
    const response = await api.patch(`/charity/deny/${charityId}`, {
      subscribeId
    })

    const { data } = response
    const { charity } = data
    setCharity(charity)
  } 

  if (!charity) return <h1>Carregando...</h1>

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackTo>
            <Link to="/painel/caridades">
              <FiArrowLeft />
              <div>
                <div>
                  <span>Voltar para</span>
                  <strong>Lista de Caridades</strong>
                </div>
              </div>
            </Link>
          </BackTo>
        </HeaderContent>
      </Header>
      <Content>
        <h2>{charity.title}</h2>
        <p>Descrição: {charity.description}</p>
        {charity.date && (
          <p>{`Data: ${format(new Date(charity.date), 'dd/MM/yy')}`}</p>
        )}

        <h2 style={{ marginTop: '30px' }}>Entidade</h2>
        <p>Nome: {charity.assignedTo?.name}</p>
        <p>Endereço: {charity.assignedTo?.address}</p>
        <p>Telefone: {charity.assignedTo?.phone}</p>
        <p>CNPJ: {charity.assignedTo?.cnpj}</p>

        {charity.address && (
          <>
            <h2 style={{ marginTop: '30px' }}>Mapa</h2>
            <p>Endereço: {charity.address}</p>
            {/* <Map address={charity.address} /> */}
          </>
        )}

        <h2 style={{ marginTop: '30px' }}>Voluntários</h2>

        <div>
          
              
        
        </div>

        {charity.volunteers && charityVolunteers.length > 0 ? (
          charityVolunteers.map((volunteer) => (
            <div key={volunteer._id}>
                <Card>
                  <Link to={`/painel/perfil/${volunteer.user._id}`}>
                    <img
                      src={
                        volunteer.user.avatarUrl
                          ? `https://euvoluntario.s3.amazonaws.com/users/${volunteer.user.avatarUrl}`
                          : 'https://api.adorable.io/avatars/186/abott@adorable.io.png'
                      }
                      alt={volunteer.user.name}
                    />
                    <span>{volunteer.user.name}</span>

                    <p>Contato - {volunteer.user.phone}</p>
                    <p>
                      {`Desde - ${format(
                        new Date(volunteer.user.createdAt),
                        'dd/MM/yy'
                      )}`}
                    </p>
                  </Link>

                  {(user.role === 'entity' && (volunteer.approved === 'false')) &&
                    <EntityAction>
                      <AiFillCheckSquare onClick={() => approveUser(volunteer._id)}/>
                      <AiFillCloseCircle onClick={() => denyUser(volunteer._id)}/>
                    </EntityAction>
                  }
                </Card>
            </div>
          ))
        ) : (
          <p>Esta caridade ainda não possui voluntários confirmados.</p>
        )}
      </Content>
    </Container>
  )
}

export default Charity
