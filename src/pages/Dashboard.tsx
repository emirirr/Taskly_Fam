import React, { useEffect, useState } from 'react';
import { auth, db } from '../core/firebase';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [shoppingCount, setShoppingCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    // Kullanıcının aileId'sini al
    const userRef = doc(db, 'users', user.uid);
    const unsubUser = onSnapshot(userRef, async (snap) => {
      const data = snap.data();
      if (!data) return;
      const familyId = data.familyId;

      // Görevleri say
      const tasksQ = query(
        collection(db, 'tasks'),
        where('familyId', '==', familyId)
      );
      const tasksSnap = await getDocs(tasksQ);
      setTasksCount(tasksSnap.size);

      // Alışveriş öğelerini say
      const shopQ = query(
        collection(db, 'shoppingItems'),
        where('familyId', '==', familyId)
      );
      const shopSnap = await getDocs(shopQ);
      setShoppingCount(shopSnap.size);
    });

    return () => unsubUser();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>👋 Merhaba, Hoş Geldin!</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Toplam Görev</div>
          <div className={styles.cardValue}>{tasksCount}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Alışveriş Listesi</div>
          <div className={styles.cardValue}>{shoppingCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
