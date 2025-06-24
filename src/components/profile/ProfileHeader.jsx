import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Shield, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProfileHeader = ({ user, onAvatarChange }) => {
  const avatarInputRef = useRef(null);

  if (!user) return null;

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarChange(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group">
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="hidden"
              />
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center cursor-pointer bg-secondary"
                onClick={handleAvatarClick}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleAvatarClick}
              >
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">{user.fullName}</h2>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;