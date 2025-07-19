import React from 'react';
<<<<<<< HEAD
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
>>>>>>> origin/master
import MatchesTab from './MatchesTab';
import SourcesTab from './SourcesTab';
import StatisticsTab from './StatisticsTab';

<<<<<<< HEAD
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
=======
const ReportDetailsTabs = ({ report }) => {
  return (
    <Tabs defaultValue="matches" className="w-full">
      <div className="border-b border-slate-200">
        <div className="px-6">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger 
              value="matches"
              className="data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:shadow-none"
            >
              Matches
            </TabsTrigger>
            <TabsTrigger 
              value="sources"
              className="data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:shadow-none"
            >
              Sources
            </TabsTrigger>
            <TabsTrigger 
              value="statistics"
              className="data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:shadow-none"
            >
              Statistics
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="p-6">
        <TabsContent value="matches" className="mt-0">
          <MatchesTab matches={report.matches} />
        </TabsContent>
        <TabsContent value="sources" className="mt-0">
          <SourcesTab matches={report.matches} />
        </TabsContent>
        <TabsContent value="statistics" className="mt-0">
          <StatisticsTab report={report} />
        </TabsContent>
      </div>
    </Tabs>
>>>>>>> origin/master
  );
};

export default ReportDetailsTabs;