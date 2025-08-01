import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  required?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  icon,
  label,
  required = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex(opt => opt.value === value);
          const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          onChange(options[nextIndex].value);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex(opt => opt.value === value);
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          onChange(options[prevIndex].value);
        }
        break;
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div
        className={`relative w-full px-4 py-3 border border-gray-300 rounded-xl bg-white cursor-pointer transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isOpen ? 'ring-2 ring-purple-500 border-transparent' : ''} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-gray-400">{icon}</div>}
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.color && (
                  <div className={`w-3 h-3 rounded-full ${selectedOption.color.replace('text-', 'bg-').replace('100', '500')}`}></div>
                )}
                {selectedOption.icon}
                <span className="text-gray-900">{selectedOption.label}</span>
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto" role="listbox">
            {options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                  value === option.value ? 'bg-purple-50' : ''
                }`}
                role="option"
                aria-selected={value === option.value}
              >
                <div className="flex items-center gap-3">
                  {option.color && (
                    <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-').replace('100', '500')}`}></div>
                  )}
                  {option.icon}
                  <span className="text-gray-900">{option.label}</span>
                </div>
                {value === option.value && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}