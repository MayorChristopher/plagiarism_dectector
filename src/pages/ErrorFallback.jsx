
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.error(error);

  return (
    <>
      <Helmet>
        <title>Error - PlagiarismGuard</title>
      </Helmet>
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4 text-center">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">PlagiarismGuard</h1>
        </div>
        <div className="bg-card p-8 rounded-lg shadow-lg max-w-lg w-full">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Oops! Something went wrong.</h2>
          <p className="text-muted-foreground mb-6">
            We've encountered an unexpected error. Our team has been notified. Please try again or return to the homepage.
          </p>
          <pre className="text-left bg-muted p-4 rounded-md text-sm text-destructive overflow-auto mb-6">
            {error.message}
          </pre>
          <Button onClick={resetErrorBoundary}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </>
  );
};

export default ErrorFallback;
