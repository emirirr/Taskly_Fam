# Taskly Family

> Aile içi ortak görev ve alışveriş listesini kolayca yönetmenizi sağlayan React & Firebase uygulaması.

---

## 📋 Açıklama

**Taskly Family**, anne, baba ve çocukların ortak bir alanda görevleri paylaşabildiği, çocukların eksik kırtasiye ve alışveriş ihtiyaçlarını listeleyebildiği, aile üyelerini ekleyip yönetebildiğiniz bir web uygulamasıdır.  
Firebase Authentication ile güvenli giriş/çıkış, Firestore ile gerçek zamanlı veri senkronizasyonu sunar.

---

## ✨ Özellikler

- **Kayıt & Giriş**  
  - Email/şifre tabanlı kayıt ve giriş (Firebase Auth)  
- **Dashboard**  
  - Toplam görev ve alışveriş kalemi sayılarının özet gösterimi  
- **Görev Yönetimi**  
  - Aile üyelerine görev atama, listeleme, silme  
- **Alışveriş Listesi**  
  - Çocuklar alışveriş maddesi ekleyebilir; ebeveynler yönetebilir  
- **Aile Üyeleri**  
  - Yeni çocuk profilleri ekleyip silebilirsiniz  
- **Profil**  
  - Kullanıcı adı güncelleme, çıkış yapma  
- **Korunan Rotalar**  
  - Giriş yapılmadan app içi sayfalara erişim engellenir  
- **Responsive & Çocuk Dostu Tasarım**  
  - Büyük butonlar, pastel renkler, CSS Modülleri ile izole edilmiş stil  

---

## 🛠️ Teknoloji Yığını

- **Frontend:**  
  - React 18 + Vite  
  - TypeScript  
  - Tailwind CSS  
  - CSS Modules  
  - React Router DOM  
- **Backend / BaaS:**  
  - Firebase Authentication  
  - Firestore (Realtime Database değil, Cloud Firestore)  
- **Araçlar:**  
  - PostCSS + Autoprefixer  
  - Vite HMR  

---

## 🚀 Başlarken

### Önkoşullar

- Node.js v16 veya üzeri  
- npm veya yarn  

### Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/<kullanıcı_adı>/taskly-family.git
   cd taskly-family
