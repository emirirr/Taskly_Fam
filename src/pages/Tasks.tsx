import React, { useState, useEffect } from 'react'
import { auth, db } from '../core/firebase'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore'
import styles from './Tasks.module.css'

interface Task {
  id: string
  title: string
  assignedTo: string
  createdBy: string
  status: string
}

interface Member {
  uid: string
  displayName: string
}

const Tasks: React.FC = () => {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser
      if (!user) return
      const userSnap = await getDoc(doc(db, 'users', user.uid))
      const familyId = userSnap.data()?.familyId
      if (!familyId) return

      onSnapshot(collection(db, 'users'), snap => {
        const all = snap.docs
          .map(d => ({ uid: d.id, ...(d.data() as any) }))
          .filter(u => u.familyId === familyId)
        setMembers(all)
      })

      const tasksQ = query(collection(db, 'tasks'), where('familyId', '==', familyId))
      onSnapshot(tasksQ, snap => {
        setTasks(
          snap.docs.map(d => ({
            id: d.id,
            ...(d.data() as any)
          })) as Task[]
        )
      })
    }
    load()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handleAdd çalıştı — title:', title, 'assignedTo:', assignedTo)

    if (!title.trim()) {
      alert('Lütfen önce görev başlığı gir.')
      return
    }
    if (!assignedTo) {
      alert('Lütfen görev atayacağın üyeyi seç.')
      return
    }

    try {
      const user = auth.currentUser!
      console.log('currentUser.uid:', user.uid)
      const userSnap = await getDoc(doc(db, 'users', user.uid))
      const familyId = userSnap.data()?.familyId
      console.log('familyId:', familyId)
      if (!familyId) throw new Error('FamilyId bulunamadı.')

      const docRef = await addDoc(collection(db, 'tasks'), {
        title: title.trim(),
        assignedTo,
        familyId,
        createdBy: user.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      })
      console.log('Yeni görev eklendi, id:', docRef.id)

      setTitle('')
      setAssignedTo('')
    } catch (err: any) {
      console.error('Görev eklenirken hata:', err)
      alert('Görev eklenirken bir hata oluştu: ' + err.message)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>✅ Görevler</h1>
      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Görev başlığı"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
            <option value="">Kime atansın?</option>
            {members.map(m => (
              <option key={m.uid} value={m.uid}>
                {m.displayName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Ekle
        </button>
      </form>

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
  )
}

export default Tasks
