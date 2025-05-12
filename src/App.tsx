// src/App.tsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './router/AppRouter'

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <AppRouter />
  </BrowserRouter>
)

export default App
