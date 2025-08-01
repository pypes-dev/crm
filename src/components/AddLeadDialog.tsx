import React, { useState } from 'react';
import { X, User, Mail, Building2, Phone, Plus, Target } from 'lucide-react';
import { Lead } from '../types';
import CustomSelect from './CustomSelect';

interface AddLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: {
    name: string;
    email?: string;
    company?: string;
    phone?: string;
    status: Lead['status'];
  }) => void;
}

export default function AddLeadDialog({ isOpen, onClose, onAddLead }: AddLeadDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'new' as Lead['status']
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddLead({
      name: formData.name,
      email: formData.email || undefined,
      company: formData.company || undefined,
      phone: formData.phone || undefined,
      status: formData.status
    });

    // Reset form
    setFormData({ name: '', email: '', company: '', phone: '', status: 'new' });
    setIsLoading(false);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusOptions = [
    { value: 'new', label: 'New Lead', color: 'bg-blue-100 text-blue-800' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-800' },
    { value: 'proposal', label: 'Proposal Sent', color: 'bg-orange-100 text-orange-800' },
    { value: 'closed', label: 'Closed Won', color: 'bg-emerald-100 text-emerald-800' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
              <p className="text-gray-600 text-sm">Grow your pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name - Required */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter full name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email - Optional */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Company - Optional */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter company name"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Phone - Optional */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter phone number"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Status - Required */}
          <div>
            <CustomSelect
              options={statusOptions}
              value={formData.status}
              onChange={(value) => handleChange('status', value)}
              placeholder="Select lead status"
              icon={<Target className="w-4 h-4" />}
              label="Lead Status"
              required
              disabled={isLoading}
            />
            <div className="mt-2 flex items-center gap-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusOptions.find(opt => opt.value === formData.status)?.color}`}>
                {statusOptions.find(opt => opt.value === formData.status)?.label}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.name.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding Lead...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Lead
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            * Required field. Other fields are optional but help with better lead management.
          </p>
        </div>
      </div>
    </div>
  );
}