import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../core/firebase'
import styles from './Register.module.css'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      alert('Lütfen tüm alanları doldurun.')
      return
    }

    try {
      console.log('1) Kayıt: createUserWithEmailAndPassword çağrılıyor…')
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )
      console.log('✔️ Kullanıcı oluşturuldu:', userCred.user.uid)

      console.log('2) Aile dokümanı oluşturuluyor…')
      const familyRef = await addDoc(collection(db, 'families'), {
        name: `${name.trim()} Ailesi`,
        members: [userCred.user.uid],
      })
      console.log('✔️ Aile oluşturuldu, ID:', familyRef.id)

      console.log('3) Kullanıcı profili setDoc ile kaydediliyor…')
      await setDoc(
        doc(db, 'users', userCred.user.uid),
        {
          displayName: name.trim(),
          role: 'parent',
          familyId: familyRef.id,
        },
        { merge: true }
      )
      console.log('✔️ User dokümanı güncellendi (merge: true)')

      navigate('/members')
    } catch (err: any) {
      console.error('🚨 Register HATASI:', err)
      switch (err.code) {
        case 'auth/email-already-in-use':
          alert('Bu e-posta zaten kayıtlı. Lütfen giriş yapın.')
          navigate('/')
          break
        case 'auth/weak-password':
          alert('Şifre çok zayıf. En az 6 karakter girin.')
          break
        case 'auth/invalid-email':
          alert('Geçersiz e-posta formatı.')
          break
        default:
          alert('Kayıt başarısız: ' + err.message)
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>👋 Aile Kaydı</h1>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="👩‍👦 Ad Soyad"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
          Kayıt Ol
        </button>
      </form>
    </div>
  )
}

export default Register
