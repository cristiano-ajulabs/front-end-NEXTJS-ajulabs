'use client'

import { useState } from 'react'
import styles from '../../../styles/contribuiForm.module.css'

type Saida = {
  data: string;
  tipo: string;
  valor: number;
  beneficiario: string;
  descricao: string;
  observacao: string;
};

export default function ExpensesFormPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const saida: Saida = {
      data: new Date(formData.get('date')?.toString() || '').toISOString(),
      tipo: formData.get('type')?.toString() || '',
      valor: parseFloat(formData.get('amount')?.toString() || '0'),
      beneficiario: formData.get('beneficiario')?.toString() || '',
      descricao: formData.get('descricao')?.toString() || '',
      observacao: formData.get('observacao')?.toString() || '',
    }
    try {
      const response = await fetch('http://localhost:3001/saida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saida),
      })
      if (!response.ok) {
        throw new Error('Erro ao salvar despesa')
      }
      alert('Despesa salva com sucesso!')
      form.reset()
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar despesa')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nova Despesa</h1>
        <p>Cadastre uma nova despesa no sistema</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Dados da Despesa</h2>
          <p>Preencha os dados da despesa a ser debitada</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="type">Tipo de Débito <span className={styles.obr}>*</span></label>
              <select id="type" name="type" required className={styles.select}>
                <option value="">Selecione o tipo</option>
                <option value="dizimo">Cartão de Crédito</option>
                <option value="oferta">Pix</option>
                <option value="campanha">Dinheiro</option>
                <option value="doacao">Transferencia</option>
                <option value="doacao">Boleto</option>
                <option value="doacao">Empréstimos</option>
                <option value="doacao">Oferta</option>
                <option value="doacao">Estorno</option>
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
              <label htmlFor="contributorName">Nome do Beneficiário</label>
              <input
                type="text"
                id="contributorName"
                name="beneficiario"
                placeholder="Nome (opcional)"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contributorContact">Contato</label>
              <input
                type="text"
                id="contributorContact"
                name="descricao"
                placeholder="Telefone ou email (opcional)"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="observations">Observações</label>
            <textarea
              id="observations"
              name="observacao"
              placeholder="Observações adicionais (opcional)"
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.button} disabled={loading}>Cadastrar Débito</button>
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
