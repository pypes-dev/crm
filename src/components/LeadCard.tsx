import React from 'react';
import { Phone, Mail, Building2, DollarSign, Calendar, MessageSquare, Clock, Eye } from 'lucide-react';
import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  onCall: (phone: string) => void;
  onEmail: (email: string, name: string) => void;
  onSchedule: (leadId: string, leadName: string) => void;
  onView: (lead: Lead) => void;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
  qualified: 'bg-purple-100 text-purple-800 border-purple-200',
  proposal: 'bg-orange-100 text-orange-800 border-orange-200',
  closed: 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

const statusLabels = {
  new: 'New Lead',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal Sent',
  closed: 'Closed Won'
};

export default function LeadCard({ lead, onCall, onEmail, onSchedule, onView }: LeadCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={lead.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
            alt={lead.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{lead.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Building2 className="w-3 h-3" />
              {lead.company}
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
          {statusLabels[lead.status]}
        </span>
      </div>

      {/* Value and Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-green-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold">{formatCurrency(lead.value)}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-3 h-3" />
          {formatDate(lead.lastContact)}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2">{lead.notes}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(lead)}
          className="px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 flex items-center justify-center"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onCall(lead.phone || '')}
          disabled={!lead.phone}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
        <button
          onClick={() => onEmail(lead.email || '', lead.name)}
          disabled={!lead.email}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        <button
          onClick={() => onSchedule(lead.id, lead.name)}
          className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center"
        >
          <Clock className="w-4 h-4" />
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="space-y-1 text-xs text-gray-500">
          {lead.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}