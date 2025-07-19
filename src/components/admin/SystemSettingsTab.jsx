import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Settings } from 'lucide-react';

const SystemSettingsTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">System Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detection Settings</CardTitle>
            <CardDescription>Configure plagiarism detection parameters.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sensitivity Level</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Settings className="h-4 w-4 mr-2" />Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Source Database</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Settings className="h-4 w-4 mr-2" />Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto-flagging Rules</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Settings className="h-4 w-4 mr-2" />Edit Rules</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Maintenance</CardTitle>
            <CardDescription>System health and maintenance tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Cleanup</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>Run Cleanup</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Backup</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>Create Backup</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Performance Monitor</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>View Metrics</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettingsTab;