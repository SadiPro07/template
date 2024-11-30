import React, { useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Video, StopCircle, Camera } from "lucide-react";
import { VideoRecorderProps } from "../types";
import { cn } from "../utils/cn";

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onVideoChange,
}) => {
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      video: true,
      onStop: (blobUrl, blob) => {
        setIsRecordingComplete(true);
        if (blob) {
          onVideoChange(blob);
        }
      },
    });

  // Set up live preview when recording starts
  React.useEffect(() => {
    if (previewStream && videoPreviewRef.current && status === "recording") {
      videoPreviewRef.current.srcObject = previewStream;
    }
  }, [previewStream, status]);

  const handleStartRecording = async () => {
    setIsRecordingComplete(false);
    startRecording();
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-lg overflow-hidden">
      <div
        className="relative w-full"
        style={{ minHeight: "400px", aspectRatio: "16/9" }}
      >
        {status === "recording" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoPreviewRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full"
            />
          </div>
        ) : mediaBlobUrl && isRecordingComplete ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <video src={mediaBlobUrl} controls className="w-full h-full" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Video className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-base text-gray-500">
              Your video will appear here
            </p>
          </div>
        )}

        {status === "recording" && (
          <div className="absolute top-4 right-4 z-10">
            <div className="animate-pulse flex items-center bg-black/50 px-3 py-1.5 rounded-full">
              <div className="h-3 w-3 bg-red-600 rounded-full mr-2"></div>
              <span className="text-sm text-white font-medium">Recording</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button
          onClick={
            status !== "recording" ? handleStartRecording : stopRecording
          }
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
            status !== "recording"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-red-600 text-white hover:bg-red-700"
          )}
        >
          {status !== "recording" ? (
            <>
              <Camera className="w-5 h-5" />
              Start Recording
            </>
          ) : (
            <>
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </>
          )}
        </button>

        <p className="text-sm text-center text-gray-500 mt-2">
          {status === "recording"
            ? "Recording in progress..."
            : isRecordingComplete
            ? "Recording complete! You can re-record if needed."
            : "Click to start recording your introduction"}
        </p>
      </div>
    </div>
  );
};
