import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, FileText, Camera, Check, X } from 'lucide-react';

interface DocumentUploadForm {
  nationalIdFront?: File;
  nationalIdBack?: File;
  employmentLetter?: File;
  latestPayslip?: File;
  selfiePhoto?: File;
}

export function DocumentUploadStep() {
  const { formData, updateFormData, previousStep, markStepCompleted, submitOnboarding, isSubmitting } = useOnboardingStore();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { handleSubmit } = useForm<DocumentUploadForm>();

  const handleFileUpload = (fieldName: string, file: File) => {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('File size must be less than 2MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and PDF files are allowed');
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
    
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [fieldName]: url }));
    }
  };

  const removeFile = (fieldName: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
    
    setPreviewUrls(prev => {
      const newUrls = { ...prev };
      if (newUrls[fieldName]) {
        URL.revokeObjectURL(newUrls[fieldName]);
        delete newUrls[fieldName];
      }
      return newUrls;
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturingPhoto(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please upload a photo instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
          handleFileUpload('selfiePhoto', file);
          stopCamera();
        }
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturingPhoto(false);
  };

  const onSubmit = async () => {
    updateFormData(uploadedFiles);
    markStepCompleted(6);
    await submitOnboarding();
  };

  const documentFields = [
    {
      key: 'nationalIdFront',
      label: 'National ID (Front)',
      description: 'Clear photo of the front of your Ghana Card',
      required: true
    },
    {
      key: 'nationalIdBack',
      label: 'National ID (Back)',
      description: 'Clear photo of the back of your Ghana Card',
      required: true
    },
    {
      key: 'employmentLetter',
      label: 'Employment Letter',
      description: 'Official employment letter from your employer',
      required: true
    },
    {
      key: 'latestPayslip',
      label: 'Latest Payslip',
      description: 'Your most recent salary slip',
      required: true
    }
  ];

  const requiredDocsUploaded = documentFields.every(field => 
    field.required ? uploadedFiles[field.key] : true
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Document Upload</h2>
          <p className="text-gray-600">Upload required documents to verify your identity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Document Upload Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentFields.map((field) => (
            <div key={field.key} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
                {uploadedFiles[field.key] && (
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <button
                      type="button"
                      onClick={() => removeFile(field.key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {uploadedFiles[field.key] ? (
                <div className="space-y-2">
                  {previewUrls[field.key] && (
                    <img
                      src={previewUrls[field.key]}
                      alt={field.label}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  )}
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {uploadedFiles[field.key].name}
                  </p>
                </div>
              ) : (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(field.key, file);
                    }}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload</p>
                    <p className="text-xs text-gray-500">JPEG, PNG, PDF (max 2MB)</p>
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Selfie Capture */}
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-medium text-blue-800">Selfie Photo</h3>
              <p className="text-sm text-blue-600">Take a live photo for identity verification</p>
            </div>
          </div>

          {isCapturingPhoto ? (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md mx-auto rounded-lg border"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex justify-center space-x-3">
                <Button type="button" onClick={capturePhoto}>
                  Capture Photo
                </Button>
                <Button type="button" variant="outline" onClick={stopCamera}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : uploadedFiles.selfiePhoto ? (
            <div className="text-center space-y-3">
              {previewUrls.selfiePhoto && (
                <img
                  src={previewUrls.selfiePhoto}
                  alt="Selfie"
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-green-200"
                />
              )}
              <p className="text-sm text-green-600 font-medium">✓ Selfie captured successfully</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFile('selfiePhoto')}
              >
                Retake Photo
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Button type="button" onClick={startCamera} className="mb-3">
                <Camera className="w-4 h-4 mr-2" />
                Take Selfie
              </Button>
              <p className="text-xs text-gray-500">
                Or upload a clear photo of yourself
              </p>
              <label className="block mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('selfiePhoto', file);
                  }}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </label>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Upload Progress</h4>
          <div className="space-y-2">
            {documentFields.map((field) => (
              <div key={field.key} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{field.label}</span>
                {uploadedFiles[field.key] ? (
                  <span className="text-green-600 font-medium">✓ Uploaded</span>
                ) : (
                  <span className="text-gray-400">Pending</span>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Selfie Photo</span>
              {uploadedFiles.selfiePhoto ? (
                <span className="text-green-600 font-medium">✓ Captured</span>
              ) : (
                <span className="text-gray-400">Pending</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            className="flex items-center space-x-2 px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            type="submit"
            disabled={!requiredDocsUploaded || !uploadedFiles.selfiePhoto || isSubmitting}
            className="flex items-center space-x-2 px-6 py-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Complete Setup</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}