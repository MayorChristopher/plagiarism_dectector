import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, X } from 'lucide-react';

const UploadFileList = ({ files, onRemoveFile, onClearAll, onStartAnalysis, uploading, uploadProgress }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Selected Files ({files.length})</CardTitle>
          <CardDescription>Review your files before uploading</CardDescription>
        </CardHeader>
        <CardContent>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </motion.div>
          )}

          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRemoveFile(file.id)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={onClearAll} disabled={uploading}>Clear All</Button>
            <Button onClick={onStartAnalysis} disabled={uploading || files.length === 0}>
              {uploading ? 'Uploading...' : `Start Analysis (${files.length})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UploadFileList;