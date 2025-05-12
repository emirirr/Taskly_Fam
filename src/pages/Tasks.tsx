import React, { useState, useEffect } from 'react';
import { auth, db } from '../core/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';
import styles from './Tasks.module.css';

interface Task {
  id: string;
  title: string;
  assignedTo: string;
}

const Tasks: React.FC = () => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [members, setMembers] = useState<{ uid: string; displayName: string }[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Üyeleri getir
    const userRef = doc(db, 'users', user.uid);
    const unsubUser = onSnapshot(userRef, snap => {
      const data = snap.data();
      if (!data) return;
      const familyId = data.familyId;
      // Family üyeleri
      onSnapshot(
        collection(db, 'users'),
        qSnap => {
          const all = qSnap.docs
            .map(d => ({ uid: d.id, ...(d.data() as any) }))
            .filter(u => u.familyId === familyId);
          setMembers(all);
        }
      );
      // Görevleri getir
      const tasksQ = query(collection(db, 'tasks'), where('familyId', '==', familyId));
      onSnapshot(tasksQ, snapTasks => {
        setTasks(snapTasks.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Task)));
      });
    });

    return () => unsubUser();
  }, []);

  const handleAdd = async () => {
    if (!title || !assignedTo) return;
    const user = auth.currentUser;
    if (!user) return;
    // FamilyId user datası içinden
    const userSnap = doc(db, 'users', user.uid);
    const familyId = (await userSnap.get()).data()?.familyId;
    await addDoc(collection(db, 'tasks'), { title, assignedTo, familyId });
    setTitle(''); setAssignedTo('');
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>✅ Görevler</h1>
      <div className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Görev başlığı"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <select
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
          >
            <option value="">Kime atansın?</option>
            {members.map(m => (
              <option key={m.uid} value={m.uid}>{m.displayName}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAdd} className={styles.button}>Ekle</button>
      </div>
      <div className={styles.list}>
        {tasks.map(t => (
          <div key={t.id} className={styles.card}>
            <div className={styles.cardTitle}>
              {t.title} – {members.find(m => m.uid === t.assignedTo)?.displayName}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleDelete(t.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
