import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Globe, BarChart2, ChevronRight } from 'lucide-react';

const SourcesTab = ({ matches = [] }) => {
  // Group matches by source and calculate total similarity
  const sources = matches.reduce((acc, match) => {
    const source = acc.find(s => s.url === match.url);
    if (source) {
      source.matches.push(match);
      source.totalSimilarity = Math.max(source.totalSimilarity, match.similarity);
    } else {
      acc.push({
        name: match.source,
        url: match.url,
        matches: [match],
        totalSimilarity: match.similarity
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {sources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No matching sources found.</p>
        </div>
      ) : (
        sources.map((source, index) => (
          <motion.div
            key={source.url || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-slate-200 hover:border-emerald-200 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-5 w-5 text-slate-400" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        {source.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        <span className={
                          source.totalSimilarity > 30 ? 'text-red-600' :
                          source.totalSimilarity > 15 ? 'text-amber-600' :
                          'text-emerald-600'
                        }>
                          {source.totalSimilarity}% Similarity
                        </span>
                      </div>
                      <span>•</span>
                      <span>{source.matches.length} matches</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  {source.url && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(source.url, '_blank')}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Source
                    </Button>
                  )}
                  <Button
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => {/* Handle view matches */}}
                  >
                    View Matches <ChevronRight className="h-4 w-4 ml-2 text-white" />
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

export default SourcesTab;