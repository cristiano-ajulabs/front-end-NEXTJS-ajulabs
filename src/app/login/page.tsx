"use client"
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from '../services/api'

export default function Login(){
    const router = useRouter()
    
      const inputName = useRef<HTMLInputElement>(null)
      const inputEmailCadastro = useRef<HTMLInputElement>(null)
      const inputPasswordCadastro = useRef<HTMLInputElement>(null)
    
      const inputEmailLogin = useRef<HTMLInputElement>(null)
      const inputPasswordLogin = useRef<HTMLInputElement>(null)

    async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const email = inputEmailLogin.current?.value
    const password = inputPasswordLogin.current?.value

    try { 
      await api.post("/login", {email, password}) 
      router.push("/dashboard")
    } catch (err) {
      alert("Login inválido")
    }
  }

    return(
        <div className="container">
            <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <span className='paragrafo'>
          <p>Se Conecte aqui! </p>
        </span>
        <input placeholder="Email" type="email" ref={inputEmailLogin} />
        <input placeholder="Senha" type="password" ref={inputPasswordLogin} />
        <button type="submit">Entrar</button>
      </form>
        </div>
    )
}