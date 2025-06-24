import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const SystemHealthCard = ({ systemStats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{systemStats.systemUptime}</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{systemStats.averagePlagiarism}%</div>
              <div className="text-sm text-muted-foreground">Avg. Plagiarism Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">{systemStats.avgProcessingTime}</div>
              <div className="text-sm text-muted-foreground">Avg. Processing Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SystemHealthCard;