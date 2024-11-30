import React, { useState } from "react";
import { Calendar, Info } from "lucide-react";
import { VideoRecorder } from "./components/VideoRecorder";
import { RegistrationForm } from "./components/RegistrationForm";
import { storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import type { FormData } from "./types";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalendlyClick = () => {
    window.open("https://calendly.com/your-calendar", "_blank");
  };

  const handleVideoChange = (blob: Blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!videoBlob) {
      alert("Please record a video introduction before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload video to Firebase Storage
      const videoRef = ref(storage, `videos/${Date.now()}-${formData.email}`);
      await uploadBytes(videoRef, videoBlob);

      // Send form data and video URL to server
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          videoPath: videoRef.fullPath,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }

      alert("Registration submitted successfully!");
      setShowForm(false);
      setVideoBlob(null);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert(
        "An error occurred while submitting your registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        {!showForm ? (
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                <h2 className="text-4xl font-bold text-transparent tracking-tight mb-2">
                  Ready to Get Started?
                </h2>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                Choose an option below to begin your journey with us.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleCalendlyClick}
                  className="inline-flex items-center px-8 py-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-8 py-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="max-w-[65rem] mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Complete Your Registration
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="lg:pr-8">
                    <h4 className="text-lg font-semibold text-gray-700 mb-6">
                      Personal Information
                    </h4>
                    <RegistrationForm
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                  <div className="lg:pl-8 lg:border-l lg:border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-6">
                      Video Introduction
                    </h4>
                    <div className="h-[600px] lg:h-[calc(100%-2.5rem)]">
                      <VideoRecorder onVideoChange={handleVideoChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                ← Back to options
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
