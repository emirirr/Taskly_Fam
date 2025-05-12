// src/pages/Dashboard.tsx
import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  // TODO: Bu değerleri Firestore’dan çekeceğiz
  const pendingTasks = 3;
  const completedTasks = 7;
  const shoppingItems = 5;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Genel Bakış</h1>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Bekleyen Görevler</div>
          <div className={styles.cardValue}>{pendingTasks}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Tamamlanan Görevler</div>
          <div className={styles.cardValue}>{completedTasks}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Alışveriş Öğeleri</div>
          <div className={styles.cardValue}>{shoppingItems}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
