import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UploadDropzone from '@/components/upload/UploadDropzone';
import mammoth from 'mammoth';
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const AIContentDetector = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai-content-detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Failed to detect AI content');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilesAdded = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const ext = file.name.split('.').pop().toLowerCase();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      if (ext === 'txt' || file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to read TXT file.');
          setLoading(false);
        };
        reader.readAsText(file);
      } else if (ext === 'docx' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setText(value);
        setLoading(false);
      } else if (ext === 'pdf' || file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let textContent = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const txt = await page.getTextContent();
          textContent += txt.items.map(item => item.str).join(' ') + '\n';
        }
        setText(textContent);
        setLoading(false);
      } else {
        setError('Unsupported file type. Please upload PDF, DOCX, or TXT.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to extract text: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-8 bg-slate-50 min-h-[80vh] flex items-center justify-center">
      <Card className="bg-white border-slate-200 max-w-4xl w-full shadow-xl p-0 sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl mb-2">AI Content Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 min-w-[260px] flex flex-col justify-between">
                <UploadDropzone onFilesAdded={handleFilesAdded} />
              </div>
              <div className="flex-1 min-w-[260px] flex flex-col justify-between">
                <textarea
                  className="w-full min-h-[200px] md:min-h-[320px] border rounded-lg p-4 text-base resize-vertical shadow-sm focus:ring-2 focus:ring-emerald-200"
                  placeholder="Paste your text here..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-emerald-600 text-white px-8 py-3 text-lg" disabled={loading || !text.trim()}>
                {loading ? 'Analyzing...' : 'Detect AI Content'}
              </Button>
            </div>
          </form>
          {error && <div className="mt-6 text-red-600 text-base">{error}</div>}
          {result && (
            <div className="mt-10 p-6 rounded-xl border bg-slate-50 max-w-lg mx-auto">
              <div className="text-xl font-semibold mb-2">Result: <span className={result.result === 'AI-generated' ? 'text-red-600' : 'text-emerald-600'}>{result.result}</span></div>
              <div className="text-base text-slate-700">AI Score: {(result.ai_score * 100).toFixed(1)}%</div>
              <div className="text-base text-slate-700">Human Score: {(result.human_score * 100).toFixed(1)}%</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentDetector; 