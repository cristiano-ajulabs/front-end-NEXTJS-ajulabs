'use client';
import styles from '../../../styles/entradas.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [datainicial, setDataInicial] = useState('');
  const [datafinal, setDataFinal] = useState('');
  const [tiposelecionado, setTipoSelecionado] = useState('');
  const [buscatexto, setBuscaTexto] = useState('');
  const router = useRouter();

  function handleClick() {
    router.push('/contribuir')
  }

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

  const dadosFiltrados = contributions.filter((c) => {
    const data = new Date(c.data);
    const inicial = datainicial ? new Date(datainicial) : null;
    const final = datafinal ? new Date(datafinal) : null;

    const dentroDoPeriodo =
      (!inicial || data >= inicial) &&
      (!final || data <= final);

    const tipoOk = !tiposelecionado || c.tipo_entrada === tiposelecionado;

    const buscaOk = !buscatexto || (
      c.name?.toLowerCase().includes(buscatexto.toLowerCase()) ||
      c.descricao?.toLowerCase().includes(buscatexto.toLowerCase())
    );

    return dentroDoPeriodo && tipoOk && buscaOk
  })
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
        <div>
          <h1 className={styles.title}>Entradas</h1>
          <p className={styles.subtitle}>Listagem de todas as contribuições recebidas</p>
        </div>
        <button 
        className={styles.newButton}
        onClick={handleClick}
        >Nova Despesa</button>
      </div>

      {/* Filtros - aqui ainda sem lógica */}
      <div className={styles.filtersBox}>
        <h3 className={styles.filtersTitle}>Filtros</h3>
        <div className={styles.filtersGrid}>
          <div>
            <label className={styles.label}>Data Inicial</label>
            <input
              type="date"
              className={styles.input}
              value={datainicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Data Final</label>
            <input
              type="date"
              className={styles.input}
              value={datafinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Tipo</label>
            <select
              className={styles.input}
              value={tiposelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
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
            <input
              type="text"
              placeholder="Nome ou observações"
              className={styles.input}
              value={buscatexto}
              onChange={(e) => setBuscaTexto(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className={styles.summaryBox}>
        <div className={styles.summaryInfo}>
          <span className={styles.summaryItem}>
            Total de registros: <strong>{dadosFiltrados.length}</strong>
          </span>
          <span className={styles.summaryItem}>
            Valor total: <strong className={styles.total}>{formatCurrency(
              dadosFiltrados.reduce((sum, c) => sum + c.valor, 0)
            )}</strong>
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
              {dadosFiltrados.map((c) => (
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
