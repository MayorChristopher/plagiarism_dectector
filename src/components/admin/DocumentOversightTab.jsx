import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentOversightTab = ({ documents }) => {
  const navigate = useNavigate();

  // Sort documents by plagiarism score (highest first) and then by date
  const sortedDocuments = [...documents].sort((a, b) => {
    if (b.plagiarismScore !== a.plagiarismScore) {
      return (b.plagiarismScore || 0) - (a.plagiarismScore || 0);
    }
    return new Date(b.uploadDate) - new Date(a.uploadDate);
  });

  const getFlagStatus = (score) => {
    if (score >= 50) return { status: 'Critical', color: 'text-red-600' };
    if (score >= 25) return { status: 'High', color: 'text-amber-600' };
    if (score >= 10) return { status: 'Moderate', color: 'text-blue-600' };
    return { status: 'Low', color: 'text-emerald-600' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Document Analysis</h3>
          <p className="text-slate-600">Monitor and review document analysis results</p>
        </div>
      </div>

      <div className="space-y-4">
        {sortedDocuments.map((doc) => {
          const flagStatus = getFlagStatus(doc.plagiarismScore || 0);
          return (
            <div 
              key={doc.id} 
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-colors ${
                doc.plagiarismScore >= 25 ? 'border-red-200 bg-red-50' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.plagiarismScore >= 25 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-900'
                }`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-900 truncate">{doc.name}</h4>
                    {doc.plagiarismScore >= 25 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                        High Risk
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <span>By {doc.user}</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    {doc.processingTime && (
                      <>
                        <span>•</span>
                        <span>Processed in {doc.processingTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="text-center">
                  <div className={`text-lg font-bold ${flagStatus.color}`}>
                    {doc.plagiarismScore}%
                  </div>
                  <div className="text-xs text-slate-600">
                    {flagStatus.status} Risk
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/report/${doc.id}`)}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {sortedDocuments.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-slate-900 mb-2">No Documents Found</h4>
            <p className="text-slate-600">
              No documents have been uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentOversightTab;