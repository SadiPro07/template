import React from 'react';
import { createRoot } from 'react-dom/client';
import { MultiStepForm } from './components/forms/MultiStepForm';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <MultiStepForm />
    </div>
  </React.StrictMode>
);