import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BillingTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-1">Free Plan</h4>
              <p className="text-muted-foreground mb-4">
                You're currently on the free plan with basic features.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 5 documents per month</li>
                <li>• Basic plagiarism detection</li>
                <li>• Standard support</li>
              </ul>
            </div>
            <Button
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="font-medium mb-1">Payment Method</h4>
              <p className="text-sm text-muted-foreground">
                No payment method on file
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="font-medium mb-1">Billing History</h4>
              <p className="text-sm text-muted-foreground">
                View and download your billing history
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              View History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingTab;