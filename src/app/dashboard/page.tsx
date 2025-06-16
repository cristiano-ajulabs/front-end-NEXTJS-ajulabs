"use client"
import { useEffect, useState, useRef } from "react"
import api from '../services/api'


type Usuario = {
  id: string
  name: string
  email: string
}

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  async function getUsers() {
    try {
      const response = await api.get('/users')
      setUsuarios(response.data)
    } catch (err) {
      console.error("Erro ao buscar usuários", err)
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
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Usuários Cadastrados</h1>
        <span className='paragrafo'>
          <p>Lista de Cadastros </p>
        </span>
        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          usuarios.map((usu) => (
            <div key={usu.id} className="card">
              <div>
                <p>Nome: <span>{usu.name}</span></p>
                <p>E-mail: <span>{usu.email}</span></p>
              </div>
              <button type="button" onClick={() => deleteUsers(usu.id)}>
                <img src="/assets/lixo.svg" alt="Deletar" />
              </button>
            </div>
          ))
        )}
      </form>
    </div>
  )
}