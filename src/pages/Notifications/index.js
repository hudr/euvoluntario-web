import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
  Container,
  Header,
  HeaderContent,
  BackTo,
  Content,
  Card,
} from './styles'

const Notifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user/notifications')
      const { data } = response
      const { notifications } = data
      setNotifications(notifications)
    }
    fetchData()
  }, [])

  if (!notifications) return <h1>Carregando...</h1>

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
        <h2>Lista de Notificações</h2>

        <div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
                <Card key={notification._id}>
                  <span>Remetente: {notification.sender}</span>
                  <p>Iniciativa - {notification.charityName}</p>

                  {user.role === 'volunteer' &&
                   <p>Situação - <span style={{ color: notification.status === 'Aprovado' || notification.status === 'Informativo' ? 'lightgreen' : 'red'}}>{notification.status}</span></p>
                  }

                  {user.role === 'entity' &&
                   <p>Situação - <span style={{ color: '#ff9000'}}>{notification.status}</span></p>
                  }
                 
                  <p>
                    {`Data da Notificação - ${format(
                      new Date(notification.createdAt),
                      'dd/MM/yy HH:mm'
                    )}h`}
                  </p>

                  {user.role === 'volunteer' && (
                    <>
                    {notification.status === 'Reprovado' || notification.status === 'Informativo' ?
                      <p style={{marginTop: '10px'}}>Motivo - {notification.message}</p> 
                      : <p style={{marginTop: '10px'}}>Fique atento(a) e não perca a data de realização da iniciativa. Obrigado por voluntariar-se!</p>}
                    </>)
                  }
                  
                </Card>
            ))
          ) : (
            <p>Você ainda não possui notificações.</p>
          )}
        </div>
      </Content>
    </Container>
  )
}

export default Notifications
