import React, { useState } from 'react';
import { X, User, Mail, Building2, Phone, FileText, Upload, Calendar, MessageSquare, Plus, Download, Trash2, Edit3 } from 'lucide-react';
import { Lead } from '../types';
import CustomSelect from './CustomSelect';

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onUpdateLead: (lead: Lead) => void;
}

const statusOptions = [
  { value: 'new', label: 'New Lead', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-800' },
  { value: 'proposal', label: 'Proposal Sent', color: 'bg-orange-100 text-orange-800' },
  { value: 'closed', label: 'Closed Won', color: 'bg-emerald-100 text-emerald-800' }
];

export default function LeadDetailModal({ isOpen, onClose, lead, onUpdateLead }: LeadDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'documents'>('overview');
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Lead>>({});

  if (!isOpen || !lead) return null;

  const handleStatusChange = (newStatus: Lead['status']) => {
    const updatedLead = { ...lead, status: newStatus };
    onUpdateLead(updatedLead);
  };

  const handleFieldEdit = (field: string, value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSaveField = (field: string) => {
    if (editValues[field as keyof Lead] !== undefined) {
      const updatedLead = { ...lead, [field]: editValues[field as keyof Lead] };
      onUpdateLead(updatedLead);
      setEditingField(null);
      setEditValues({});
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setIsAddingNote(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newActivity = {
      id: Date.now().toString(),
      type: 'note' as const,
      content: newNote,
      timestamp: new Date().toISOString()
    };
    
    const updatedLead = {
      ...lead,
      activities: [newActivity, ...(lead.activities || [])]
    };
    
    onUpdateLead(updatedLead);
    setNewNote('');
    setIsAddingNote(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={lead.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                alt={lead.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
              />
              <div>
                <h2 className="text-2xl font-bold">{lead.name}</h2>
                <p className="text-white/80">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusOptions.find(opt => opt.value === lead.status)?.color} bg-white/20 text-white border border-white/30`}>
                    {statusOptions.find(opt => opt.value === lead.status)?.label}
                  </span>
                  <span className="text-white/80 text-sm">{formatCurrency(lead.value)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'notes'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Notes & Activity
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Documents
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {editingField === 'email' ? (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={editValues.email || lead.email || ''}
                          onChange={(e) => handleFieldEdit('email', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSaveField('email')}
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{lead.email || 'Not provided'}</span>
                        </div>
                        <button
                          onClick={() => setEditingField('email')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {editingField === 'phone' ? (
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          value={editValues.phone || lead.phone || ''}
                          onChange={(e) => handleFieldEdit('phone', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSaveField('phone')}
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{lead.phone || 'Not provided'}</span>
                        </div>
                        <button
                          onClick={() => setEditingField('phone')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <CustomSelect
                      options={statusOptions}
                      value={lead.status}
                      onChange={(value) => handleStatusChange(value as Lead['status'])}
                      className="max-w-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>
                    {editingField === 'value' ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={editValues.value || lead.value}
                          onChange={(e) => handleFieldEdit('value', e.target.value)}
                          className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSaveField('value')}
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 max-w-xs">
                        <span className="text-gray-900 font-semibold">{formatCurrency(lead.value)}</span>
                        <button
                          onClick={() => setEditingField('value')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact</label>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 max-w-xs">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{formatDate(lead.lastContact)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Add New Note */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Note</h3>
                <div className="space-y-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this lead..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || isAddingNote}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAddingNote ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add Note
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {(lead.activities || []).length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No activity yet. Add your first note above.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(lead.activities || []).map((activity) => (
                        <div key={activity.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900">{activity.content}</p>
                              <p className="text-sm text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Upload Documents */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, XLS, XLSX, and images</p>
                  <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Document List */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                {(lead.documents || []).length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No documents uploaded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(lead.documents || []).map((doc) => (
                      <div key={doc.id} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.size} • {formatDate(doc.uploadDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}