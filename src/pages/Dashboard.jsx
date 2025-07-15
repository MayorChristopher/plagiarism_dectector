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
  Plus,
  Search,
  Download,
  Eye,
  Settings,
  LogOut,
  Shield,
  User,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { generateMockMatches } from "@/data/mockAnalysis";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedDocuments = JSON.parse(
      localStorage.getItem("plagiarism_documents") || "[]"
    );
    setDocuments(savedDocuments);

    const interval = setInterval(() => {
      setDocuments((currentDocs) => {
        let docsChanged = false;
        const updatedDocs = currentDocs.map((doc) => {
          if (doc.status === "analyzing" && (doc.progress || 0) < 100) {
            docsChanged = true;
            const newProgress = Math.min(
              (doc.progress || 0) + Math.floor(Math.random() * 20) + 10,
              100
            );

            if (doc.status === "failed") {
              return doc;
            }

            if (newProgress === 100) {
              const plagiarismScore = Math.floor(Math.random() * 50);
              return {
                ...doc,
                status: "completed",
                progress: 100,
                plagiarismScore: plagiarismScore,
                matches: generateMockMatches(doc.wordCount),
              };
            }
            return { ...doc, progress: newProgress };
          }
          return doc;
        });

        if (docsChanged) {
          localStorage.setItem(
            "plagiarism_documents",
            JSON.stringify(updatedDocs)
          );
          return updatedDocs;
        }
        return currentDocs;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const userDocuments = documents.filter(
    (d) => d.userId === user?.id || user?.role === "admin"
  );

  const filteredDocuments = userDocuments
    .filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  const getStatusInfo = (doc) => {
    switch (doc.status) {
      case "completed":
        return {
          color: "text-green-600",
          icon: CheckCircle,
          text: "Completed",
        };
      case "analyzing":
        return {
          color: "text-blue-600",
          icon: Clock,
          text: `Analyzing... ${doc.progress || 0}%`,
        };
      case "failed":
        return {
          color: "text-red-600",
          icon: AlertTriangle,
          text: "Analysis Failed",
        };
      default:
        return { color: "text-gray-500", icon: FileText, text: "Queued" };
    }
  };

  const getPlagiarismColor = (score) => {
    if (score === null) return "text-muted-foreground";
    if (score < 10) return "text-green-600";
    if (score < 25) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleDeleteDocument = (docId) => {
    const updatedDocs = documents.filter((doc) => doc.id !== docId);
    setDocuments(updatedDocs);
    localStorage.setItem("plagiarism_documents", JSON.stringify(updatedDocs));
    toast({
      title: "Document Deleted",
      description: "The document has been removed from your account.",
    });
  };

  const stats = [
    {
      title: "Documents Uploaded",
      value: userDocuments.length,
      icon: FileText,
    },
    {
      title: "Reports Generated",
      value: userDocuments.filter((d) => d.status === "completed").length,
      icon: BarChart3,
    },
    {
      title: "Avg. Plagiarism",
      value:
        userDocuments.filter((d) => d.plagiarismScore !== null).length > 0
          ? `${Math.round(
              userDocuments
                .filter((d) => d.plagiarismScore !== null)
                .reduce((acc, d) => acc + d.plagiarismScore, 0) /
                userDocuments.filter((d) => d.plagiarismScore !== null).length
            )}%`
          : "N/A",
      icon: Shield,
    },
    {
      title: "In Progress",
      value: userDocuments.filter((d) => d.status === "analyzing").length,
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
      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  Plagiarism Detector
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user?.role === "admin" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/admin")}
                  >
                    <Crown className="h-4 w-4 mr-2" /> Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome back, {user?.fullName.split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">
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
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>
                      Manage and view your uploaded documents.
                    </CardDescription>
                  </div>
                  <div className="flex w-full sm:w-auto gap-2">
                    <div className="relative flex-grow sm:flex-grow-0">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button onClick={() => navigate("/upload")}>
                      <Plus className="h-4 w-4 sm:mr-2" />{" "}
                      <span className="hidden sm:inline">New Scan</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No documents found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm
                        ? "No documents match your search."
                        : "Upload your first document to get started."}
                    </p>
                    <Button onClick={() => navigate("/upload")}>
                      <Plus className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => {
                      const statusInfo = getStatusInfo(doc);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <div
                          key={doc.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow w-full sm:w-auto">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h4 className="font-semibold truncate">
                                {doc.name}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>
                                  {new Date(
                                    doc.uploadDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex-grow sm:flex-grow-0">
                              <div
                                className={`flex items-center space-x-1 ${statusInfo.color}`}
                              >
                                <StatusIcon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  {statusInfo.text}
                                </span>
                              </div>
                              {doc.status === "analyzing" && (
                                <Progress
                                  value={doc.progress}
                                  className="h-1 mt-1"
                                />
                              )}
                            </div>
                            {doc.plagiarismScore !== null && (
                              <div className="text-center flex-shrink-0">
                                <div
                                  className={`text-lg font-bold ${getPlagiarismColor(
                                    doc.plagiarismScore
                                  )}`}
                                >
                                  {doc.plagiarismScore}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Plagiarism
                                </div>
                              </div>
                            )}
                            <div className="flex space-x-2 flex-shrink-0">
                              {doc.status === "completed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate(`/report/${doc.id}`)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              )}
                              {doc.status === "failed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    toast({
                                      title: "Analysis Failed",
                                      description:
                                        "This document could not be analyzed. Please try uploading it again.",
                                      variant: "destructive",
                                    })
                                  }
                                >
                                  Details
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  toast({
                                    title:
                                      "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                                  })
                                }
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {(doc.userId === user?.id || user?.role === "admin") && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
