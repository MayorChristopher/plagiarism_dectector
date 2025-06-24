import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ReportSummaryCard = ({ document, plagiarismLevel }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-y-6 sm:gap-x-4">
          <div className="flex items-start space-x-4 flex-grow overflow-hidden">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold mb-1 truncate">{document.name}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                <span>Analyzed: {new Date(document.analysisDate).toLocaleString()}</span>
                <span>Time: {document.processingTime}</span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0 w-full sm:w-auto">
            <div className={`text-4xl font-bold ${plagiarismLevel.color}`}>{document.plagiarismScore}%</div>
            <div className={`text-sm font-medium ${plagiarismLevel.color}`}>{plagiarismLevel.level} Risk</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummaryCard;