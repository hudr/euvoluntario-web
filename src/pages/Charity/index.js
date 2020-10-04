import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'

import Map from '../../components/Map'

import { Container, Header, HeaderContent, BackTo, Content } from './styles'

const Charity = () => {
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

  const volunteersApproved =
    charity.volunteers &&
    charity.volunteers.filter((volunteer) => {
      return volunteer.approved === 'true'
    })

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
            <Map address={charity.address} />
          </>
        )}

        <h2 style={{ marginTop: '30px' }}>Voluntários</h2>

        {charity.volunteers && volunteersApproved.length > 0 ? (
          volunteersApproved.map((volunteer) => (
            <li
              style={{ listStyle: 'none', marginBottom: '5px' }}
              key={volunteer._id}
            >
              <p>{volunteer.user.name}</p>
              <p>{volunteer.user.phone}</p>
            </li>
          ))
        ) : (
          <p>Esta caridade ainda não possui voluntários confirmados.</p>
        )}
      </Content>
    </Container>
  )
}

export default Charity
