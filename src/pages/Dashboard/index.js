import React from 'react'
import { useAuth } from '../../hooks/auth'

export default function Dashboard() {
  const { signOut, user } = useAuth()

  return (
    <>
      <h1>Olá {user.name}, você está logado!</h1>
      <button onClick={signOut}>Deslogar</button>
    </>
  )
}
