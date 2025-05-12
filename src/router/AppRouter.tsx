// src/router/AppRouter.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Tasks'
import ShoppingList from '../pages/ShoppingList'
import Children from '../pages/Children'
import Profile from '../pages/Profile'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/members" element={<Children />} />
        <Route path="/profile" element={<Profile />} />

        {/* Catch‐all: yönlendirme */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
