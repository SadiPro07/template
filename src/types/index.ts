export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface VideoRecorderProps {
  onVideoChange: (videoBlob: Blob) => void;
}

export interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}