// src/pages/Children.tsx
import React, { useState, useEffect } from 'react'
import { auth, db } from '../core/firebase'
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'

interface Child {
  uid: string
  displayName: string
  gender?: string
}

const Children: React.FC = () => {
  const [childName, setChildName] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [children, setChildren] = useState<Child[]>([])

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    // Aile bilgisini çek
    const unsubUser = onSnapshot(doc(db, 'users', user.uid), snap => {
      const data = snap.data()
      if (!data) return

      const familyId = data.familyId
      // Bu ailenin tüm üyelerini dinle
      const familyUnsub = onSnapshot(doc(db, 'families', familyId), famSnap => {
        const fam = famSnap.data()
        if (!fam) return
        const memberIds: string[] = fam.members

        // Çocuk uid'lerini filtrele ve bilgilerini getir
        Promise.all(memberIds.map(async uid => {
          const userSnap = await doc(db, 'users', uid).get()
          const usr = (await userSnap).data()
          return { uid, displayName: usr?.displayName, gender: usr?.gender }
        })).then(list => setChildren(list as Child[]))
      })

      return () => familyUnsub()
    })

    return () => unsubUser()
  }, [])

  const handleAddChild = async () => {
    const user = auth.currentUser!
    const userSnap = await (await doc(db, 'users', user.uid).get()).data()
    const familyId = userSnap.familyId

    // 1. Yeni çocuk kullanıcısı oluştur
    const childCred = await addDoc(collection(db, 'users'), {
      displayName: childName,
      role: 'child',
      gender,
      familyId
    })

    // 2. Family.members dizisine çocuğun uid’sini ekle
    await updateDoc(doc(db, 'families', familyId), {
      members: [...userSnap.members, childCred.id]
    })

    setChildName('')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aile Üyelerini Yönet</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Çocuk adı"
          value={childName}
          onChange={e => setChildName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <select
          value={gender}
          onChange={e => setGender(e.target.value as any)}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="male">Erkek</option>
          <option value="female">Kız</option>
        </select>
        <button
          onClick={handleAddChild}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Çocuk Ekle
        </button>
      </div>

      <ul>
        {children.map(c => (
          <li key={c.uid} className="mb-2">
            {c.displayName} ({c.gender})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Children
