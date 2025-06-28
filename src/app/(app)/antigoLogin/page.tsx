"use client"
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from '../../services/api'

export default function CadastroLoginPage() {
  const router = useRouter()

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmailCadastro = useRef<HTMLInputElement>(null)
  const inputPasswordCadastro = useRef<HTMLInputElement>(null)

  const inputEmailLogin = useRef<HTMLInputElement>(null)
  const inputPasswordLogin = useRef<HTMLInputElement>(null)

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()

    if (inputName.current &&
      inputEmailCadastro.current &&
      inputPasswordCadastro.current
    ) {
      const name = inputName.current.value
      const email = inputEmailCadastro.current.value
      const password = inputPasswordCadastro.current.value

      try {
        await api.post("/register", { name, email, password })
        alert("Usuário cadastrado com sucesso!")

        router.push("/login")

        inputName.current.value = ""
        inputEmailCadastro.current.value = ""
        inputPasswordCadastro.current.value = ""
      } catch (err) {
        alert("Erro ao cadastrar.")
        console.error(err)
      }
    }
  }


  return (
    <div className="container">
      <form onSubmit={handleCadastro}>
        <h2>Cadastro de Usuário</h2>
        <span className='paragrafo'>
          <p>Se Cadastre aqui! </p>
        </span>
        <input placeholder="Nome" type="text" ref={inputName} />
        <input placeholder="Email" type="email" ref={inputEmailCadastro} />
        <input placeholder="Senha" type="password" ref={inputPasswordCadastro} />
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={() => router.push("/login")}>Já tenho cadastro</button>
      </form>
    </div>
  )
}
