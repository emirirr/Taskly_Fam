import React, { useState, useEffect } from 'react';
import { auth, db } from '../core/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updateProfile, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (!user) return navigate('/');
      setEmail(user.email || '');
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      const data = userSnap.data();
      setName(data?.displayName || '');
    };
    loadUser();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    await updateProfile(user, { displayName: name });
    await updateDoc(doc(db, 'users', user.uid), { displayName: name });
    alert('Profil başarıyla güncellendi!');
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🙍 Profil</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <div className="inputField">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="email"
            placeholder="Email"
            value={email}
            readOnly
          />
        </div>
        <button type="submit" className={styles.button}>
          Kaydet
        </button>
      </form>
      <button onClick={handleLogout} className={`${styles.button} ${styles.logout}`}>
        Çıkış Yap
      </button>
    </div>
  );
};

export default Profile;
