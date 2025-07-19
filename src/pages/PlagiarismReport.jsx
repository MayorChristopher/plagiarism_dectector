import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, BarChart2, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReportDetailsTabs from '@/components/report/ReportDetailsTabs';
import ReportStatsGrid from '@/components/report/ReportStatsGrid';
import ReportSummaryCard from '@/components/report/ReportSummaryCard';

const PlagiarismReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = () => {
      const savedDocuments = JSON.parse(localStorage.getItem('plagiarism_documents') || '[]');
      const foundReport = savedDocuments.find(doc => doc.id === id);
      if (foundReport) {
        setReport(foundReport);
      }
      setLoading(false);
    };

    loadReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-emerald-600 animate-pulse mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900">Loading Report...</h2>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Report Not Found</h2>
          <p className="text-slate-600 mb-6">The requested report could not be found.</p>
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-4 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{report.name}</h1>
                <p className="text-slate-600">
                  Uploaded on {new Date(report.uploadDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Button
                onClick={() => window.print()}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Download Report
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ReportStatsGrid report={report} />
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <ReportSummaryCard report={report} />
          </motion.div>

          {/* Detailed Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-white border-slate-200">
              <ReportDetailsTabs report={report} />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismReport;
