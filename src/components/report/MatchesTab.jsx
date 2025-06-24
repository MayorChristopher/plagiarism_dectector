import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Copy, ExternalLink, Search } from 'lucide-react';

const MatchesTab = ({ matches }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
        <p className="text-muted-foreground">This document appears to be original.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${match.type === 'exact' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium capitalize">{match.type} Match</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{match.similarity}% similarity</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(match.text)}><Copy className="h-4 w-4" /></Button>
          </div>
          <div className="bg-secondary rounded p-3 mb-3">
            <p className="text-sm italic break-words">"{match.text}"</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{match.source}</p>
              <p className="text-xs text-muted-foreground truncate break-all">{match.url}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.open(match.url, '_blank')} className="flex-shrink-0">
              <ExternalLink className="h-4 w-4 mr-1" />View Source
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesTab;