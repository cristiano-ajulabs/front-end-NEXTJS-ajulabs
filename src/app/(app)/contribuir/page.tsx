'use client'

import styles from '../../../styles/contribuiForm.module.css'

export default function ContributionFormPage() {
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

        <form className={styles.form}>
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
            <button type="submit" className={styles.button}>Cadastrar Contribuição</button>
            <button type="button" className={`${styles.button} ${styles.outline}`}>Limpar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
