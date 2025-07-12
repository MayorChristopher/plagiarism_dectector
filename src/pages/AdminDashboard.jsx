import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import SystemHealthCard from "@/components/admin/SystemHealthCard";
import UserManagementTab from "@/components/admin/UserManagementTab";
import DocumentOversightTab from "@/components/admin/DocumentOversightTab";
import SystemSettingsTab from "@/components/admin/SystemSettingsTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [docSearchTerm, setDocSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [systemStats, setSystemStats] = useState({});

  useEffect(() => {
    const getUsersFromStorage = () =>
      JSON.parse(localStorage.getItem("plagiarism_users") || "[]");
    const allUsers = getUsersFromStorage();
    setUsers(allUsers);

    const mockDocuments = [
      {
        id: "1",
        name: "Research Paper.pdf",
        user: "John Doe",
        uploadDate: "2024-01-20",
        status: "completed",
        plagiarismScore: 15,
        flagged: false,
      },
      {
        id: "2",
        name: "Essay.docx",
        user: "Jane Smith",
        uploadDate: "2024-01-19",
        status: "completed",
        plagiarismScore: 45,
        flagged: true,
      },
      {
        id: "3",
        name: "Thesis.pdf",
        user: "Bob Wilson",
        uploadDate: "2024-01-18",
        status: "processing",
        plagiarismScore: null,
        flagged: false,
      },
    ];
    setDocuments(mockDocuments);

    setSystemStats({
      totalUsers: allUsers.length,
      activeUsers: allUsers.filter((u) => u.status === "active").length,
      totalDocuments: 5420,
      flaggedDocuments: 125,
      averagePlagiarism: 18,
      systemUptime: "99.9%",
      avgProcessingTime: "2.3s",
    });
  }, []);

  const handleUserAction = (userId, action) => {
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return { ...u, status: action === "suspend" ? "suspended" : "active" };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("plagiarism_users", JSON.stringify(updatedUsers));
    setSystemStats((prev) => ({
      ...prev,
      activeUsers: updatedUsers.filter((u) => u.status === "active").length,
    }));
    toast({
      title: `User ${action === "suspend" ? "Suspended" : "Activated"}`,
      description: "User status has been updated successfully.",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(docSearchTerm.toLowerCase()) ||
      doc.user.toLowerCase().includes(docSearchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Plagiarism Detector</title>
        <meta
          name="description"
          content="Administrative dashboard for system monitoring, user management, and content oversight."
        />
      </Helmet>
      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  Admin Panel
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home className="h-4 w-4 mr-2" /> User Dashboard
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
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-1">System Overview</h2>
            <p className="text-muted-foreground">
              Monitor system performance, manage users, and oversee content
              moderation.
            </p>
          </motion.div>

          <AdminStatsGrid systemStats={systemStats} />
          <SystemHealthCard systemStats={systemStats} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                    <TabsTrigger value="users">
                      <Users className="h-4 w-4 mr-2" />
                      User Management
                    </TabsTrigger>
                    <TabsTrigger value="documents">
                      <FileText className="h-4 w-4 mr-2" />
                      Document Oversight
                    </TabsTrigger>
                    <TabsTrigger value="system">
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      System Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="users" className="mt-6">
                    <UserManagementTab
                      users={filteredUsers}
                      onUserAction={handleUserAction}
                      searchTerm={userSearchTerm}
                      setSearchTerm={setUserSearchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="documents" className="mt-6">
                    <DocumentOversightTab
                      documents={filteredDocuments}
                      searchTerm={docSearchTerm}
                      setSearchTerm={setDocSearchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="system" className="mt-6">
                    <SystemSettingsTab />
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
