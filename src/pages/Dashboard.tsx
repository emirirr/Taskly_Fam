import React, { useEffect, useState } from 'react';
import { auth, db } from '../core/firebase';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getCountFromServer
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [shoppingCount, setShoppingCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/');
        return;
      }
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      const familyId = userSnap.data()?.familyId;
      if (!familyId) {
        navigate('/');
        return;
      }

      const tasksQ = query(collection(db, 'tasks'), where('familyId', '==', familyId));
      const tasksSnapshot = await getCountFromServer(tasksQ);
      setTasksCount(tasksSnapshot.data().count);

      const shoppingQ = query(collection(db, 'shoppingItems'), where('familyId', '==', familyId));
      const shoppingSnapshot = await getCountFromServer(shoppingQ);
      setShoppingCount(shoppingSnapshot.data().count);
    };

    fetchCounts();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>👋 Hoş Geldin!</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Toplam Görev</div>
          <div className={styles.cardValue}>{tasksCount}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Alışveriş Kalemi</div>
          <div className={styles.cardValue}>{shoppingCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
