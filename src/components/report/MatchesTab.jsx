import React from 'react';
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
    </div>
  );
};

export default MatchesTab;