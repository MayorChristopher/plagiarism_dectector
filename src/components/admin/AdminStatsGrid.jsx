import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, FileText, AlertTriangle } from 'lucide-react';

const AdminStatsGrid = ({ systemStats }) => {
  const adminStats = [
    { title: 'Total Users', value: systemStats.totalUsers?.toLocaleString() || '0', icon: Users, change: '+12%' },
    { title: 'Active Users', value: systemStats.activeUsers?.toLocaleString() || '0', icon: UserCheck, change: '+8%' },
    { title: 'Total Documents', value: systemStats.totalDocuments?.toLocaleString() || '0', icon: FileText, change: '+25%' },
    { title: 'Flagged Content', value: systemStats.flaggedDocuments?.toLocaleString() || '0', icon: AlertTriangle, change: '-5%' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {adminStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default AdminStatsGrid;