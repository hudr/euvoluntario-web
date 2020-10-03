import React from 'react'
import { format } from 'date-fns'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container, Header, HeaderContent, BackTo, Content } from './styles'

const Teste = () => {
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
        <h2>Título da Caridade</h2>
        <p>Descrição: descrição da caridade</p>

        <p>{`Data: ${format(new Date(), 'dd/MM/yy')}`}</p>

        <h2 style={{ marginTop: '30px' }}>Entidade</h2>
        <p>Nome: Nome da Entidade</p>
        <p>Endereço: Endereço da Entidade</p>
        <p>Telefone: 21970000000</p>
        <p>CNPJ: CNPJ da Entidade</p>

        <h2 style={{ marginTop: '30px' }}>Qualidades necessárias</h2>
        <li style={{ listStyle: 'none', marginBottom: '5px' }}>
          <p>Cuidar de animais</p>
        </li>

        <h2 style={{ marginTop: '30px' }}>Voluntários</h2>

        <li style={{ listStyle: 'none', marginBottom: '5px' }}>
          <p>Hudson Ramos</p>
          <p>21970000000</p>
        </li>

        <h2 style={{ marginTop: '30px' }}>Imagem</h2>
        <img src="https://i.stack.imgur.com/L1WnE.png" alt="Imagem do Mapa" />
      </Content>
    </Container>
  )
}

export default Teste
