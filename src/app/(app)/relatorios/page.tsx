"use client";

import { useState } from "react";
import styles from "../../../styles/relatorio.module.css";

export default function ReportPage() {
  const [contributor, setContributor] = useState("");
  const [year, setYear] = useState("");
  const [showReport, setShowReport] = useState(false);

  // Simula dados do relatório (você poderá substituir por dados reais da API)
  const mockReportData = [
    { date: "2025-01-15", type: "Dízimo", amount: 150 },
    { date: "2025-03-10", type: "Oferta", amount: 100 },
    { date: "2025-07-22", type: "Campanha", amount: 200 },
  ];

  const handleGenerate = () => {
    if (contributor && year) {
      setShowReport(true);
    } else {
      alert("Por favor, preencha o nome do contribuinte e o ano.");
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

      {showReport && (
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

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {mockReportData.map((item, idx) => (
                <tr key={idx}>
                  <td>{new Date(item.date).toLocaleDateString("pt-BR")}</td>
                  <td>{item.type}</td>
                  <td>{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} style={{ fontWeight: "bold" }}>
                  Total
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {mockReportData
                    .reduce((acc, cur) => acc + cur.amount, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      )}
    </div>
  );
}
