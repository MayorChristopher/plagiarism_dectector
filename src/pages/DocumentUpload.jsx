import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import UploadDropzone from '@/components/upload/UploadDropzone';
import UploadFileList from '@/components/upload/UploadFileList';
import UploadInfoGrid from '@/components/upload/UploadInfoGrid';
import { uploadFile, getReport } from '@/lib/plagiarismCheckApi';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFilesAdded = (newFiles) => {
    const processedFiles = newFiles.map(file => ({
      file,
      id: Date.now() + Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...processedFiles]);
  };

  const handleFileRemove = (fileToRemove) => {
    setFiles(prev => prev.filter(file => file.id !== fileToRemove.id));
  };

  const pollReport = async (scanId, fileId) => {
    try {
      const report = await getReport(scanId);
      
      // Update file status based on report
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          return {
            ...f,
            status: 'completed',
            progress: 100,
            plagiarismScore: report.plagiarismScore || 0,
            matches: report.matches || []
          };
        }
        return f;
      }));

      // Update localStorage with the new document data
      const documentData = {
        id: fileId,
        scanId,
        name: files.find(f => f.id === fileId)?.name,
        size: files.find(f => f.id === fileId)?.size,
        userId: user?.id,
        uploadDate: new Date().toISOString(),
        analysisDate: new Date().toISOString(),
        status: 'completed',
        plagiarismScore: report.plagiarismScore || 0,
        matches: report.matches || [],
        wordCount: report.wordCount || 0
      };

      const existingDocs = JSON.parse(localStorage.getItem('plagiarism_documents') || '[]');
      localStorage.setItem('plagiarism_documents', JSON.stringify([documentData, ...existingDocs]));

      return true;
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('not found')) {
        // Report not ready, continue polling
        return false;
      }
      throw error;
    }
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to analyze.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      for (const file of files) {
        // Update status to uploading
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'analyzing', progress: 10 } : f
        ));

        // Upload file
        const uploadResult = await uploadFile(file.file);
        
        // Start polling for results
        let attempts = 0;
        const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max wait
        
        while (attempts < maxAttempts) {
          // Update progress based on attempts
          const progress = Math.min(90, 10 + (attempts * 80 / maxAttempts));
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));

          const isComplete = await pollReport(uploadResult.id, file.id);
          if (isComplete) break;

          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between polls
          attempts++;
        }

        if (attempts >= maxAttempts) {
          throw new Error('Analysis timed out');
        }
      }

      toast({
        title: "Analysis Complete",
        description: "All documents have been analyzed successfully."
      });

      // Navigate to dashboard after all files are processed
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error.message || "There was an error analyzing your files.",
        variant: "destructive"
      });
      
      // Update failed file status
      setFiles(prev => prev.map(f => 
        f.status === 'analyzing' ? { ...f, status: 'error' } : f
      ));
    } finally {
      setUploading(false);
    }
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Upload</h1>
        <p className="text-slate-600">Upload your documents for plagiarism analysis</p>
      </div>

      <div className="grid gap-8">
        <Card className="p-6 bg-white border-slate-200">
          <UploadDropzone onFilesAdded={handleFilesAdded} />
        </Card>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 bg-white border-slate-200">
              <UploadFileList 
                files={files} 
                onFileRemove={handleFileRemove} 
              />
              <div className="mt-6 flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleClearAll}
                  disabled={uploading}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Clear All
                </Button>
                <Button 
                  onClick={handleStartAnalysis}
                  disabled={uploading || files.length === 0}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  {uploading ? (
                    <>
                      <span className="text-white">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      Start Analysis ({files.length})
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-6 bg-white border-slate-200">
            <UploadInfoGrid />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DocumentUpload;
