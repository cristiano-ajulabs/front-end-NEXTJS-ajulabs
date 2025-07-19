"use client";

import { useState } from "react";
import styles from "../../../styles/relatorio.module.css";

export default function ReportPage() {
  const [contributor, setContributor] = useState("");
  const [year, setYear] = useState("");
  const [showreport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportdata, setReportData] = useState<any[]>([]);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  function formatarData(dataStr: string) {
    const date = new Date(dataStr);
    if (isNaN(date.getTime())) return 'Data inválida';
    return date.toLocaleDateString('pt-BR');
  }


  const handleGenerate = async () => {
    if (!contributor || !year) {
      alert("Por favor, preencha o nome do contribuinte e o ano.");
      return;
    }
    try {
      setLoading(true);
      const params = new URLSearchParams({
        nome: contributor,
        ano: year,
      });
      const res = await fetch(`http://localhost:3001/entrada/relatorio?${params.toString()}`);
      if (!res.ok) throw new Error("Erro ao buscar dados");

      const data = await res.json();
      setReportData(data);
      setShowReport(true);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerRow}>
        <h1 className={styles.title}>Gerar Relatório de Contribuições</h1>
        <p className={styles.subtitle}>
          Informe o nome do contribuinte e o ano desejado para gerar o relatório
        </p>
      </header>

      <section className={styles.filterBox}>
        <div className={styles.filterGroup}>
          <label htmlFor="contributor">Nome do Contribuinte</label>
          <input
            id="contributor"
            type="text"
            placeholder="Digite o nome"
            className={styles.input}
            value={contributor}
            onChange={(e) => setContributor(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="year">Ano</label>
          <input
            id="year"
            type="number"
            min="2000"
            max="2100"
            placeholder="Ex: 2025"
            className={styles.input}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className={styles.filterGroupButton}>
          <button className={styles.generateButton} onClick={handleGenerate}>
            Gerar Relatório
          </button>
        </div>
      </section>

      {showreport && (
        <section className={styles.reportSection}>
          {/* Cabeçalho para impressão ou apresentação formal */}
          <div className={styles.reportHeader}>
            <div>
              <h2 className={styles.orgName}>Igreja Exemplo do Bem</h2>
              <p>CNPJ: 12.345.678/0001-99</p>
              <p>Endereço: Rua das Flores, 123 - Cidade, Estado</p>
              <p>Contato: (11) 98765-4321 | contato@igrejaexemplo.com</p>
            </div>
            <h3 className={styles.reportTitleFormal}>Relatório de Contribuições</h3>
          </div>

          <h3 className={styles.reportTitle}>
            Contribuinte: <strong>{contributor}</strong> | Ano: <strong>{year}</strong>
          </h3>

          <div className={styles.containeTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {reportdata.map((item, idx) => (
                  <tr key={idx}>
                    <td>{formatarData(item.data)}</td>
                    <td>{item.tipo_entrada}</td>
                    <td>{formatCurrency(item.valor)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "bold" }}>
                    Total
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {formatCurrency(reportdata
                      .reduce((acc, cur) => acc + cur.valor, 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}