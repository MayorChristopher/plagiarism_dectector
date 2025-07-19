import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import SystemHealthCard from "@/components/admin/SystemHealthCard";
import UserManagementTab from "@/components/admin/UserManagementTab";
import DocumentOversightTab from "@/components/admin/DocumentOversightTab";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("plagiarism_users") || "[]");
    setUsers(storedUsers);

    // Load documents from localStorage
    const storedDocuments = JSON.parse(localStorage.getItem("plagiarism_documents") || "[]");
    setDocuments(storedDocuments);
  }, []);

  const systemStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalDocuments: documents.length,
    flaggedDocuments: documents.filter(d => d.plagiarismScore > 25).length,
    systemUptime: "99.9%",
    averagePlagiarism: documents.length > 0 
      ? Math.round(documents.reduce((acc, doc) => acc + (doc.plagiarismScore || 0), 0) / documents.length) 
      : 0,
    avgProcessingTime: "2.5s"
  };

  const handleUserAction = (userId, action) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: action === 'suspend' ? 'suspended' : 'active'
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("plagiarism_users", JSON.stringify(updatedUsers));
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Plagiarism Detector</title>
        <meta
          name="description"
          content="Administrative dashboard for managing users and document oversight."
        />
      </Helmet>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-slate-900" />
                <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AdminStatsGrid systemStats={systemStats} />
            <SystemHealthCard systemStats={systemStats} />

            <Card className="mb-8 bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">System Management</CardTitle>
                <CardDescription className="text-slate-600">
                  Manage users and monitor document activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="users" className="space-y-6">
                  <TabsList className="bg-slate-100 text-slate-900">
                    <TabsTrigger value="users" className="data-[state=active]:bg-white">
                      User Management
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="data-[state=active]:bg-white">
                      Document Oversight
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="users">
                    <UserManagementTab
                      users={users}
                      onUserAction={handleUserAction}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </TabsContent>

                  <TabsContent value="documents">
                    <DocumentOversightTab documents={documents} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
