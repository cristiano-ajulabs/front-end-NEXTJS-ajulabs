"use client";

import { useState } from "react";
import styles from '../../../styles/saidas.module.css';


export default function ExpensesList() {
  // Estado dos filtros
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    search: "",
  });

  // Dados mock de despesas
  const expenses = [
    {
      id: "1",
      date: "2025-07-01",
      type: "aluguel",
      amount: 1200,
      beneficiary: "Igreja Local",
      description: "Pagamento do aluguel mensal",
      observations: "Pago via transferência",
    },
    {
      id: "2",
      date: "2025-07-03",
      type: "material",
      amount: 150,
      beneficiary: "Loja de papelaria",
      description: "Compra de materiais para o culto infantil",
      observations: "",
    },
  ];

  // Atualiza filtro
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filtra as despesas conforme filtros aplicados
  const filteredExpenses = expenses.filter((expense) => {
    if (filters.startDate && expense.date < filters.startDate) return false;
    if (filters.endDate && expense.date > filters.endDate) return false;
    if (filters.type && filters.type !== "" && expense.type !== filters.type)
      return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (
        !expense.beneficiary.toLowerCase().includes(search) &&
        !(expense.description?.toLowerCase().includes(search)) &&
        !(expense.observations?.toLowerCase().includes(search))
      ) {
        return false;
      }
    }
    return true;
  });

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("pt-BR");

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

  const totalAmount = filteredExpenses.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className={styles.container}>
      {/* Cabeçalho com título e botão */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Saídas</h1>
          <p className={styles.subtitle}>Listagem de todas as despesas realizadas</p>
        </div>
        <button className={styles.newButton}>Nova Despesa</button>
      </div>

      {/* Filtros */}
      <div className={styles.filterBox}>
        <div className={styles.filterGroup}>
          <label htmlFor="startDate">Data Inicial</label>
          <input
            type="date"
            id="startDate"
            className={styles.input}
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="endDate">Data Final</label>
          <input
            type="date"
            id="endDate"
            className={styles.input}
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            className={styles.input}
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
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
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
      </div>

      {/* Resumo */}
      <div className={styles.summaryBox}>
        <div className={styles.summaryInfo}>
          <span className={styles.summaryItem}>
            Total de registros: <strong>{filteredExpenses.length}</strong>
          </span>
          <span className={styles.summaryItem}>
            Valor total:{" "}
            <strong className={styles.total}>{formatCurrency(totalAmount)}</strong>
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
              {filteredExpenses.map((c) => (
                <tr key={c.id}>
                  <td>{formatDate(c.date)}</td>
                  <td>{getTypeLabel(c.type)}</td>
                  <td className={styles.amount}>{formatCurrency(c.amount)}</td>
                  <td>{c.beneficiary}</td>
                  <td>{c.description || "-"}</td>
                  <td>{c.observations || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
