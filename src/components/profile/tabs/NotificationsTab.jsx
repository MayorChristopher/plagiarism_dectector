import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Preferences</h3>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="font-medium mb-1">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your reports and account
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              <Bell className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="font-medium mb-1">Report Completion</h4>
              <p className="text-sm text-muted-foreground">
                Get notified when your plagiarism reports are ready
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="font-medium mb-1">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Important security notifications and login alerts
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              <Shield className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsTab;