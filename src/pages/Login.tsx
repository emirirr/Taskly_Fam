// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../core/firebase';
import styles from './Login.module.css';  // ← CSS modülünü import et

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          alert('Kullanıcı bulunamadı. Lütfen önce kayıt olun.');
          break;
        case 'auth/wrong-password':
          alert('Şifre yanlış. Tekrar deneyin.');
          break;
        case 'auth/invalid-email':
          alert('Geçersiz email formatı.');
          break;
        default:
          alert('Giriş başarısız: ' + err.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>🔐 Giriş Yap</h1>
        <div className={styles.inputField}>
          <input
            type="email"
            placeholder="✉️ Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            placeholder="🔒 Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
