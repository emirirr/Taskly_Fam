import React, { useState, useEffect } from 'react'
import { auth, db } from '../core/firebase'
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  getDoc,
  DocumentData
} from 'firebase/firestore'
import styles from './Children.module.css'

interface Member {
  uid: string
  displayName: string
  role: 'parent' | 'child'
  gender?: 'male' | 'female'
}

const Children: React.FC = () => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    const unsubUser = onSnapshot(userRef, async userSnap => {
      const userData = userSnap.data() as DocumentData
      if (!userData) return
      const familyId = userData.familyId as string

      const famRef = doc(db, 'families', familyId)
      const unsubFam = onSnapshot(famRef, async famSnap => {
        const famData = famSnap.data() as DocumentData
        if (!famData) return
        const uids: string[] = famData.members

        const loaded: Member[] = await Promise.all(
          uids.map(async uid => {
            const uSnap = await getDoc(doc(db, 'users', uid))
            const uData = uSnap.data() as any
            return {
              uid,
              displayName: uData.displayName,
              role: uData.role,
              gender: uData.gender
            }
          })
        )
        setMembers(loaded)
      })

      return () => unsubFam()
    })

    return () => unsubUser()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handleAddChild çalıştı — name:', name, 'gender:', gender)

    const trimmed = name.trim()
    if (!trimmed) {
      alert('Lütfen bir isim girin.')
      return
    }
    const user = auth.currentUser!
    console.log('currentUser.uid:', user.uid)
    const userSnap = await getDoc(doc(db, 'users', user.uid))
    const familyId = (userSnap.data() as any).familyId as string
    console.log('familyId:', familyId)

    const newUserRef = await addDoc(collection(db, 'users'), {
      displayName: trimmed,
      role: 'child',
      gender,
      familyId
    })
    console.log('Yeni child eklendi, uid:', newUserRef.id)

    const famRef = doc(db, 'families', familyId)
    const currentMembers = (userSnap.data() as any).members as string[]
    await updateDoc(famRef, {
      members: [...currentMembers, newUserRef.id]
    })
    console.log('Family.members güncellendi.')

    setName('')
  }

  const handleRemove = async (uid: string) => {
    const user = auth.currentUser!
    const userSnap = await getDoc(doc(db, 'users', user.uid))
    const familyId = (userSnap.data() as any).familyId as string
    const famRef = doc(db, 'families', familyId)
    const current = (userSnap.data() as any).members as string[]
    await updateDoc(famRef, {
      members: current.filter(id => id !== uid)
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🧑‍🤝‍🧑 Aile Üyeleri</h1>
      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Çocuk adı"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.selectField}>
          <select value={gender} onChange={e => setGender(e.target.value as any)}>
            <option value="male">Erkek</option>
            <option value="female">Kız</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Ekle
        </button>
      </form>

      <div className={styles.list}>
        {members.map(m => (
          <div key={m.uid} className={styles.card}>
            <div className={styles.cardInfo}>
              <div className={styles.cardName}>{m.displayName}</div>
              <div className={styles.cardRole}>
                {m.role === 'parent'
                  ? 'Ebeveyn'
                  : m.gender === 'male'
                  ? 'Oğul'
                  : 'Kız'}
              </div>
            </div>
            {m.role === 'child' && (
              <div className={styles.cardActions}>
                <button onClick={() => handleRemove(m.uid)}>🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Children
