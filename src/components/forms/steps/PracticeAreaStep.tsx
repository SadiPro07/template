import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PracticeAreaStepProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdateFormData: (data: { practiceArea: string }) => void;
}

export const PracticeAreaStep = ({
  onNext,
  onPrevious,
  onUpdateFormData,
}: PracticeAreaStepProps) => {
  const practiceAreas = [
    'Personal Injury',
    'Family Law',
    'Corporate Law',
  ];

  const handleSelect = (area: string) => {
    if (area === 'Personal Injury') {
      onUpdateFormData({ practiceArea: area });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Choose a Practice Area</h2>
        <p className="mt-2 text-gray-600">
          Select the area of law that best matches your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {practiceAreas.map((area) => (
          <button
            key={area}
            onClick={() => handleSelect(area)}
            className="p-4 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <h3 className="font-medium">{area}</h3>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
};