# Taskly Family

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%7C%20Auth-orange.svg)](https://firebase.google.com/) [![React](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-3.0-brightgreen.svg)](https://vitejs.dev/)

> Aile içi ortak görev ve alışveriş listesini gerçek zamanlı olarak yönetmeyi sağlayan React + Firebase uygulaması.

---

## 📖 İçindekiler

- [🔍 Özellikler](#-özellikler)  
- [🛠️ Teknoloji Yığını](#️-teknoloji-yığını)  
- [🚀 Kurulum & Çalıştırma](#-kurulum--çalıştırma)  
- [⚙️ Yapılandırma](#️-yapılandırma)  
- [📂 Klasör Yapısı](#-klasör-yapısı)  
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)  
- [📄 Lisans](#-lisans)  

---

## 🔍 Özellikler

- **Kayıt & Giriş**  
  - Email/Şifre doğrulamalı kullanıcı yönetimi (Firebase Auth)  
- **Dashboard**  
  - Toplam görev ve alışveriş maddesi sayısını özet widget’larıyla gösterim  
- **Görev Yönetimi**  
  - Aile üyelerine görev oluşturma, atama, listeleme, silme  
- **Alışveriş Listesi**  
  - Çocuklar alışveriş maddesi ekleyebilir; ebeveynler yönetebilir  
- **Aile Üyeleri**  
  - Çocuk profili ekleme, silme; rol ve cinsiyet atama  
- **Profil & Çıkış**  
  - Kullanıcı adı güncelleme ve oturumu sonlandırma  
- **Korunan Rotalar**  
  - Giriş yapılmamış kullanıcıları otomatik login sayfasına yönlendirme  
- **Gerçek Zamanlı Senkronizasyon**  
  - Firestore onSnapshot ile anlık güncellemeler  

---

## 🛠️ Teknoloji Yığını

- **Frontend**  
  - React 18 + Vite  
  - TypeScript  
  - CSS Modules & Tailwind CSS  
  - React Router DOM  
- **Backend / BaaS**  
  - Firebase Authentication  
  - Cloud Firestore  
- **Araçlar**  
  - PostCSS + Autoprefixer  
  - ESlint + Prettier (isteğe bağlı)  

---

## 🚀 Kurulum & Çalıştırma

1. **Depoyu klonlayın**  
   ```bash
   git clone https://github.com/your-username/taskly-family.git
   cd taskly-family
