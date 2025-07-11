import styles from '../../../styles/entradas.module.css';

export default function ContributionsListSimple() {
  const contributions = [
    {
      id: '1',
      date: '2025-07-01',
      type: 'dizimo',
      amount: 100,
      contributorName: 'João Silva',
      contributorContact: 'joao@email.com',
      observations: 'Pagamento em dinheiro'
    },
    {
      id: '2',
      date: '2025-07-03',
      type: 'oferta',
      amount: 50,
      contributorName: 'Maria Souza',
      contributorContact: 'maria@exemplo.com',
      observations: ''
    }
  ];

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('pt-BR');
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      dizimo: 'Dízimo',
      oferta: 'Oferta',
      campanha: 'Campanha',
      doacao: 'Doação',
      outros: 'Outros'
    };
    return map[type] || type;
  };

  const totalAmount = contributions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Entradas</h1>
        <p className={styles.subtitle}>Listagem de todas as contribuições recebidas</p>
      </div>

      {/* Filtros */}
      <div className={styles.filtersBox}>
        <h3 className={styles.filtersTitle}>Filtros</h3>
        <div className={styles.filtersGrid}>
          <div>
            <label className={styles.label}>Data Inicial</label>
            <input type="date" className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Data Final</label>
            <input type="date" className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Tipo</label>
            <select className={styles.input}>
              <option value="">Todos os tipos</option>
              <option value="dizimo">Dízimo</option>
              <option value="oferta">Oferta</option>
              <option value="campanha">Campanha</option>
              <option value="doacao">Doação</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Buscar</label>
            <input type="text" placeholder="Nome ou observações" className={styles.input} />
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className={styles.summaryBox}>
        <div className={styles.summaryInfo}>
          <span className={styles.summaryItem}>
            Total de registros: <strong>{contributions.length}</strong>
          </span>
          <span className={styles.summaryItem}>
            Valor total: <strong className={styles.total}>{formatCurrency(totalAmount)}</strong>
          </span>
        </div>
        <button className={styles.exportButton}>Exportar CSV</button>
      </div>

      {/* Tabela */}
      <div className={styles.tableBox}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Contribuinte</th>
                <th>Contato</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr key={c.id}>
                  <td>{formatDate(c.date)}</td>
                  <td>{getTypeLabel(c.type)}</td>
                  <td className={styles.amount}>{formatCurrency(c.amount)}</td>
                  <td>{c.contributorName}</td>
                  <td>{c.contributorContact || '-'}</td>
                  <td>{c.observations || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
