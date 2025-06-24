import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SourcesTab = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Source Types</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm">Academic Papers</span><span className="text-sm font-medium">45%</span></div>
              <Progress value={45} className="h-2" />
              <div className="flex justify-between items-center"><span className="text-sm">Web Articles</span><span className="text-sm font-medium">35%</span></div>
              <Progress value={35} className="h-2" />
              <div className="flex justify-between items-center"><span className="text-sm">Books</span><span className="text-sm font-medium">20%</span></div>
              <Progress value={20} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Match Types</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm">Exact Matches</span><span className="text-sm font-medium">60%</span></div>
              <Progress value={60} className="h-2" />
              <div className="flex justify-between items-center"><span className="text-sm">Paraphrased</span><span className="text-sm font-medium">40%</span></div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SourcesTab;