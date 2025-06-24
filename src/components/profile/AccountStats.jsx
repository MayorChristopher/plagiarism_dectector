import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Upload, Shield, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AccountStats = ({ user }) => {
  const [stats, setStats] = useState({ documentsUploaded: 0, reportsGenerated: 0 });

  useEffect(() => {
    if (user) {
      const allDocuments = JSON.parse(localStorage.getItem('plagiarism_documents') || '[]');
      const userDocuments = allDocuments.filter(d => d.userId === user.id);
      setStats({
        documentsUploaded: userDocuments.length,
        reportsGenerated: userDocuments.filter(d => d.status === 'completed').length,
      });
    }
  }, [user]);

  if (!user) return null;

  const accountStatsData = [
    {
      title: 'Member Since',
      value: new Date(user.createdAt).toLocaleDateString(),
      icon: Calendar
    },
    {
      title: 'Documents Uploaded',
      value: stats.documentsUploaded,
      icon: Upload
    },
    {
      title: 'Reports Generated',
      value: stats.reportsGenerated,
      icon: Shield
    },
    {
      title: 'Account Type',
      value: user.role === 'admin' ? 'Administrator' : 'Standard User',
      icon: User
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {accountStatsData.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-lg font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default AccountStats;