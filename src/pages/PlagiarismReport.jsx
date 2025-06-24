import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ReportSummaryCard from '@/components/report/ReportSummaryCard';
import ReportStatsGrid from '@/components/report/ReportStatsGrid';
import ReportDetailsTabs from '@/components/report/ReportDetailsTabs';

const PlagiarismReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const documents = JSON.parse(localStorage.getItem('plagiarism_documents') || '[]');
    const doc = documents.find(d => d.id === id);
    
    if (doc && doc.status === 'completed') {
      const plagiarismScore = doc.plagiarismScore || 0;
      const wordCount = doc.wordCount || 0;
      const matches = doc.matches || [];

      const detailedDoc = {
        ...doc,
        matches: matches,
        analysisDate: doc.analysisDate || new Date().toISOString(),
        processingTime: doc.processingTime || '45 seconds',
        sourcesFound: matches.length,
        statistics: {
          totalWords: wordCount,
          uniqueWords: Math.floor(wordCount * 0.85),
          plagiarizedWords: Math.floor(wordCount * (plagiarismScore / 100)),
          originalWords: Math.floor(wordCount * (1 - plagiarismScore / 100))
        }
      };
      setDocument(detailedDoc);
    } else if (doc) {
      navigate('/dashboard');
      toast({
        title: "Analysis Incomplete",
        description: `The report for "${doc.name}" is not yet available.`,
        variant: "destructive"
      });
    }
    setLoading(false);
  }, [id, navigate]);

  const getPlagiarismLevel = (score) => {
    if (score < 10) return { level: 'Low', color: 'text-green-600' };
    if (score < 25) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "The report link has been copied to your clipboard.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Preparing Export",
      description: "Your report is being prepared for printing or saving as a PDF.",
    });
    setTimeout(() => window.print(), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested plagiarism report could not be found or is still being processed.</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const plagiarismLevel = getPlagiarismLevel(document.plagiarismScore);

  return (
    <>
      <Helmet>
        <title>Plagiarism Report - {document.name} - PlagiarismGuard</title>
        <meta name="description" content={`Detailed plagiarism analysis report for ${document.name}.`} />
      </Helmet>

      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2 sm:mr-4">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <Shield className="h-7 w-7 text-primary" />
                  <h1 className="text-lg sm:text-xl font-bold text-foreground">Report</h1>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Share</span>
                </Button>
                <Button size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 printable-area">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ReportSummaryCard document={document} plagiarismLevel={plagiarismLevel} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <ReportStatsGrid stats={{ ...document.statistics, sourcesFound: document.sourcesFound }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <ReportDetailsTabs document={document} />
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PlagiarismReport;