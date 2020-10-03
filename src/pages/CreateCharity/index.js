import React, { useCallback, useRef } from 'react'
import { FiMapPin, FiArrowLeft } from 'react-icons/fi'
import { MdDescription } from 'react-icons/md'
import { BiPencil } from 'react-icons/bi'

import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useHistory, Link } from 'react-router-dom'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'

import { Container, Header, HeaderContent, BackTo, Content } from './styles'

const CreateCharity = () => {
  const formRef = useRef(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Título é obrigatório'),
          description: Yup.string().required('Descrição é obgrigatória'),
          address: Yup.string().required('Endereço obrigatório'),
          date: Yup.date().required('A data é obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        await api.post('/charity', data)

        addToast({
          type: 'success',
          title: 'Caridade criada.',
          description: 'Sua iniciativa já pode ser consultada!',
        })

        history.push('/painel')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        })
      }
    },
    [addToast, history]
  )

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
                  <strong>Painel</strong>
                </div>
              </div>
            </Link>
          </BackTo>
        </HeaderContent>
      </Header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ date: new Date() }}
          onSubmit={handleSubmit}
        >
          <h1>Criar Caridade</h1>

          <Input name="title" icon={BiPencil} placeholder="Título" />

          <Input
            name="description"
            icon={MdDescription}
            placeholder="Descrição"
          />

          <Input name="address" icon={FiMapPin} placeholder="Endereço" />

          <DatePicker name="date" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default CreateCharity
