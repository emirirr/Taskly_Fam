import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Tasks'
import ShoppingList from '../pages/ShoppingList'
import Children from '../pages/Children'
import Profile from '../pages/Profile'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRouter: React.FC = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tasks"
      element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      }
    />
    <Route
      path="/shopping"
      element={
        <ProtectedRoute>
          <ShoppingList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/members"
      element={
        <ProtectedRoute>
          <Children />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    {/* Catch‐all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRouter
