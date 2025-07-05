"use client"
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from './services/api'
import styles from '../styles/Login.module.css'

export default function Login(){
    const router = useRouter()
    
    const inputEmailLogin = useRef<HTMLInputElement>(null)
    const inputPasswordLogin = useRef<HTMLInputElement>(null)

    async function handleLogin(e: React.FormEvent) {
      e.preventDefault()

      const email = inputEmailLogin.current?.value
      const password = inputPasswordLogin.current?.value

      try { 
        await api.post("/auth/login", {email, password}) 
        router.push("/cadastro")
      } catch (err) {
        alert("Login inválido")
      }
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <h2 className={styles.title}>Login</h2>
                <span className={styles.paragrafo}>
                  <p>Se Conecte aqui! </p>
                </span>
                <input placeholder="Email" type="email" ref={inputEmailLogin} className={styles.input}/>
                <input placeholder="Senha" type="password" ref={inputPasswordLogin} className={styles.input}/>
                <button type="submit" className={styles.button}>Entrar</button>
                <button type="button" onClick={() => router.push("/cad")} className={styles.button}>Cadastre-se</button>
            </form>
        </div>
    )
}
