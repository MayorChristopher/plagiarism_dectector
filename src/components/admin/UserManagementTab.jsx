import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Eye, Ban, UserCheck, CheckCircle, Search } from 'lucide-react';

const UserManagementTab = ({ users, onUserAction, searchTerm, setSearchTerm }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-600';
      case 'suspended': return 'text-red-600';
      default: return 'text-amber-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'suspended': return Ban;
      default: return CheckCircle;
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">User Accounts</h3>
          <p className="text-slate-600">Manage user accounts and permissions</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-10 w-full border-slate-200"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const StatusIcon = getStatusIcon(user.status);
          return (
            <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-slate-900 truncate">{user.fullName}</h4>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <span className="truncate">{user.email}</span>
                    <span>•</span>
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className={`flex items-center space-x-1 ${getStatusColor(user.status)}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm capitalize font-medium">{user.status}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    {user.status === 'active' ? <Ban className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-slate-900 mb-2">No Users Found</h4>
            <p className="text-slate-600">
              {searchTerm ? "No users match your search criteria." : "No users have been registered yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementTab;