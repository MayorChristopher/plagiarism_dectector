import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import MatchesTab from './MatchesTab';
import SourcesTab from './SourcesTab';
import StatisticsTab from './StatisticsTab';

const ReportDetailsTabs = ({ document }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2"><BarChart3 className="h-5 w-5" /><span>Detailed Analysis</span></CardTitle>
        <CardDescription>Comprehensive breakdown of detected similarities and sources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="matches">Matches Found</TabsTrigger>
            <TabsTrigger value="sources">Source Analysis</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className="mt-6"><MatchesTab matches={document.matches} /></TabsContent>
          <TabsContent value="sources" className="mt-6"><SourcesTab /></TabsContent>
          <TabsContent value="statistics" className="mt-6"><StatisticsTab document={document} /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportDetailsTabs;