import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const ReportSummaryCard = ({ report }) => {
  const getSeverityInfo = (score) => {
    if (score > 30) {
      return {
        icon: AlertTriangle,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-100',
        text: 'High Risk',
        description: 'Significant plagiarism detected. Major revision recommended.'
      };
    }
    if (score > 15) {
      return {
        icon: Info,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        text: 'Moderate Risk',
        description: 'Some concerning matches found. Review suggested.'
      };
    }
    return {
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'Low Risk',
      description: 'Minor or no plagiarism detected. Good work!'
    };
  };

  const severity = getSeverityInfo(report.plagiarismScore);
  const SeverityIcon = severity.icon;

  return (
    <Card className="bg-white border-slate-200">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg ${severity.bg} flex items-center justify-center flex-shrink-0`}>
            <SeverityIcon className={`h-6 w-6 ${severity.color}`} />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <h3 className={`text-lg font-semibold ${severity.color}`}>
                {severity.text}
              </h3>
              <span className={`text-lg font-bold ${severity.color}`}>
                ({report.plagiarismScore}%)
              </span>
            </div>
            <p className="mt-1 text-slate-600">
              {severity.description}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-lg ${severity.bg} ${severity.border} border`}>
            <h4 className="font-medium text-slate-900 mb-2">Key Findings</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-white border border-current mr-2 flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${severity.color}`}></span>
                </span>
                Found {report.matches?.length || 0} matching sources
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-white border border-current mr-2 flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${severity.color}`}></span>
                </span>
                Analyzed {report.wordCount.toLocaleString()} words
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-white border border-current mr-2 flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${severity.color}`}></span>
                </span>
                {report.plagiarismScore > 30 ? 'Major revision needed' : 
                 report.plagiarismScore > 15 ? 'Some improvements recommended' : 
                 'Document looks original'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportSummaryCard;