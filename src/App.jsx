import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import DocumentUpload from "@/pages/DocumentUpload";
import PlagiarismReport from "@/pages/PlagiarismReport";
import Profile from "@/pages/Profile";
import Integrations from "@/pages/Integrations";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorFallback from "@/pages/ErrorFallback";
import Contact from "@/pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/")}
        >
          <Helmet>
            <title>Plagiarism Detector - AI-Powered Document Analysis</title>
            <meta
              name="description"
              content="Advanced plagiarism detection platform with AI-powered analysis, secure document storage, and comprehensive reporting."
            />
          </Helmet>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <DocumentUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report/:id"
                element={
                  <ProtectedRoute>
                    <PlagiarismReport />
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
              <Route
                path="/integrations"
                element={
                  <ProtectedRoute adminOnly>
                    <Integrations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
          </div>
        </ErrorBoundary>
      </Router>
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  );
}

export default App;
