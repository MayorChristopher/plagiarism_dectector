import React from 'react';
import { motion } from 'framer-motion';
import { FileText, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const UploadFileList = ({ files, onFileRemove }) => {
  const getStatusInfo = (file) => {
    switch (file.status) {
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-emerald-500',
          text: `Analysis Complete - ${file.plagiarismScore}%`
        };
      case 'analyzing':
        return {
          icon: Clock,
          color: 'text-blue-500',
          text: `Analyzing... ${file.progress}%`
        };
      case 'error':
        return {
          icon: AlertTriangle,
          color: 'text-red-500',
          text: 'Analysis Failed'
        };
      default:
        return {
          icon: Clock,
          color: 'text-slate-400',
          text: 'Pending Analysis'
        };
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Uploaded Files</h3>
      <div className="space-y-4">
        {files.map((file) => {
          const status = getStatusInfo(file);
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-slate-900 truncate">
                    {file.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileRemove(file)}
                    className="text-slate-500 hover:text-emerald-700 hover:bg-emerald-50"
                    disabled={file.status === 'analyzing'}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      <span className="text-sm text-slate-600">{status.text}</span>
                    </div>
                    <span className="text-sm text-slate-600 whitespace-nowrap">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>

                  {file.status === 'analyzing' && (
                    <Progress 
                      value={file.progress} 
                      className="h-2 bg-emerald-100" 
                    />
                  )}

                  {file.size > 10 * 1024 * 1024 && (
                    <div className="flex items-center gap-2 mt-2 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs">Large file may take longer to process</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadFileList;