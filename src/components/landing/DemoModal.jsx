import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const DemoModal = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>PlagiarismGuard Demo</DialogTitle>
          <DialogDescription>
            See how our AI-powered plagiarism detection works in just a few clicks.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Demo video coming soon!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;