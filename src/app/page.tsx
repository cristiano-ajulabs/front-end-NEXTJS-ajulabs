"use client"
import { useEffect, useState, useRef } from 'react'
import api from './services/api'
import { get } from 'http'


export default function Home() {
  type Usuario = {
    id: string
    name: string
    email: string
  }
  const [usus, setUsus] = useState<Usuario[]>([])

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPassword= useRef<HTMLInputElement>(null)

  async function getUsers() {
    const response = await api.get('/users')
    setUsus(response.data)
  }

  async function createUsers() {
    if (
      inputName.current &&
      inputEmail.current &&
      inputPassword.current
    ) {
    await api.post("/register", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value
    })

    getUsers()

    inputName.current.value = ""
    inputEmail.current.value = ""
    inputPassword.current.value = ""
    }
  }

  async function deleteUsers(id: string) {
    try {
      await api.delete(`/users/${id}`)
      getUsers()
    } catch (error) {
      console.error("Erro ao deletar usuário", error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder="Name :" name="name" type="text" ref={inputName}/>
        <input placeholder="E-mail :" type="email" name="email" ref={inputEmail}/>
        <input placeholder="Password :" type="password" name="password" ref={inputPassword}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {usus.map((usu) => (
        <div key={usu.id} className="card">
          <div>
            <p>Nome : <span>{usu.name}</span> </p>
            <p>E-mail : <span>{usu.email}</span> </p>
          </div>
          <button onClick={() => deleteUsers(usu.id)}>
            <img src='/assets/lixo.svg' alt="delete" />
          </button>
        </div>
      ))}
    </div>
  )
}