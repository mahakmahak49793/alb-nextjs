"use client"
import React, { useState, useRef } from 'react';
import { Upload, X, Image, Video, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface UploadResponse {
  message: string;
  url: string;
  key: string;
  fileName: string;
  fileType: 'image' | 'video';
  optimization: {
    originalSize: string;
    finalSize: string;
    compressionRatio: string;
    targetAchieved?: boolean;
    finalFormat: string;
    compressionSkipped: boolean;
    resolutionReduced?: boolean;
    finalQuality?: number;
    reason?: string;
  };
  performance: {
    totalIterations?: number;
    compressionTime?: string;
    strategy?: string;
    uploadTime: string;
    totalProcessTime: string;
  };
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  response?: UploadResponse;
  error?: string;
}

export default function MediaUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 
      'video/webm', 'video/x-matroska' , 'image/avif'
    ];

    const newFiles: UploadedFile[] = Array.from(selectedFiles)
      .filter(file => {
        if (!allowedTypes.includes(file.type)) {
          alert(`${file.name} - Invalid file type`);
          return false;
        }
        if (file.size > 200 * 1024 * 1024) {
          alert(`${file.name} - File too large (max 100MB)`);
          return false;
        }
        return true;
      })
      .map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : '',
        status: 'pending' as const,
        progress: 0,
      }));

    setFiles(prev => [...prev, ...newFiles]);

    // Auto-upload
    newFiles.forEach(uploadFile);
  };

  const uploadFile = async (uploadedFile: UploadedFile) => {
    const { id, file } = uploadedFile;

    setFiles(prev =>
      prev.map(f => f.id === id ? { ...f, status: 'uploading', progress: 50 } : f)
    );

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/aws-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setFiles(prev =>
        prev.map(f =>
          f.id === id
            ? { ...f, status: 'success', progress: 100, response: data }
            : f
        )
      );
    } catch (err) {
      setFiles(prev =>
        prev.map(f =>
          f.id === id
            ? {
                ...f,
                status: 'error',
                progress: 0,
                error: err instanceof Error ? err.message : 'Upload failed',
              }
            : f
        )
      );
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AWS Media Uploader
          </h1>
          <p className="text-gray-600">
            Upload images & videos to AWS S3 with automatic compression
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          }`}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Drag & drop files here
          </h3>
          <p className="text-gray-500 mb-4">
            or click to browse
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={e => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <p className="text-sm text-gray-400 mt-4">
            Supported: JPEG, PNG, GIF, WebP, MP4, MPEG, MOV, AVI, WebM, MKV (Max 100MB)
          </p>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Uploads</h2>
            {files.map(f => (
              <div
                key={f.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Preview/Icon */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {f.preview ? (
                      <img
                        src={f.preview}
                        alt={f.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Video className="w-10 h-10 text-gray-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {f.file.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {(f.file.size / 1024).toFixed(0)} KB • {f.file.type}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(f.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Status */}
                    {f.status === 'uploading' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm font-medium">Uploading...</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {f.status === 'success' && f.response && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Upload Successful!</span>
                        </div>

                        {/* Optimization Info */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Original Size</p>
                            <p className="font-semibold text-gray-800">
                              {f.response.optimization.originalSize}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Final Size</p>
                            <p className="font-semibold text-gray-800">
                              {f.response.optimization.finalSize}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Compression</p>
                            <p className="font-semibold text-gray-800">
                              {f.response.optimization.compressionRatio}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Process Time</p>
                            <p className="font-semibold text-gray-800">
                              {f.response.performance.totalProcessTime}
                            </p>
                          </div>
                        </div>

                        {/* URL */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">S3 URL:</p>
                          <a
                            href={f.response.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 break-all"
                          >
                            {f.response.url}
                          </a>
                        </div>
                      </div>
                    )}

                    {f.status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          Error: {f.error}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}