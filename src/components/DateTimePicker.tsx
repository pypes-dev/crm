import React, { useState } from 'react';
import { X, Calendar, Clock, Check } from 'lucide-react';
import CustomSelect from './CustomSelect';

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (dateTime: Date, title: string) => void;
  leadName: string;
}

export default function DateTimePicker({ isOpen, onClose, onSchedule, leadName }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [title, setTitle] = useState(`Meeting with ${leadName}`);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);
    
    // Combine date and time
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSchedule(dateTime, title);
    setIsLoading(false);
    onClose();
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setTitle(`Meeting with ${leadName}`);
  };

  // Generate time slots (9 AM to 6 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) break; // Stop at 6:00 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Schedule Meeting</h2>
              <p className="text-gray-600 text-sm">with {leadName}</p>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meeting Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Meeting Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter meeting title"
              required
              disabled={isLoading}
            />
          </div>

          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <CustomSelect
              options={[
                { value: '', label: 'Select a time' },
                ...timeSlots
              ]}
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder="Select a time"
              icon={<Clock className="w-4 h-4" />}
              label="Select Time"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !selectedDate || !selectedTime}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Scheduling...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Schedule Meeting
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Meeting invitations will be sent to both parties via email.
          </p>
        </div>
      </div>
    </div>
  );
}