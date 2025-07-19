import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
  Upload,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { deleteScan } from "@/lib/plagiarismCheckApi";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const loadDocuments = () => {
      const savedDocuments = JSON.parse(localStorage.getItem("plagiarism_documents") || "[]");
      const userDocs = user?.id 
        ? savedDocuments.filter(doc => doc.userId === user.id)
        : savedDocuments;
      setDocuments(userDocs);
    };

    loadDocuments();
    const interval = setInterval(loadDocuments, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const handleDeleteDocument = async (docId) => {
    try {
      const doc = documents.find(d => d.id === docId);
      if (doc?.scanId) {
        await deleteScan(doc.scanId);
        toast({
          title: "Document Deleted",
          description: "The document has been removed from the system."
        });
      }

      const updatedDocs = documents.filter(doc => doc.id !== docId);
      setDocuments(updatedDocs);
      localStorage.setItem("plagiarism_documents", JSON.stringify(updatedDocs));
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the document.",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const stats = [
    {
      title: "Documents Uploaded",
      value: documents.length,
      icon: FileText,
    },
    {
      title: "Reports Generated",
      value: documents.filter((d) => d.status === "completed").length,
      icon: BarChart3,
    },
    {
      title: "Avg. Plagiarism",
      value:
        documents.filter((d) => d.plagiarismScore !== null).length > 0
          ? `${Math.round(
              documents
                .filter((d) => d.plagiarismScore !== null)
                .reduce((acc, d) => acc + d.plagiarismScore, 0) /
                documents.filter((d) => d.plagiarismScore !== null).length
            )}%`
          : "N/A",
      icon: Shield,
    },
    {
      title: "In Progress",
      value: documents.filter((d) => d.status === "analyzing").length,
      icon: Clock,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Plagiarism Detector</title>
        <meta
          name="description"
          content="Manage your documents, view plagiarism reports, and track your usage statistics."
        />
      </Helmet>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-600" />
                <h1 className="text-xl font-bold text-slate-900">
                  Plagiarism Detector
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user?.role === "admin" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/admin")}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Sign Out
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
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-slate-900">
              Welcome back, {user?.fullName.split(" ")[0]}!
            </h2>
            <p className="text-slate-600">
              Here's an overview of your plagiarism detection activity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="hover-lift"
              >
                <Card className="bg-white border-slate-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Your Documents</h3>
                <p className="text-slate-600">Manage and track your document analysis</p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/upload")}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Upload className="h-4 w-4 mr-2 text-white" /> Upload New
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">No Documents Found</h4>
                  <p className="text-slate-600">
                    Upload your first document to get started with plagiarism detection.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {documents.map((doc) => {
                    const StatusIcon = doc.status === "completed" 
                      ? doc.plagiarismScore > 30 
                        ? AlertTriangle 
                        : CheckCircle 
                      : Clock;

                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                          <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {doc.name}
                            </h4>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <span>
                                {new Date(doc.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex-grow sm:flex-grow-0">
                            <div className="flex items-center space-x-1">
                              <StatusIcon className={`h-4 w-4 ${
                                doc.status === "completed"
                                  ? doc.plagiarismScore > 30
                                    ? "text-red-600"
                                    : "text-emerald-600"
                                  : "text-blue-600"
                              }`} />
                              <span className="text-sm font-medium">
                                {doc.status === "completed" 
                                  ? `${doc.plagiarismScore}% Match`
                                  : "Analyzing..."}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2 flex-shrink-0">
                            {doc.status === "completed" && (
                              <Button
                                onClick={() => navigate(`/report/${doc.id}`)}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                              >
                                <Eye className="h-4 w-4 mr-2 text-white" />
                                View Report
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="border-slate-200 text-slate-700 hover:bg-slate-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
