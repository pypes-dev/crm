import React, { useState, useEffect } from 'react';
import { Brain, Mail, Phone, Plus, Search, Filter, TrendingUp, Users, DollarSign, Clock, ChevronDown, BarChart3, Calendar, Globe, MapPin, Link, Settings, ExternalLink, FileText, Upload, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { Lead } from '../types';
import LeadCard from './LeadCard';
import AddLeadDialog from './AddLeadDialog';
import DateTimePicker from './DateTimePicker';
import CustomSelect from './CustomSelect';
import LeadDetailModal from './LeadDetailModal';
import { Website } from './MyBusiness/Website';

const mockLeads: Lead[] = [];


export default function Dashboard() {
  const userEmail = "CHANGE@ERMAIL>COM"
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'leads' | 'appointments' | 'business' | 'website'>('leads');
  const [showMobileStats, setShowMobileStats] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [selectedLead, setSelectedLead] = useState<{ id: string; name: string } | null>(null);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [appointments, setAppointments] = useState<Array<{
    id: string;
    title: string;
    dateTime: Date;
    leadName: string;
    leadId: string;
  }>>([]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const closedDeals = leads.filter(lead => lead.status === 'closed');
  const activeLeads = leads.filter(lead => lead.status !== 'closed');

  const handleCall = (phone: string) => {
    if (!phone) return;
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string, name: string) => {
    if (!email) return;
    const subject = `Following up on our conversation`;
    const body = `Hi ${name.split(' ')[0]},\n\nI wanted to follow up on our recent conversation about how Pypes Dev can help grow your business.\n\nBest regards`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handleSchedule = (leadId: string, leadName: string) => {
    setSelectedLead({ id: leadId, name: leadName });
    setShowScheduler(true);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLeadForDetail(lead);
    setShowLeadDetail(true);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead =>
      lead.id === updatedLead.id ? updatedLead : lead
    ));
  };

  const handleScheduleAppointment = (dateTime: Date, title: string) => {
    if (!selectedLead) return;

    const newAppointment = {
      id: Date.now().toString(),
      title,
      dateTime,
      leadName: selectedLead.name,
      leadId: selectedLead.id
    };

    setAppointments(prev => [...prev, newAppointment]);
    setSelectedLead(null);
  };

  const handleAddLead = (newLeadData: {
    name: string;
    email?: string;
    company?: string;
    phone?: string;
    status: Lead['status'];
  }) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      name: newLeadData.name,
      email: newLeadData.email,
      phone: newLeadData.phone,
      company: newLeadData.company,
      status: newLeadData.status,
      value: 0,
      lastContact: new Date().toISOString().split('T')[0],
      notes: 'New lead added to pipeline.',
      avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
    };

    setLeads(prev => [newLead, ...prev]);
  };

  const formatAppointmentDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Show onboarding if there are no leads
  useEffect(() => {
    setShowOnboarding(leads.length === 0);
  }, [leads.length]);

  // Onboarding steps
  const onboardingSteps = [
    {
      title: "Welcome to Pypes Dev!",
      description: "Let's get you started. We'll guide you through the process.",
      buttonText: "Let's Go!",
      position: "center"
    },
    {
      title: "1. Let's Learn About Your Business",
      description: "We'll use this to get your business online and automate comms with customers.",
      buttonText: "Next",
      position: "bottom-right"
    },
    {
      title: "2. Tell us about your target customer",
      description: "This will help us find more customers for you.",
      buttonText: "Next",
      position: "bottom-right"
    },
    {
      title: "3. Invite Your Friends (Or don't!)",
      description: "Invite your friends to join your organization and grow together.",
      buttonText: "Next",
      position: "center"
    }
  ];

  // Handle onboarding navigation
  const handleNextOnboardingStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      setShowOnboarding(false);
      setShowAddLead(true);
    }
  };

  // Skip onboarding
  const skipOnboarding = () => {
    setShowOnboarding(false);
    setShowAddLead(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Onboarding Overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{ width: `${((onboardingStep + 1) / onboardingSteps.length) * 100}%` }}
              ></div>
            </div>

            {/* Step Content */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {onboardingSteps[onboardingStep].title}
              </h2>

              <p className="text-gray-600 mb-6">
                {onboardingSteps[onboardingStep].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNextOnboardingStep}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex-1 flex items-center justify-center gap-2"
                >
                  {onboardingSteps[onboardingStep].buttonText}
                  {onboardingStep < onboardingSteps.length - 1 ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : null}
                </button>

                <button
                  onClick={skipOnboarding}
                  className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Skip Tutorial
                </button>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setOnboardingStep(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === onboardingStep
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-6'
                    : 'bg-gray-200'
                    }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Pypes Dev
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'leads'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'appointments'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'business'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                My Business
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome back, {userEmail.split('@')[0]}</span>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium transition-all duration-200 ${activeTab === 'leads'
              ? 'text-purple-700 border-b-2 border-purple-700'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium transition-all duration-200 ${activeTab === 'appointments'
              ? 'text-purple-700 border-b-2 border-purple-700'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium transition-all duration-200 ${activeTab === 'business'
              ? 'text-purple-700 border-b-2 border-purple-700'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            My Business
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'leads' && (
          <>
            {/* Mobile Stats Dropdown */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setShowMobileStats(!showMobileStats)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Dashboard Stats</p>
                    <p className="text-sm text-gray-600">{leads.length} leads • ${(totalValue / 1000).toFixed(0)}K pipeline</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMobileStats ? 'rotate-180' : ''}`} />
              </button>

              {showMobileStats && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">{leads.length}</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Total Leads</p>
                    <p className="text-xs text-gray-500">{activeLeads.length} active</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        ${(totalValue / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Pipeline Value</p>
                    <p className="text-xs text-gray-500">{closedDeals.length} closed</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {Math.round((closedDeals.length / leads.length) * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Close Rate</p>
                    <p className="text-xs text-emerald-600">+12% this month</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">4.2</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Avg Days</p>
                    <p className="text-xs text-gray-500">to close</p>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Stats Cards */}
            <div className="hidden md:grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{leads.length}</span>
                </div>
                <p className="text-gray-600 font-medium">Total Leads</p>
                <p className="text-sm text-gray-500">{activeLeads.length} active</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${(totalValue / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Pipeline Value</p>
                <p className="text-sm text-gray-500">{closedDeals.length} closed</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.round((closedDeals.length / leads.length) * 100)}%
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Close Rate</p>
                <p className="text-sm text-emerald-600">+12% this month</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">4.2</span>
                </div>
                <p className="text-gray-600 font-medium">Avg Days</p>
                <p className="text-sm text-gray-500">to close</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search leads..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <CustomSelect
                      options={[
                        { value: 'all', label: 'All Status' },
                        { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
                        { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
                        { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-800' },
                        { value: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800' },
                        { value: 'closed', label: 'Closed', color: 'bg-emerald-100 text-emerald-800' }
                      ]}
                      value={statusFilter}
                      onChange={setStatusFilter}
                      placeholder="Filter by status"
                      className="min-w-[140px] text-sm py-2"
                    />
                  </div>

                  <button
                    onClick={() => setShowAddLead(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lead
                  </button>
                </div>
              </div>
            </div>

            {/* Leads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onCall={handleCall}
                  onEmail={handleEmail}
                  onSchedule={handleSchedule}
                  onView={handleViewLead}
                />
              ))}
            </div>

            {filteredLeads.length === 0 && (
              <div className="max-w-2xl mx-auto py-16 px-6 text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-purple-200 animate-pulse"></div>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white">
                      <Users className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Animated elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-3">No leads yet</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                  Let's add your first lead to get started with Pypes Dev's powerful CRM features.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                  {[
                    {
                      icon: <Users className="w-6 h-6 text-purple-500" />,
                      title: "Add Leads",
                      description: "Start by adding your first lead"
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
                      title: "Track Progress",
                      description: "Monitor your sales pipeline"
                    },
                    {
                      icon: <BarChart3 className="w-6 h-6 text-emerald-500" />,
                      title: "Grow Business",
                      description: "Use insights to close more deals"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setShowAddLead(true)}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Lead
                  </button>

                  <button
                    onClick={() => {
                      // Add sample data
                      const sampleLeads = [
                        {
                          id: 'sample-1',
                          name: 'Sarah Johnson',
                          email: 'sarah.johnson@example.com',
                          phone: '+1 (555) 123-4567',
                          company: 'TechCorp',
                          status: 'new' as const,
                          value: 25000,
                          lastContact: new Date().toISOString().split('T')[0],
                          notes: 'Met at the tech conference',
                          avatar: `https://i.pravatar.cc/150?u=sample-1`
                        }
                      ];
                      setLeads(sampleLeads);
                    }}
                    className="px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Try Sample Data
                  </button>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                  <p>Need help? <a href="#" className="text-purple-600 hover:underline">Watch our quick tutorial</a></p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                    <p className="text-gray-600">Manage your scheduled meetings</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-600">{appointments.length}</span>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
                  <p className="text-gray-600">Schedule meetings with your leads to grow your business</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments
                    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
                    .map((appointment) => (
                      <div key={appointment.id} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
                            <p className="text-sm text-gray-600">with {appointment.leadName}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-purple-700">
                              {formatAppointmentDate(appointment.dateTime)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {appointment.dateTime > new Date() ? 'Upcoming' : 'Past'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Calendar Management */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Calendars</h2>
                    <p className="text-gray-600">Connect and sync your calendars</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Google Calendar</h3>
                        <p className="text-sm text-gray-600">Sync appointments with your Google Calendar</p>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            {/* Business Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Business</h2>
                  <p className="text-gray-600">Manage your business presence and growth</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Marketing Funnel */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 md:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Marketing Funnel</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Manage your online presence and lead generation</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-100">
                      <button className="flex items-center gap-2" onClick={() => setActiveTab('website')}>
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium">Website</span>
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium">Google My Business</span>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <Link className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium">Booking Link</span>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'website' && (
          <>
            <Website />
          </>
        )}
      </div>

      {/* Add Lead Dialog */}
      <AddLeadDialog
        isOpen={showAddLead}
        onClose={() => setShowAddLead(false)}
        onAddLead={handleAddLead}
      />

      {/* Date Time Picker */}
      <DateTimePicker
        isOpen={showScheduler}
        onClose={() => {
          setShowScheduler(false);
          setSelectedLead(null);
        }}
        onSchedule={handleScheduleAppointment}
        leadName={selectedLead?.name || ''}
      />

      {/* Lead Detail Modal */}
      <LeadDetailModal
        isOpen={showLeadDetail}
        onClose={() => {
          setShowLeadDetail(false);
          setSelectedLeadForDetail(null);
        }}
        lead={selectedLeadForDetail}
        onUpdateLead={handleUpdateLead}
      />
    </div>
  );
}