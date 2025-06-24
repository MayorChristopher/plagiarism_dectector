import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FileText, Eye, Download, Search, Filter } from 'lucide-react';

const DocumentOversightTab = ({ documents, searchTerm, setSearchTerm }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Document Oversight</h3>
          <p className="text-muted-foreground">Monitor and moderate uploaded documents.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full sm:w-64" />
          </div>
          <Button variant="outline" size="icon" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Filter className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-colors ${doc.flagged ? 'border-destructive bg-destructive/10' : 'hover:bg-secondary/50'}`}>
            <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.flagged ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                <FileText className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold truncate">{doc.name}</h4>
                  {doc.flagged && <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs rounded-full">Flagged</span>}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>By {doc.user}</span><span>•</span>
                  <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {doc.plagiarismScore !== null && (
                <div className="text-center">
                  <div className={`text-lg font-bold ${doc.plagiarismScore < 10 ? 'text-green-600' : doc.plagiarismScore < 25 ? 'text-yellow-600' : 'text-red-600'}`}>{doc.plagiarismScore}%</div>
                  <div className="text-xs text-muted-foreground">Plagiarism</div>
                </div>
              )}
              <div className="flex space-x-2 ml-auto">
                <Button size="sm" variant="outline" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Eye className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentOversightTab;