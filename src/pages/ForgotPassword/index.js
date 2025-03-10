import React, { useCallback, useRef, useState } from 'react'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'
import api from '../../services/api'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const formRef = useRef(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)

        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/user/password/forgot', {
          email: data.email.toLowerCase(),
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado!',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Eu Voluntário" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/entrar">
            <FiArrowLeft />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
