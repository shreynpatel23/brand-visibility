import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CreateBrandPage from './pages/CreateBrandPage';
import EditBrandPage from './pages/EditBrandPage';
import PromptLogPage from './pages/PromptLogPage';
import BrandManagementPage from './pages/BrandManagementPage';
import UserManagementPage from './pages/UserManagementPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="brands/create" element={<CreateBrandPage />} />
              <Route path="brands/:id/edit" element={<EditBrandPage />} />
              <Route path="brands" element={<BrandManagementPage />} />
              <Route path="prompt-logs" element={<PromptLogPage />} />
              <Route path="users" element={<UserManagementPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;