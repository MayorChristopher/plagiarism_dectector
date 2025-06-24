import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, LogOut, Settings, Layers, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AccountStats from '@/components/profile/AccountStats';
import SettingsTabs from '@/components/profile/SettingsTabs';

const Profile = () => {
  const { user, signOut, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        fullName: user.fullName,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser({ fullName: profileData.fullName, email: profileData.email });
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!profileData.newPassword || !profileData.currentPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all password fields.',
        variant: 'destructive',
      });
      return;
    }
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Password Updated',
      description: 'This is a demo. Password not actually changed.',
    });
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleDeleteAccount = () => {
    toast({
      title: 'Account Deletion Requested',
      description: "This feature is not implemented in the demo.",
      variant: 'destructive',
    });
  };
  
  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleAvatarChange = (file) => {
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result });
        toast({
          title: "Avatar updated!",
          description: "Your new profile picture has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Your Profile - PlagiarismGuard</title>
        <meta name="description" content="Manage your PlagiarismGuard profile, settings, and view account statistics." />
      </Helmet>
      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">My Profile</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
          <AccountStats user={user} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <SettingsTabs
                profileData={profileData}
                handleInputChange={handleInputChange}
                handleProfileUpdate={handleProfileUpdate}
                handlePasswordChange={handlePasswordChange}
                handleDeleteAccount={handleDeleteAccount}
              />
            </div>
            <div className="lg:col-span-1">
               <div className="space-y-6">
                {user.role === 'admin' && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <Layers className="h-5 w-5 mr-2" />
                      Technology Stack
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 mb-4">
                      View the core technologies used to build this platform.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/integrations')}>
                      View Integrations
                    </Button>
                  </div>
                )}
                
                {user.role === 'admin' && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <Crown className="h-5 w-5 mr-2" />
                      Admin Panel
                    </h3>
                     <p className="text-muted-foreground text-sm mt-1 mb-4">
                      Access the system administration dashboard.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/admin')}>
                      Go to Admin
                    </Button>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Actions
                  </h3>
                   <p className="text-muted-foreground text-sm mt-1 mb-4">
                    Manage your account status or log out from your session.
                  </p>
                  <div className="space-y-2">
                    <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                     <Button variant="outline" className="w-full" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Profile;