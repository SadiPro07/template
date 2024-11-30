import React from 'react';
import { Mail, User, Phone, Building } from 'lucide-react';
import { RegistrationFormProps } from '../types';

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isSubmitting }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
    });
  };

  const inputFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      icon: User,
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@example.com',
      icon: Mail,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 000-0000',
      icon: Phone,
    },
    {
      id: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Company Name',
      icon: Building,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {inputFields.map(({ id, label, type, placeholder, icon: Icon }) => (
        <div key={id} className="space-y-2">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={type}
              name={id}
              id={id}
              required
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12"
              placeholder={placeholder}
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-12"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </button>
    </form>
  );
};