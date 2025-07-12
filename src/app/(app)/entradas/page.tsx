'use client';
import styles from '../../../styles/entradas.module.css';
import { useEffect, useState } from 'react';

type Entrada = {
  id: number;
  tipo_entrada: string;
  valor: number;
  data: string;
  name: string;
  tele: string;
  descricao: string;
};

export default function ContributionsListSimple() {
  const [contributions, setContributions] = useState<Entrada[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/entrada')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContributions(data);
        } else {
          console.error('Dados inesperados:', data);
          setContributions([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar entradas:', err);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('pt-BR');
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      dizimo: 'Dízimo',
      oferta: 'Oferta',
      campanha: 'Campanha',
      doacao: 'Doação',
      outros: 'Outros',
      venda: 'Venda',
    };
    return map[type] || type;
  };

  const totalAmount = contributions.reduce((sum, c) => sum + c.valor, 0);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando entradas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Entradas</h1>
        <p className={styles.subtitle}>Listagem de todas as contribuições recebidas</p>
      </div>

      {/* Filtros - aqui ainda sem lógica */}
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
              <option value="venda">Venda</option>
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
                  <td>{formatDate(c.data)}</td>
                  <td>{getTypeLabel(c.tipo_entrada)}</td>
                  <td className={styles.amount}>{formatCurrency(c.valor)}</td>
                  <td>{c.name || '-'}</td>
                  <td>{c.tele || '-'}</td>
                  <td>{c.descricao || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
