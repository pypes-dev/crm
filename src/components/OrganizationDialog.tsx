import React, { useState } from 'react';
import { Building2, Plus, Search, Users } from 'lucide-react';
import { Organization } from '../types';

interface OrganizationDialogProps {
  userEmail: string;
  onOrganizationSelected: (orgId: string) => void;
}

const mockOrganizations: Organization[] = [
  { id: '1', name: 'Acme Corporation', domain: 'acme.com', memberCount: 150 },
  { id: '2', name: 'TechStart Inc', domain: 'techstart.io', memberCount: 25 },
  { id: '3', name: 'Global Solutions', domain: 'globalsolutions.com', memberCount: 500 },
];

export default function OrganizationDialog({ userEmail, onOrganizationSelected }: OrganizationDialogProps) {
  const [step, setStep] = useState<'detect' | 'search' | 'create'>('detect');
  const [searchTerm, setSearchTerm] = useState('');
  const [newOrgName, setNewOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailDomain = userEmail.split('@')[1];
  const suggestedOrg = mockOrganizations.find(org => org.domain === emailDomain);

  const filteredOrgs = mockOrganizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinOrganization = async (orgId: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onOrganizationSelected(orgId);
  };

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onOrganizationSelected('new-org');
  };

  if (step === 'detect') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Pypes!</h2>
            <p className="text-gray-600">Let's get you connected with your organization</p>
          </div>

          {suggestedOrg ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-semibold text-gray-900 mb-2">We found your organization!</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{suggestedOrg.name}</p>
                    <p className="text-sm text-gray-600">{suggestedOrg.memberCount} members</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleJoinOrganization(suggestedOrg.id)}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    Join {suggestedOrg.name}
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep('search')}
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  This isn't my organization
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-6">
                We couldn't automatically detect your organization from your email domain ({emailDomain}).
              </p>
              
              <button
                onClick={() => setStep('search')}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find My Organization
              </button>
              
              <button
                onClick={() => setStep('create')}
                className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Organization
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'search') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Organization</h2>
            <p className="text-gray-600">Search for your company or team</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleJoinOrganization(org.id)}
                  disabled={isLoading}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{org.name}</p>
                      <p className="text-sm text-gray-600">{org.memberCount} members • {org.domain}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setStep('create')}
                className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Organization
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Organization</h2>
          <p className="text-gray-600">Set up your new organization</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            <input
              type="text"
              id="orgName"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Enter organization name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCreateOrganization}
            disabled={isLoading || !newOrgName.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Organization
              </>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={() => setStep('search')}
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Back to search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}