import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MatchesTab from './MatchesTab';
import SourcesTab from './SourcesTab';
import StatisticsTab from './StatisticsTab';

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
  );
};

export default ReportDetailsTabs;