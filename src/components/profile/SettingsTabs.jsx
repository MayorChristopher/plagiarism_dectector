import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from '@/components/profile/tabs/ProfileTab';
import SecurityTab from '@/components/profile/tabs/SecurityTab';

const SettingsTabs = ({ profileData, handleInputChange, handleProfileUpdate, handlePasswordChange, handleDeleteAccount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <ProfileTab
                profileData={profileData}
                handleInputChange={handleInputChange}
                handleProfileUpdate={handleProfileUpdate}
                handleDeleteAccount={handleDeleteAccount}
              />
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <SecurityTab
                profileData={profileData}
                handleInputChange={handleInputChange}
                handlePasswordChange={handlePasswordChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsTabs;