'use client';

import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import styles from '../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const period = { startDate: '2025-01-01', endDate: '2025-01-31' };


  const [totalentradas, setTotalEntradas] = useState(0);
  const [totalsaidas, setTotalSaidas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState('');
  const [ofert, setOfert] = useState(0);



  const contributionsByType = [
    { type: 'aluguel', total: 2000 },
    { type: 'agua', total: 500 },
  ];

  const expensesByType = [
    { type: 'manutencao', total: 1000 },
    { type: 'material', total: 300 },
  ];


  useEffect(() => {
    async function fetchTotals() {
      try {
        const resEntradas = await fetch('http://localhost:3001/entrada/total');
        const entradas = await resEntradas.json();

        const resSaidas = await fetch('http://localhost:3001/saida/total');
        const saidas = await resSaidas.json();

        setTotalEntradas(entradas);
        setTotalSaidas(saidas);
      } catch (error) {
        console.error('Erro ao buscar totais', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTotals();
  }, []);


  const saldo = totalentradas - totalsaidas;

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    if (loading) return <p>Carregando dados...</p>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.period}>
          Período: {new Date(period.startDate).toLocaleDateString('pt-BR')} -{' '}
          {new Date(period.endDate).toLocaleDateString('pt-BR')}
        </p>
      </header>

      {/* Cards resumo */}
      <section className={styles.cards}>
        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Total de Entradas</h2>
            <ArrowDownCircle className={styles.iconGreen} />
          </header>
          <p className={`${styles.cardValue} ${styles.cardValueGreen}`}>
            {formatCurrency(totalentradas)}
          </p>
        </article>

        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Total de Saídas</h2>
            <ArrowUpCircle className={styles.iconRed} />
          </header>
          <p className={`${styles.cardValue} ${styles.cardValueRed}`}>
            {formatCurrency(totalsaidas)}
          </p>
        </article>

        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Saldo</h2>
            <DollarSign
              className={
                saldo >= 0 ? styles.iconGreen : styles.iconRed
              }
            />
          </header>
          <p
            className={`${styles.cardValue} ${
              saldo >= 0
                ? styles.cardValueGreen
                : styles.cardValueRed
            }`}
          >
            {formatCurrency(saldo)}
          </p>
        </article>
      </section>

      {/* Gráficos */}
      <section className={styles.charts}>
        <article className={styles.chartCard}>
          <header>
            <h3>Contribuições por Tipo</h3>
            <p>Distribuição das entradas por categoria</p>
          </header>
          <div className={styles.chartPlaceholder}>[Gráfico de pizza aqui]</div>
        </article>

        <article className={styles.chartCard}>
          <header>
            <h3>Despesas por Tipo</h3>
            <p>Distribuição das saídas por categoria</p>
          </header>
          <div className={styles.chartPlaceholder}>[Gráfico de barras aqui]</div>
        </article>
      </section>

      {/* Resumo detalhado */}
      <section className={styles.summarySection}>
        <article className={styles.summaryCard}>
          <header>
            <h3>Resumo de Contribuições</h3>
          </header>
          <div className={styles.summaryList}>
            {contributionsByType.map((item) => (
              <div key={item.type} className={styles.summaryItem}>
                <span>{item.type.replace('_', ' ')}</span>
                <span>{formatCurrency(item.total)}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.summaryCard}>
          <header>
            <h3>Resumo de Despesas</h3>
          </header>
          <div className={styles.summaryList}>
            {expensesByType.map((item) => (
              <div key={item.type} className={styles.summaryItem}>
                <span>{item.type.replace('_', ' ')}</span>
                <span>{formatCurrency(item.total)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
