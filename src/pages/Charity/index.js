import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { AiFillCheckSquare, AiFillCloseCircle } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import api from '../../services/api'

import Map from '../../components/Map'
import Button from '../../components/Button'


import { Container, Header, HeaderContent, BackTo, Content, Card, EntityAction } from './styles'

const Charity = () => {
  const { user } = useAuth()

  const { addToast } = useToast()

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
      if(user._id === charity.assignedTo._id) {
        if(volunteer.approved === 'true' || volunteer.approved === 'false') return volunteer
      } 
      
      return volunteer.approved === 'true'
    })


  const isSubscribed = charity.volunteers && charity.volunteers.find(volunteer =>
    (volunteer.user._id === user._id)
  )
   

  async function approveUser(subscribeId, volunteerId) {
    const response = await api.patch(`/charity/approve/${charityId}`, {
      subscribeId
    })

    const { data } = response
    const { charity } = data
    setCharity(charity)

    await api.post('/user/notification', {
      status: "Aprovado",
      charity_id: charityId,
      user_id: volunteerId
    })

    addToast({
      type: 'success',
      title: 'Voluntário aprovado com sucesso',
    })
  } 

  async function denyUser(subscribeId, charityId, volunteerId) {
    Swal.fire({
      title: 'Informe o motivo',
      input: 'textarea',
      inputPlaceholder: 'Ex.: Atingimos o limite de voluntários',
      inputAttributes: {
          'aria-label': 'Ex.: Atingimos o limite de voluntários'
      },
      confirmButtonText: 'Recusar',
      confirmButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',

      showLoaderOnConfirm: true,

      inputValidator: (value) => {
        return !value && 'Você precisa preencher o motivo!'
      },

      // Recusando Voluntário
      preConfirm: async (message) => {
          const response = await api.patch(`/charity/deny/${charityId}`, {
              subscribeId
          })

          const { data } = response
          const { charity } = data

          setCharity(charity)

          await api.post('/user/notification', {
            message,
            status: "Reprovado",
            charity_id: charityId,
            user_id: volunteerId
          })

          addToast({
            type: 'success',
            title: 'Voluntário reprovado com sucesso!',
          })
      },
      allowOutsideClick: () => !Swal.isLoading() 
    })
  } 

  async function subscribe() {
    const response = await api.patch(`/charity/subscribe/${charityId}`)

    const { data } = response
    const { charity } = data
    setCharity(charity)

    await api.post('/user/notification', {
      message: "Solicitação pendente",
      status: "Solicitação",
      charity_id: charityId,
      user_id: charity.assignedTo._id
    })

    addToast({
      type: 'success',
      title: 'Você se inscreveu, aguarde aprovação!',
    })
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
        <p>Pessoas Impactadas: {charity.helpedPeople}</p>
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

        {charity.volunteers && charityVolunteers.length > 0 ? (
          charityVolunteers.map((volunteer) => (
            <div key={volunteer._id}>
                <Card>
                  <Link to={`/painel/perfil/${volunteer.user._id}`}>
                    <img
                      src={
                        volunteer.user.avatarUrl
                          ? `https://euvoluntario.s3.amazonaws.com/users/${volunteer.user.avatarUrl}`
                          : 'https://api.hello-avatar.com/adorables/186/abott@adorable.io.png'
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

                    <ul style={{ marginTop: '15px' }}>
                      {volunteer.user.qualities.map((quality, index) =>
                        <li
                          style={{
                            margin: '5px',
                            textAlign: 'center',
                            listStyle: 'none',
                            color: 'white',
                            background: '#ff9000',
                            padding: '4px',
                            borderRadius: '5px',
                            fontSize: '10px',
                          }}
                          key={index}>{quality}</li>
                      )}
                    </ul>
                  </Link>

                  {(user._id === charity.assignedTo._id && (volunteer.approved === 'false')) &&
                    <EntityAction>
                      <AiFillCheckSquare onClick={() => approveUser(volunteer._id, volunteer.user._id)}/>
                      <AiFillCloseCircle onClick={() => denyUser(volunteer._id, charityId, volunteer.user._id)}/>
                    </EntityAction>
                  }
                </Card>
            </div>
          ))
        ) : (
          <p>Esta caridade ainda não possui voluntários confirmados.</p>
        )}

        {(!isSubscribed && user.role !== 'entity') && <Button onClick={subscribe}>Solicitar participação</Button>}
  
        {(isSubscribed && isSubscribed.approved === 'false') && <p>Você já solicitou participação, aguarde sua aprovação.</p>}

        {(isSubscribed && isSubscribed.approved === 'denied') && <p>Sua solicitação de participação foi negada, consulte suas notificações.</p>}
        

      </Content>
    </Container>
  )
}

export default Charity
