"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../../../styles/saidas.module.css';
import { Divide, ToolCase } from "lucide-react";

type Saida = {
  id: number;
  data: string;
  tipo: string;
  valor: number;
  beneficiario: string;
  descricao: string;
  observacao: string;
};


export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Saida[]>([]);
  const [loading, setLoading] = useState (true);
  const [datainicial, setDataInicial] = useState('');
  const [ datafinal, setDataFinal] = useState('');
  const [tiposelecionado, setTipoSelecionado] = useState('');
  const [buscatexto, setBuscaTexto] = useState('');
  const router = useRouter();

  function handleClick() {
    router.push('/debitar')
  }

useEffect(() => {
  fetch('http://localhost:3001/saida')
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error('Dados inesperados:', data);
        setExpenses([])
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error('Erro ao buscar saidas:', err);
      setLoading(false);
    });
}, []);



  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString("pt-BR");
  }

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      aluguel: "Aluguel",
      agua: "Água",
      luz: "Luz",
      telefone: "Telefone",
      internet: "Internet",
      manutencao: "Manutenção",
      material: "Material",
      evento: "Evento",
      missoes: "Missões",
      ajuda_humanitaria: "Ajuda Humanitária",
      outros: "Outros",
    };
    return map[type] || type;
  };

  const dadosFiltrados = expenses.filter((c) => {
    const data = new Date(c.data);
    const inicial = datainicial ? new Date(datainicial) : null;
    const final = datafinal ? new Date(datafinal) : null;

    const dentroDoPeriodo =
    (!inicial || data >= inicial) &&
    (!final || data <= final);

    const tipoOk = !tiposelecionado || c.tipo === tiposelecionado;

    const buscaOk = !buscatexto || (
      c.beneficiario?.toLowerCase().includes(buscatexto.toLowerCase()) ||
      c.descricao?.toLowerCase().includes(buscatexto.toLowerCase())
    );

    return dentroDoPeriodo && tipoOk && buscaOk
  })

  const totalAmount = expenses.reduce((sum, c) => sum + c.valor, 0);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando saidas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho com título e botão */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Saídas</h1>
          <p className={styles.subtitle}>Listagem de todas as despesas realizadas</p>
        </div>
        <button 
        className={styles.newButton}
        onClick={handleClick}
        >Nova Despesa</button>
      </div>

      {/* Filtros */}
      <div className={styles.filterBox}>
        <div className={styles.filterGroup}>
          <label htmlFor="startDate">Data Inicial</label>
          <input
            type="date"
            id="startDate"
            className={styles.input}
            value={datainicial}
            onChange={(e) => setDataInicial((e.target.value))}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="endDate">Data Final</label>
          <input
            type="date"
            id="endDate"
            className={styles.input}
            value={datafinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            className={styles.input}
            value={tiposelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="aluguel">Aluguel</option>
            <option value="agua">Água</option>
            <option value="luz">Luz</option>
            <option value="telefone">Telefone</option>
            <option value="internet">Internet</option>
            <option value="manutencao">Manutenção</option>
            <option value="material">Material</option>
            <option value="evento">Evento</option>
            <option value="missoes">Missões</option>
            <option value="ajuda_humanitaria">Ajuda Humanitária</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="search">Buscar</label>
          <input
            type="text"
            id="search"
            placeholder="Beneficiário ou descrição"
            className={styles.input}
            value={buscatexto}
            onChange={(e) => setBuscaTexto(e.target.value)}
          />
        </div>
      </div>

      {/* Resumo */}
      <div className={styles.summaryBox}>
        <div className={styles.summaryInfo}>
          <span className={styles.summaryItem}>
            Total de registros: <strong>{dadosFiltrados.length}</strong>
          </span>
          <span className={styles.summaryItem}>
            Valor total:{" "}
            <strong className={styles.total}>{formatCurrency(
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
                <th>Beneficiário</th>
                <th>Descrição</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>{formatDate(c.data)}</td>
                  <td>{getTypeLabel(c.tipo)}</td>
                  <td className={styles.amount}>{formatCurrency(c.valor)}</td>
                  <td>{c.beneficiario || '-'}</td>
                  <td>{c.descricao || "-"}</td>
                  <td>{c.observacao || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
