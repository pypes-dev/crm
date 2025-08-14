import { useState, useEffect } from 'react';
import { Building2, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../common/constants';

export default function OrganizationDialog() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'detect' | 'search' | 'create'>('detect');
  const [newOrgName, setNewOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orgCheckLoading, setOrgCheckLoading] = useState(true);
  const [error, setError] = useState('');
  const checkUserOrganization = async () => {
    const { data: org, error } = await supabase.from('organization_member').select('*').eq('user_id', user?.id)
    if (org && org.length > 0) {
      navigate('/');
    } else {
      setOrgCheckLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    checkUserOrganization();
  }, [authLoading]);


  const createOrganization = async () => {
    console.log('~user ', user)
    const { data: org, error } = await supabase
      .from('organization')
      .insert({ name: newOrgName })
      .select()
    if (error) {
      setError(error.message);
      return;
    }
    setError('')
    await supabase.from('organization_member').insert({
      user_id: user!.id,
      organization_id: org[0].id,
      role: ROLES.ADMIN
    });
    navigate('/dashboard');
  };



  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) return;

    setIsLoading(true);
    await createOrganization();
    setIsLoading(false);
  };

  if (authLoading || orgCheckLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
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


          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">
              We couldn't automatically detect your organization from your email login.
            </p>

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
          {error && <p className="text-red-500">{error}</p>}
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
        </div>
      </div>
    </div>
  );
}