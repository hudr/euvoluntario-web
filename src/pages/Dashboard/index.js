import React from 'react'
import { FiPower, FiUsers } from 'react-icons/fi'
import { MdNotificationsNone, MdNotificationsActive } from 'react-icons/md'
import { RiBuildingLine } from 'react-icons/ri'
import { BsListNested } from 'react-icons/bs'

import { Link } from 'react-router-dom'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Card,
} from './styles'

import { useAuth } from '../../hooks/auth'

const Dashboard = () => {
  const { signOut, user } = useAuth()

  const notifications = 0

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <Link to="/painel/perfil">
              <div>
                <img
                  src={
                    user.avatar_url ||
                    'https://api.adorable.io/avatars/186/abott@adorable.io.png'
                  }
                  alt={`Imagem de ${user.name}`}
                />

                <div>
                  <span>Bem-vindo(a),</span>
                  <strong>{user.name}</strong>
                </div>
              </div>
            </Link>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <h2>O que você deseja fazer?</h2>

        <div>
          <Link to="/painel/caridades">
            <Card>
              <BsListNested />
              <span>Visualizar Caridades</span>
            </Card>
          </Link>

          <Link to="/painel/entidades">
            <Card>
              <RiBuildingLine />
              <span>Visualizar Entidades</span>
            </Card>
          </Link>

          <Link to="/painel/voluntarios">
            <Card>
              <FiUsers />
              <span>Visualizar Voluntários</span>
            </Card>
          </Link>

          <Link to="/painel/notificacoes">
            <Card>
              {notifications ? (
                <MdNotificationsActive />
              ) : (
                <MdNotificationsNone />
              )}
              <span>Minhas Notificações</span>
            </Card>
          </Link>
        </div>
      </Content>
    </Container>
  )
}

export default Dashboard
