import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, AlertTriangle, Globe } from 'lucide-react';

const ReportStatsGrid = ({ stats }) => {
  const statItems = [
    { title: 'Total Words', value: (stats?.totalWords || 0).toLocaleString(), icon: FileText },
    { title: 'Original Words', value: (stats?.originalWords || 0).toLocaleString(), icon: CheckCircle },
    { title: 'Flagged Words', value: (stats?.plagiarizedWords || 0).toLocaleString(), icon: AlertTriangle },
    { title: 'Sources Found', value: (stats?.sourcesFound || 0).toLocaleString(), icon: Globe },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportStatsGrid;