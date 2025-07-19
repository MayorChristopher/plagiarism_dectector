import React from 'react';
<<<<<<< HEAD
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
              <span className="text-sm text-muted-foreground">
                {match.similarity ? `${match.similarity}% similarity` : "No similarity score"}
              </span>
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
=======
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, ChevronRight, FileText } from 'lucide-react';

const MatchesTab = ({ matches = [] }) => {
  return (
    <div className="space-y-6">
      {matches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No matches found in the document.</p>
        </div>
      ) : (
        matches.map((match, index) => (
          <motion.div
            key={match.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-white border-slate-200 hover:border-emerald-200 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <h3 className="text-lg font-semibold text-slate-900">
                          {match.source}
                        </h3>
                      </div>
                      <span className={`text-lg font-bold ${
                        match.similarity > 30 ? 'text-red-600' :
                        match.similarity > 15 ? 'text-amber-600' :
                        'text-emerald-600'
                      }`}>
                        {match.similarity}% Match
                      </span>
                    </div>
                    <p className="text-slate-600">{match.text}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  {match.url && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(match.url, '_blank')}
                      className="border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source
                    </Button>
                  )}
                  <Button
                    onClick={() => {/* Handle view details */}}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    View Details <ChevronRight className="h-4 w-4 ml-2 text-white" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      )}
>>>>>>> origin/master
    </div>
  );
};

export default MatchesTab;