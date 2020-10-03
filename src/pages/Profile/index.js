import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  FiMail,
  FiUser,
  FiLock,
  FiCamera,
  FiArrowLeft,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi'

import { RiBuildingLine } from 'react-icons/ri'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useHistory, Link } from 'react-router-dom'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'

import {
  Container,
  Header,
  HeaderContent,
  BackTo,
  Content,
  AvatarInput,
} from './styles'

import { useAuth } from '../../hooks/auth'

const Profile = () => {
  const formRef = useRef(null)
  const { addToast } = useToast()
  const history = useHistory()

  const [userAvatar, setUserAvatar] = useState()

  const { user, updateUser } = useAuth()

  useEffect(() => {
    if (userAvatar) {
      const updateAvatar = async () => {
        const data = new FormData()

        data.append('avatar', userAvatar)

        await api.patch('/user/profile/avatar', data).then((response) => {
          updateUser(response.data)

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          })
        })
      }

      updateAvatar()
    }
  }, [userAvatar, addToast, updateUser])

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          phone: Yup.string()
            .min(10, 'Mínimo de 10 dígitos')
            .required('Telefone obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 dígitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        })

        await schema.validate(data, { abortEarly: false })

        const { name, email, phone, address, cnpj, role, ...rest } = data

        const formData = {
          name,
          email,
          phone,
          address,
          cnpj,
          role,
          ...(rest.old_password ? rest : {}),
        }

        const response = await api.put('/user/profile', formData)

        updateUser(response.data)

        history.push('/painel')

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        })
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
    [addToast, history, updateUser]
  )

  const handleAvatarChange = useCallback(
    (e) => {
      if (e.target.files) {
        const image = e.target.files[0]

        const reader = new FileReader()

        reader.onload = async () => {
          const imageName = image.name
          const imageSize = Math.round(image.size / 1000)

          if (imageSize <= 1000) {
            if (
              imageName.indexOf('.jpeg') >= 0 ||
              imageName.indexOf('.jpg') >= 0 ||
              imageName.indexOf('.png') >= 0
            ) {
              setUserAvatar(image)
            } else {
              return addToast({
                type: 'error',
                title: 'Formato não suportado!',
                description: 'Os formatos aceitos são: jpeg, jpg e png.',
              })
            }
          } else {
            return addToast({
              type: 'error',
              title: 'Arquivo pesado!',
              description: 'O limite para upload de imagem é de 1MB.',
            })
          }
        }

        reader.readAsDataURL(image)
      }
    },
    [addToast]
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

  const roleOptions = [
    { value: 'volunteer', label: 'Voluntário(a)' },
    { value: 'entity', label: 'Entidade' },
  ]

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
          initialData={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            cnpj: user.cnpj,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img
              src={
                user.avatarUrl
                  ? `https://euvoluntario.s3.amazonaws.com/users/${user.avatarUrl}`
                  : 'https://api.adorable.io/avatars/186/abott@adorable.io.png'
              }
              alt={user.name}
            />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input
                data-testid="input-file"
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

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

          {user.role === 'entity' && (
            <Input
              name="cnpj"
              icon={RiBuildingLine}
              type="text"
              placeholder="28.105.064/0001-76"
            />
          )}

          <Select
            name="role"
            defaultValue={
              user.role === 'volunteer' ? roleOptions[0] : roleOptions[1]
            }
            styles={customStyles}
            isDisabled={true}
          />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
