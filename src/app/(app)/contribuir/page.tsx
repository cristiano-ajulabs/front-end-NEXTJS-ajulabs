'use client'

import { useState } from 'react'
import styles from '../../../styles/contribuiForm.module.css'

type Entrada = {
  tipo_entrada: string;
  valor: number;
  data: string;
  name: string;
  tele: string;
  descricao: string;
};

export default function ContributionFormPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const entrada: Entrada = {
      tipo_entrada: formData.get('type')?.toString() || '',
      valor: parseFloat(formData.get('amount')?.toString() || '0'),
      data: new Date(formData.get('date')?.toString() || '').toISOString(),
      name: formData.get('contributorName')?.toString() || '',
      tele: formData.get('contributorContact')?.toString() || '',
      descricao: formData.get('observations')?.toString() || '',
    }
    try {
      const response = await fetch('http://localhost:3001/entrada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entrada),
      })
      if (!response.ok) {
        throw new Error('Erro ao salvar contribuição')
      }
      alert('Contribuição salva com sucesso!')
      form.reset()
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar contribuição')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nova Contribuição</h1>
        <p>Cadastre uma nova entrada no sistema</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Dados da Contribuição</h2>
          <p>Preencha os dados da contribuição recebida</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="type">Tipo de Contribuição <span className={styles.obr}>*</span></label>
              <select id="type" name="type" required className={styles.select}>
                <option value="">Selecione o tipo</option>
                <option value="dizimo">Dízimo</option>
                <option value="oferta">Oferta</option>
                <option value="campanha">Campanha</option>
                <option value="doacao">Doação</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="amount">Valor <span className={styles.obr}>*</span></label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Data <span className={styles.obr}>*</span></label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="contributorName">Nome do Contribuinte</label>
              <input
                type="text"
                id="contributorName"
                name="contributorName"
                placeholder="Nome (opcional)"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contributorContact">Contato</label>
              <input
                type="text"
                id="contributorContact"
                name="contributorContact"
                placeholder="Telefone ou email (opcional)"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="observations">Observações</label>
            <textarea
              id="observations"
              name="observations"
              placeholder="Observações adicionais (opcional)"
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.button} disabled={loading}>Cadastrar Contribuição</button>
            <button
              type="button"
              className={`${styles.button} ${styles.outline}`}
              onClick={() => document.querySelector('form')?.reset()}
            >
              Limpar
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
