import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = ["pdf", "doc", "docx", "txt", "rtf"];

const DocumentUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (fileList) => {
    const acceptedFiles = [];
    fileList.forEach((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!SUPPORTED_FORMATS.includes(extension)) {
        toast({
          title: "Unsupported File Type",
          description: `The file "${
            file.name
          }" was ignored. Only ${SUPPORTED_FORMATS.join(
            ", "
          )} files are supported.`,
          variant: "destructive",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File Too Large",
          description: `The file "${file.name}" exceeds the 10MB size limit.`,
          variant: "destructive",
        });
        return;
      }
      acceptedFiles.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
      });
    });
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const removeFile = (fileId) =>
    setFiles((prev) => prev.filter((f) => f.id !== fileId));

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    const existingDocs = JSON.parse(
      localStorage.getItem("plagiarism_documents") || "[]"
    );
    const newDocuments = files.map((file) => {
      // Simulate a small chance of analysis failure for demonstration
      const shouldFail = Math.random() < 0.1;
      return {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        uploadDate: new Date().toISOString(),
        status: shouldFail ? "failed" : "analyzing",
        progress: 0,
        plagiarismScore: null,
        wordCount: Math.floor(Math.random() * 4500) + 500,
        size: formatFileSize(file.size),
        userId: user.id,
      };
    });

    const updatedDocs = [...existingDocs, ...newDocuments];
    localStorage.setItem("plagiarism_documents", JSON.stringify(updatedDocs));

    toast({
      title: "Upload successful!",
      description: `${files.length} document(s) are now being analyzed.`,
    });
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Upload Document - Plagiarism Detector</title>
        <meta
          name="description"
          content="Upload your documents for AI-powered plagiarism detection and analysis."
        />
      </Helmet>
      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-7 w-7 text-primary" />
                <h1 className="text-xl font-bold text-foreground">New Scan</h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Document(s)</CardTitle>
              <CardDescription>
                Drag and drop files or click to browse. Max 10MB per file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept={SUPPORTED_FORMATS.map((f) => `.${f}`).join(",")}
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold mb-2">
                      Drop your files here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Supports: {SUPPORTED_FORMATS.join(", ").toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Selected Files ({files.length})</CardTitle>
                  <CardDescription>
                    Review your files before starting the analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          disabled={uploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between sm:justify-end sm:space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setFiles([])}
                      disabled={uploading}
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={uploading || files.length === 0}
                    >
                      {uploading
                        ? "Uploading..."
                        : `Start Analysis (${files.length})`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

export default DocumentUpload;
