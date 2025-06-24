import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Users, Eye, Ban, UserCheck, CheckCircle, Search, Filter, Download } from 'lucide-react';

const UserManagementTab = ({ users, onUserAction, searchTerm, setSearchTerm }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'suspended': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'suspended': return Ban;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">User Accounts</h3>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full sm:w-64" />
          </div>
          <Button variant="outline" size="icon" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Filter className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Download className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => {
          const StatusIcon = getStatusIcon(user.status);
          return (
            <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-semibold truncate">{user.fullName}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className={`flex items-center space-x-1 ${getStatusColor(user.status)}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm capitalize font-medium">{user.status}</span>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "User Details", description: `Viewing details for ${user.fullName}` })}><Eye className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => onUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}>
                    {user.status === 'active' ? <Ban className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserManagementTab;