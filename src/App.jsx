import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  DevQuestHud,
  DevQuestProvider,
} from '@gestalt/dev-quest'
import '@gestalt/dev-quest/dev-quest.css'
import { AuthProvider } from './context/AuthContext'
import AuthCallbackPage from './pages/AuthCallbackPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute, { NoAccessRedirect } from './routes/ProtectedRoute'
import { LOADING_LINES, ROADMAP_PHASES } from './lib/roadmap'

export default function App() {
  return (
    <DevQuestProvider
      productName="Cosmopia"
      phases={ROADMAP_PHASES}
      loadingLines={LOADING_LINES}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/no-access" element={<NoAccessRedirect />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <DevQuestHud />
        </BrowserRouter>
      </AuthProvider>
    </DevQuestProvider>
  )
}
