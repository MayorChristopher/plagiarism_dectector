import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const UploadDropzone = ({ onFilesAdded }) => {
  const onDrop = useCallback(acceptedFiles => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragActive 
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
          <Upload className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900 mb-2">
            Drop your files here, or <span className="text-emerald-600">browse</span>
          </p>
          <p className="text-slate-600 text-sm">
            Supports PDF, DOC, DOCX, TXT, RTF files up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDropzone;