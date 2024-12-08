import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { VideoRecorder } from '../../VideoRecorder';
import { RegistrationForm } from '../../RegistrationForm';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import type { FormData } from '../../../types';

interface ContactStepProps {
  onPrevious: () => void;
  formData: {
    practiceArea: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    videoUrl: string;
  };
  onUpdateFormData: (data: Partial<typeof FormData>) => void;
}

export const ContactStep = ({
  onPrevious,
  formData,
  onUpdateFormData,
}: ContactStepProps) => {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVideoChange = (blob: Blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!videoBlob) {
      alert('Please record a video introduction before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload video to Firebase Storage
      const videoRef = ref(storage, `videos/${Date.now()}-${formData.email}`);
      await uploadBytes(videoRef, videoBlob);

      // Prepare the complete form data
      const completeFormData = {
        ...formData,
        videoPath: videoRef.fullPath,
        practiceArea: formData.practiceArea,
      };

      // Send form data and video URL to server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      alert('Registration submitted successfully!');
      setVideoBlob(null);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('An error occurred while submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Complete Your Registration
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-6">
            Personal Information
          </h4>
          <RegistrationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
        <div className="lg:border-l lg:border-gray-200 lg:pl-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-6">
            Video Introduction
          </h4>
          <div className="h-[600px]">
            <VideoRecorder onVideoChange={handleVideoChange} />
          </div>
        </div>
      </div>
      <div className="mt-6">
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