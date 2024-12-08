import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Oakwood Law</h2>
        <p className="mt-2 text-gray-600">
          We're here to help you with your legal needs. Let's get started by
          understanding how we can assist you today.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">Expert Legal Team</h3>
          <p className="text-sm text-gray-600">Our attorneys have decades of combined experience</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">Personalized Approach</h3>
          <p className="text-sm text-gray-600">Tailored solutions for your unique situation</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">Proven Track Record</h3>
          <p className="text-sm text-gray-600">Successfully handled thousands of cases</p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
};