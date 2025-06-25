"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import api from '../services/api'

// Tipo dos usuários
type Usuario = {
  id: string
  name: string
  email: string
}

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [novoNome, setNovoNome] = useState("")
  const [novoEmail, setNovoEmail] = useState("")
  const router = useRouter()

  // Atualiza o usuário (chama API)
  async function updateUser(id: string, updateData: { name: string; email: string }) {
    try {
      await api.put(`/users/${id}`, updateData)
      alert("Usuário atualizado com sucesso!")
      setEditandoId(null)
      getUsers()
    } catch (err) {
      console.error("Erro ao atualizar usuário", err)
      alert("Erro ao atualizar")
    }
  }

  // Carrega todos os usuários
  async function getUsers() {
    try {
      const response = await api.get('/users')
      setUsuarios(response.data)
    } catch (err) {
      console.error("Erro ao buscar usuários", err)
    }
  }

  // Deleta um usuário
  async function deleteUsers(id: string) {
    try {
      await api.delete(`/users/${id}`)
      getUsers()
    } catch (error) {
      console.error("Erro ao deletar usuário", error)
    }
  }

  // Carrega a lista na montagem
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Usuários Cadastrados</h1>
        <span className='paragrafo'>
          <p>Lista de Cadastros</p>
        </span>

        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          usuarios.map((usu) => (
            <div key={usu.id} className="card">
              <div className="card-content">
                {editandoId === usu.id ? (
                  <>
                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      placeholder="Novo nome"
                    />
                    <input
                      type="email"
                      value={novoEmail}
                      onChange={(e) => setNovoEmail(e.target.value)}
                      placeholder="Novo email"
                    />
                  </>
                ) : (
                  <>
                    <p>Nome: <span>{usu.name}</span></p>
                    <p>E-mail: <span>{usu.email}</span></p>
                  </>
                )}
              </div>

              <div className="btn-container">
                {editandoId === usu.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        if (!novoNome || !novoEmail) {
                          alert("Preencha os dois campos para atualizar!")
                          return
                        }
                        updateUser(usu.id, { name: novoNome, email: novoEmail })
                      }}
                    >
                      <img src="/assets/save.png" alt="Salvar" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditandoId(null)
                        setNovoNome("")
                        setNovoEmail("")
                      }}
                    >
                      <img src="/assets/cancel.png" alt="Editar" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditandoId(usu.id)
                      setNovoNome(usu.name)
                      setNovoEmail(usu.email)
                    }}
                  >
                    <img src="/assets/edit.png" alt="Editar" />
                  </button>
                )}

                <button type="button" onClick={() => deleteUsers(usu.id)}>
                  <img src="/assets/lixo.svg" alt="Deletar" />
                </button>
              </div>
            </div>
          ))
        )}

        <button type="button" onClick={() => router.push("/")}>Sair</button>
      </form>
    </div>
  )
}
