import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const UploadDropzone = ({ onDrag, onDrop, onFileSelect, dragActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={(e) => onFileSelect(Array.from(e.target.files))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <Upload className="h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">
              Drop your files here, or <span className="text-primary">browse</span>
            </p>
            <p className="text-muted-foreground text-sm">
              Supports PDF, DOC, DOCX, TXT, RTF files up to 10MB
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadDropzone;