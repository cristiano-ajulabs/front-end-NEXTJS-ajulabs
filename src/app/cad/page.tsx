"use client"
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/Login.module.css'
import api from '../services/api'

export default function Cad() {
  const router = useRouter()
  
  const inputEmailLogin = useRef<HTMLInputElement>(null)
  const inputPasswordLogin = useRef<HTMLInputElement>(null)

  async function handleCad(e: React.FormEvent) {
    e.preventDefault()

    const email = inputEmailLogin.current?.value
    const password = inputPasswordLogin.current?.value

    try { 
      await api.post("/auth/login", { email, password }) 
      router.push("/cadastro")
    } catch (err) {
      alert("Login inválido")
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCad} className={styles.form}>
        <h2 className={styles.title}>Cadastre-se</h2>
        <span className={styles.paragrafo}>
          <p>Se Conecte aqui!</p>
        </span>
        <input
          placeholder="Email"
          type="email"
          ref={inputEmailLogin}
          className={styles.input}
        />
        <input
          placeholder="Senha"
          type="password"
          ref={inputPasswordLogin}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Entrar</button>
        <button type="button" onClick={() => router.push("/")} className={styles.button}>Cadastrar</button>
      </form>
    </div>
  )
}
