"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'
import styles from '../../../styles/cadastro.module.css'
import api from '../../services/api'

type Usuario = {
  id: string
  name: string
  email: string
}

export default function CadastroDashboardPage() {
  const router = useRouter()

  // Cadastro
  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)

  // Lista de usuários
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [novoNome, setNovoNome] = useState("")
  const [novoEmail, setNovoEmail] = useState("")

  // ➕ Cadastrar novo usuário
  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()

    if (inputName.current && inputEmail.current && inputPassword.current) {
      const name = inputName.current.value
      const email = inputEmail.current.value
      const password = inputPassword.current.value

      try {
        await api.post("/register", { name, email, password })
        alert("Usuário cadastrado com sucesso!")
        inputName.current.value = ""
        inputEmail.current.value = ""
        inputPassword.current.value = ""
        getUsers()
      } catch (err) {
        alert("Erro ao cadastrar.")
        console.error(err)
      }
    }
  }

  // 🔃 Atualiza um usuário
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

  // ❌ Deleta um usuário
  async function deleteUsers(id: string) {
    try {
      await api.delete(`/users/${id}`)
      getUsers()
    } catch (error) {
      console.error("Erro ao deletar usuário", error)
    }
  }

  // 🔃 Carrega usuários ao abrir página
  async function getUsers() {
    try {
      const response = await api.get('/users')
      setUsuarios(response.data)
    } catch (err) {
      console.error("Erro ao buscar usuários", err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      {/* CADASTRO */}
      <form onSubmit={handleCadastro}>
        <h2 className={styles.titulo}>Cadastro de Usuário</h2>
        <div className={styles.content}>
          <div className={styles.subtitulos}>
            <input placeholder="Nome" type="text" ref={inputName} />
            <input placeholder="Email" type="email" ref={inputEmail} />
            <input placeholder="Senha" type="password" ref={inputPassword} />
          </div>
          <div className={styles.subbtn}>
            <button type="submit"> + Cadastrar</button>
          </div>
        </div>
      </form>

      {/* LISTA DE USUÁRIOS */}
      <div>
        <h2 className={styles.titulo}>Usuários Cadastrados</h2>

        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles["tabela-titulo"]}>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usu) => (
                <tr key={usu.id}>
                  <td>
                    {editandoId === usu.id ? (
                      <input
                        type="text"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        placeholder="Novo nome"
                      />
                    ) : (
                      usu.name
                    )}
                  </td>
                  <td>
                    {editandoId === usu.id ? (
                      <input
                        type="email"
                        value={novoEmail}
                        onChange={(e) => setNovoEmail(e.target.value)}
                        placeholder="Novo email"
                      />
                    ) : (
                      usu.email
                    )}
                  </td>
                  <td>
                    {editandoId === usu.id ? (
                      <>
                        <button
                          className={styles.btn}
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
                          className={styles.btn}
                          type="button"
                          onClick={() => {
                            setEditandoId(null)
                            setNovoNome("")
                            setNovoEmail("")
                          }}
                        >
                          <img src="/assets/cancel.png" alt="Cancelar" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.btn}
                          type="button"
                          onClick={() => {
                            setEditandoId(usu.id)
                            setNovoNome(usu.name)
                            setNovoEmail(usu.email)
                          }}
                        >
                          <img src="/assets/edit.png" alt="Editar" />
                        </button>
                        <button className={styles.btn} type="button" onClick={() => deleteUsers(usu.id)}>
                          <img src="/assets/lixo.svg" alt="Deletar" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
