import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatisticsTab = ({ document }) => {
  const stats = document.statistics || {};
  const totalWords = stats.totalWords || 0;
  const originalWords = stats.originalWords || 0;
  const plagiarizedWords = stats.plagiarizedWords || 0;
  const uniqueWords = stats.uniqueWords || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Content Analysis</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between"><span>Total Words:</span><span className="font-medium">{totalWords.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Unique Words:</span><span className="font-medium">{uniqueWords.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Original Content:</span><span className="font-medium text-green-600">{totalWords > 0 ? Math.round((originalWords / totalWords) * 100) : 0}%</span></div>
            <div className="flex justify-between"><span>Flagged Content:</span><span className="font-medium text-red-600">{totalWords > 0 ? Math.round((plagiarizedWords / totalWords) * 100) : 0}%</span></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Processing Details</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between"><span>Processing Time:</span><span className="font-medium">{document.processingTime || 'N/A'}</span></div>
            <div className="flex justify-between"><span>Sources Checked:</span><span className="font-medium">50M+</span></div>
            <div className="flex justify-between"><span>Languages Detected:</span><span className="font-medium">English</span></div>
            <div className="flex justify-between"><span>File Size:</span><span className="font-medium">{document.size || 'N/A'}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsTab;