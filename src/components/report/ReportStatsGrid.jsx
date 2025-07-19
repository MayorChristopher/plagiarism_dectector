import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, AlertTriangle, Clock, BarChart2 } from 'lucide-react';

const ReportStatsGrid = ({ report }) => {
  const stats = [
    {
      title: 'Plagiarism Score',
      value: `${report.plagiarismScore}%`,
      icon: BarChart2,
      color: report.plagiarismScore > 30 ? 'text-red-500' : 
             report.plagiarismScore > 15 ? 'text-amber-500' : 
             'text-emerald-500'
    },
    {
      title: 'Word Count',
      value: report.wordCount.toLocaleString(),
      icon: FileText,
      color: 'text-emerald-500'
    },
    {
      title: 'Analysis Time',
      value: '< 1 min',
      icon: Clock,
      color: 'text-emerald-500'
    },
    {
      title: 'Matches Found',
      value: report.matches?.length || 0,
      icon: AlertTriangle,
      color: 'text-emerald-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {stat.value}
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
  );
};

export default ReportStatsGrid;