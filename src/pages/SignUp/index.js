import React, { useCallback, useState, useRef } from 'react'
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi'
import { RiBuildingLine } from 'react-icons/ri'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import { Container, Content, AnimationContainer, Background } from './styles'

const SignUp = () => {
  const formRef = useRef(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite email válido')
            .required('Email obrigatório'),
          phone: Yup.string()
            .min(10, 'Mínimo de 10 dígitos')
            .required('Telefone obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/user', data)

        addToast({
          type: 'success',
          title: 'Cadastro realizado.',
          description: 'Você já pode fazer o logon no Eu Voluntário!',
        })

        history.push('/entrar')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        })
      }
    },
    [addToast, formRef, history]
  )

  const customStyles = {
    control: (styles) => ({
      ...styles,
      padding: 10,
      border: 0,
      width: '100%',
      borderRadius: 10,
      backgroundColor: '#232129',
      boxShadow: 'none',
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: '#312E38',
      }
    },
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      color: '#ddd',
    }),

    singleValue: (styles) => ({ ...styles, color: '#fff' }),
  }

  const [selectedRole, setSelectedRole] = useState('')

  const roleOptions = [
    { value: 'volunteer', label: 'Voluntário(a)' },
    { value: 'entity', label: 'Entidade' },
  ]

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="phone"
              icon={FiPhone}
              type="number"
              pattern="^[0–9]$"
              placeholder="(11) 90000-0000"
            />
            <Input
              name="address"
              icon={FiMapPin}
              type="text"
              placeholder="Endereço"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            {selectedRole && selectedRole.value === 'entity' && (
              <Input
                name="cnpj"
                icon={RiBuildingLine}
                type="text"
                placeholder="28.105.064/0001-76"
              />
            )}

            <Select
              name="role"
              options={roleOptions}
              styles={customStyles}
              placeholder="Escolha uma atribuição"
              onChange={setSelectedRole}
              defaultValue={roleOptions[0]}
              required
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/entrar">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
export default SignUp
