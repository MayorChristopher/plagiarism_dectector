import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, CheckCircle, Shield, Clock } from 'lucide-react';

const UploadInfoGrid = () => {
  const supportedFormats = [
    { ext: 'PDF', desc: 'Portable Document Format' },
    { ext: 'DOCX', desc: 'Microsoft Word Document' },
    { ext: 'TXT', desc: 'Plain Text File' },
  ];

  const features = [
    { icon: Shield, title: "Direct Plagiarism", desc: "Exact text matches from online sources" },
    { icon: Zap, title: "Paraphrasing", desc: "AI-powered detection of rephrased content" },
    { icon: Clock, title: "Real-time Analysis", desc: "Get results in under 60 seconds" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-slate-600" />
            <span>Supported Formats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportedFormats.map((format, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">.{format.ext}</p>
                    <p className="text-xs text-slate-600">{format.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-slate-600" />
            <span>What We Check</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded flex items-center justify-center mt-0.5">
                  <feature.icon className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{feature.title}</p>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadInfoGrid;