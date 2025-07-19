import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const StatisticsTab = ({ report }) => {
  const stats = [
    {
      title: 'Total Words',
      value: report.wordCount,
      icon: FileText,
      color: 'text-emerald-600'
    },
    {
      title: 'Original Content',
      value: Math.round(report.wordCount * (1 - report.plagiarismScore / 100)),
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      title: 'Similar Content',
      value: Math.round(report.wordCount * (report.plagiarismScore / 100)),
      icon: AlertTriangle,
      color: report.plagiarismScore > 30 ? 'text-red-600' : 
             report.plagiarismScore > 15 ? 'text-amber-600' : 
             'text-emerald-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white border-slate-200 hover:border-emerald-200 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value.toLocaleString()}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-medium text-slate-600">
                  {stat.title}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-white border-slate-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Content Analysis</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Original Content</span>
                <span className="text-sm font-medium text-emerald-600">
                  {(100 - report.plagiarismScore).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={100 - report.plagiarismScore}
                className="h-2 bg-emerald-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Similar Content</span>
                <span className={`text-sm font-medium ${
                  report.plagiarismScore > 30 ? 'text-red-600' :
                  report.plagiarismScore > 15 ? 'text-amber-600' :
                  'text-emerald-600'
                }`}>
                  {report.plagiarismScore.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={report.plagiarismScore}
                className={`h-2 ${
                  report.plagiarismScore > 30 ? 'bg-red-100' :
                  report.plagiarismScore > 15 ? 'bg-amber-100' :
                  'bg-emerald-100'
                }`}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatisticsTab;