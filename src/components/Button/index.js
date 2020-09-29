import React from 'react'

import { FaSpinner } from 'react-icons/fa'

import { Container } from './styles'

const Button = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? <FaSpinner size={20} /> : children}
  </Container>
)

export default Button
