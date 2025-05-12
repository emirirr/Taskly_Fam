import React, { useState, useEffect } from 'react';
import { auth, db } from '../core/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import styles from './ShoppingList.module.css';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
}

const ShoppingList: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    (async () => {
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      const familyId = userSnap.data()?.familyId;
      if (!familyId) return;

      const q = query(
        collection(db, 'shoppingItems'),
        where('familyId', '==', familyId)
      );

      const unsubscribe = onSnapshot(q, snapshot => {
        const loaded: ShoppingItem[] = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data() as Omit<ShoppingItem, 'id'>
        }));
        setItems(loaded);
      });

      return () => unsubscribe();
    })();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Lütfen madde adı girin.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Kullanıcı bulunamadı.');

      const userSnap = await getDoc(doc(db, 'users', user.uid));
      const familyId = userSnap.data()?.familyId;
      if (!familyId) throw new Error('familyId bulunamadı.');

      await addDoc(collection(db, 'shoppingItems'), {
        name: name.trim(),
        quantity,
        familyId,
        addedBy: user.uid
      });

      setName('');
      setQuantity(1);
    } catch (err: any) {
      console.error('Alışveriş öğesi eklenirken hata:', err);
      alert('Hata oluştu: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'shoppingItems', id));
    } catch (err: any) {
      console.error('Silme hatası:', err);
      alert('Öğe silinirken hata: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🛒 Alışveriş Listesi</h1>

      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Madde adı"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="number"
            min={1}
            placeholder="Adet"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Ekle
        </button>
      </form>

      <div className={styles.list}>
        {items.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardTitle}>
              {item.name} × {item.quantity}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleDelete(item.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
