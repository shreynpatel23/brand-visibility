import React, { useState } from 'react';
import { Plus, Search, Mail, MoreHorizontal, Shield, User, Eye } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'pending' | 'inactive';
  lastLogin: string;
  invitedAt: string;
  invitedBy: string;
}

const UserManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'Editor',
    message: ''
  });

  // Mock data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      email: 'john.doe@company.com',
      name: 'John Doe',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      invitedAt: '2024-01-01T00:00:00Z',
      invitedBy: 'System'
    },
    {
      id: '2',
      email: 'sarah.wilson@company.com',
      name: 'Sarah Wilson',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-01-14T15:20:00Z',
      invitedAt: '2024-01-02T00:00:00Z',
      invitedBy: 'john.doe@company.com'
    },
    {
      id: '3',
      email: 'mike.chen@company.com',
      name: 'Mike Chen',
      role: 'Viewer',
      status: 'pending',
      lastLogin: '',
      invitedAt: '2024-01-14T09:00:00Z',
      invitedBy: 'john.doe@company.com'
    }
  ];

  const roles = ['Admin', 'Editor', 'Viewer'];
  const statuses = ['active', 'pending', 'inactive'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Never';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="w-4 h-4" />;
      case 'Editor': return <User className="w-4 h-4" />;
      case 'Viewer': return <Eye className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Editor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would normally send the invitation
      console.log('Inviting user:', inviteData);
      
      // Reset form and close modal
      setInviteData({ email: '', role: 'Editor', message: '' });
      setShowInviteForm(false);
      
      // You would typically refresh the team members list here
    } catch (error) {
      console.error('Failed to send invitation:', error);
    }
  };

  const ActionMenu: React.FC<{ member: TeamMember }> = ({ member }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (action: string) => {
      console.log(`${action} user:`, member.email);
      setIsOpen(false);
      // Implement actual actions here
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              {member.status === 'pending' && (
                <button
                  onClick={() => handleAction('resend-invite')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Invite
                </button>
              )}
              <button
                onClick={() => handleAction('change-role')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Change Role
              </button>
              {member.status === 'active' && (
                <button
                  onClick={() => handleAction('deactivate')}
                  className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors"
                >
                  Deactivate
                </button>
              )}
              <button
                onClick={() => handleAction('remove')}
                className="flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
              >
                Remove Access
              </button>
            </div>
          </div>
        )}
        
        {isOpen && (
          <div 
            className="fixed inset-0 z-5" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

  const InviteModal: React.FC = () => {
    if (!showInviteForm) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowInviteForm(false)}>
        <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invite Team Member</h3>
            <button
              onClick={() => setShowInviteForm(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="colleague@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role *
              </label>
              <select
                value={inviteData.role}
                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {inviteData.role === 'Admin' && 'Full access to all features and settings'}
                {inviteData.role === 'Editor' && 'Can create and edit brands, view all data'}
                {inviteData.role === 'Viewer' && 'Read-only access to dashboard and reports'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                rows={3}
                value={inviteData.message}
                onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add a personal message to the invitation..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage team members and their access permissions
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search team members..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invited
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{member.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(member.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(member.invitedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionMenu member={member} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No team members found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal />
    </div>
  );
};

export default UserManagementPage;