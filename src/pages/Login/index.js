import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

export default function Login() {
  const { signIn } = useAuth()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data) => {
      try {
        await signIn({
          email: 'hudson.santosr@gmail.com',
          password: '111111',
        })

        history.push('/dashboard')
      } catch (err) {
        console.log(err)
        return
      }
    },
    [signIn, history]
  )

  return (
    <>
      <h1>Tela de Login!</h1>
      <button onClick={handleSubmit}>Clique em mim</button>
    </>
  )
}
