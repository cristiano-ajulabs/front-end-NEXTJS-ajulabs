'use client';

import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import styles from '../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const period = { startDate: '2025-01-01', endDate: '2025-01-31' };


  const [totalentradas, setTotalEntradas] = useState(0);
  const [totalsaidas, setTotalSaidas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [entradasportipo, setEntradasPorTipo] = useState<any[]>([]);
  const [saidasportipo, setSaidasPorTipo] = useState<any[]>([]);




  useEffect(() => {
    async function fetchTotals() {
      try {
        const resEntradas = await fetch('http://localhost:3001/entrada/total');
        const entradas = await resEntradas.json();

        const resSaidas = await fetch('http://localhost:3001/saida/total');
        const saidas = await resSaidas.json();

        const resumoEn = await fetch('http://localhost:3001/entrada/resumo');
        const EntradasRes = await resumoEn.json();

        const resumoSai = await fetch('http://localhost:3001/saida/resumo');
        const SaidasRes = await resumoSai.json();

        setTotalEntradas(entradas);
        setTotalSaidas(saidas);
        setEntradasPorTipo(EntradasRes);
        setSaidasPorTipo(SaidasRes);
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
            {entradasportipo.map((item) => (
              <div key={item.tipo} className={styles.summaryItem}>
                <span>{item.tipo.replace('_', ' ')}</span>
                <span>{formatCurrency(Number(item.total))}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.summaryCard}>
          <header>
            <h3>Resumo de Despesas</h3>
          </header>
          <div className={styles.summaryList}>
            {saidasportipo.map((item) => (
              <div key={item.tipo} className={styles.summaryItem}>
                <span>{item.tipo.replace('_', ' ')}</span>
                <span>{formatCurrency(Number(item.total))}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
