"use client";

import { useState, useRef } from "react";
import styles from "../../../styles/contracheque.module.css";
import jsPDF from "jspdf";

type Contribution = {
  date: string;
  type: string;
  amount: number;
};

export default function ContraChequePage() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [totalToPay, setTotalToPay] = useState(0);

  const reportRef = useRef<HTMLDivElement>(null);

  // Dados simulados (substitua pela sua API)
  const mockContributions: Contribution[] = [
    { date: "2025-06-05", type: "dizimo", amount: 1000 },
    { date: "2025-06-10", type: "oferta", amount: 300 },
    { date: "2025-06-15", type: "congregacao", amount: 200 },
    { date: "2025-06-20", type: "campanha", amount: 100 }, // Não conta
    { date: "2025-07-01", type: "dizimo", amount: 800 },
    { date: "2025-07-12", type: "oferta", amount: 500 },
    { date: "2025-07-18", type: "congregacao", amount: 100 },
  ];

  const handleGenerate = () => {
    if (!month || !year) {
      alert("Por favor, selecione o mês e o ano.");
      return;
    }

    const filtered = mockContributions.filter((c) => {
      const date = new Date(c.date);
      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() + 1 === Number(month) &&
        ["dizimo", "oferta", "congregacao"].includes(c.type)
      );
    });

    const sum = filtered.reduce((acc, cur) => acc + cur.amount, 0);
    setTotalToPay(sum * 0.7);
    setShowReport(true);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const exportPDF = () => {
    if (!reportRef.current) return;

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    doc.html(reportRef.current, {
      callback: () => {
        doc.save(`contracheque_pastor_${year}-${month}.pdf`);
      },
      x: 20,
      y: 20,
      html2canvas: { scale: 0.8 },
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerRow}>
        <h1 className={styles.title}>Contracheque do Pastor</h1>
        <p className={styles.subtitle}>
          Selecione o mês e o ano para gerar o contracheque (70% dos dízimos,
          ofertas e congregações).
        </p>
      </header>

      <section className={styles.filterBox}>
        <div className={styles.filterGroup}>
          <label htmlFor="month">Mês</label>
          <select
            id="month"
            className={styles.select}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Selecione o mês</option>
            {[...Array(12)].map((_, i) => {
              const val = (i + 1).toString().padStart(2, "0");
              return (
                <option key={val} value={val}>
                  {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                </option>
              );
            })}
          </select>
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
            Gerar Contracheque
          </button>
        </div>
      </section>

      {showReport && (
        <section className={styles.reportSection}>
          <div ref={reportRef} className={styles.reportBox}>
            <div className={styles.reportHeader}>
              <div>
                <h2 className={styles.orgName}>Igreja Exemplo</h2>
                <p>Rua da Fé, 123 - Cidade - Estado</p>
                <p>CNPJ: 00.000.000/0000-00</p>
              </div>
              <div>
                <h3 className={styles.reportTitleFormal}>Contracheque do Pastor</h3>
                <p>
                  Período:{" "}
                  <strong>
                    {new Date(Number(year), Number(month) - 1).toLocaleString(
                      "pt-BR",
                      { month: "long", year: "numeric" }
                    )}
                  </strong>
                </p>
              </div>
            </div>

            <div className={styles.paymentBox}>
              Valor total a pagar (70%):{" "}
              <span className={styles.paymentValue}>{formatCurrency(totalToPay)}</span>
            </div>

            <div className={styles.footerText}>
              Este documento comprova o pagamento referente às contribuições do
              mês selecionado.
            </div>
          </div>

          <button
            onClick={exportPDF}
            className={styles.exportButton}
            aria-label="Exportar contracheque em PDF"
          >
            Exportar PDF
          </button>
        </section>
      )}
    </div>
  );
}
