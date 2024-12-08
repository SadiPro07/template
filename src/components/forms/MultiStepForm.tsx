import React, { useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { WelcomeStep } from './steps/WelcomeStep';
import { PracticeAreaStep } from './steps/PracticeAreaStep';
import { ContactStep } from './steps/ContactStep';

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    practiceArea: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    videoUrl: '',
  });

  const totalSteps = 3;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleUpdateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
      case 2:
        return (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative h-48 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80"
                  alt="Law office"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Oakwood Law</h2>
                    <p className="text-blue-100">Your Trusted Legal Partner</p>
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="p-8">
                {currentStep === 1 ? (
                  <WelcomeStep onNext={handleNext} />
                ) : (
                  <PracticeAreaStep
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onUpdateFormData={handleUpdateFormData}
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <ContactStep
              onPrevious={handlePrevious}
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* <div className="mb-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div> */}
      {renderStep()}
    </div>
  );
};