import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, Copy, Share2, Sparkles, KeyRound, FileJson, FileType } from 'lucide-react';
import { Button } from './ui/button';
import { DocumentData } from '../App';

interface DocumentProcessingViewProps {
  document: DocumentData;
  onBack: () => void;
  onGenerateFlashcards: (documentId: string) => void;
}

export function DocumentProcessingView({
  document,
  onBack,
  onGenerateFlashcards,
}: DocumentProcessingViewProps) {
  const [processingStage, setProcessingStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [extractedText, setExtractedText] = useState('');

  const stages = [
    'Analyzing document quality...',
    'Detecting handwriting...',
    'Extracting text...',
    'Processing complete!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          setIsProcessing(false);
          setExtractedText(`Q4 PLANNING NOTES

Meeting Agenda - October 15, 2023

1. Review Q3 Performance
   • Revenue: $2.4M (target: $2.5M)
   • Customer acquisition: 150 new clients
   • Team expansion: 5 new hires

2. Q4 Objectives
   • Launch new product line
   • Expand sales team by 30%
   • Increase marketing budget
   • Focus on customer retention

3. Key Metrics to Track
   • Monthly recurring revenue (MRR)
   • Customer lifetime value (LTV)
   • Churn rate
   • Net promoter score (NPS)

4. Action Items
   • Finalize Q4 budget by Oct 20
   • Schedule team kickoff meeting
   • Update product roadmap
   • Review vendor contracts`);
          clearInterval(interval);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const intelligentActions = [
    { icon: Sparkles, label: 'Summarize', description: 'Get a concise summary' },
    { icon: KeyRound, label: 'Extract Keywords', description: 'Identify key terms' },
    { icon: FileText, label: 'Generate Flashcards', description: 'Create study cards', action: () => onGenerateFlashcards(document.id) },
  ];

  const exportOptions = [
    { icon: FileType, label: 'Export as PDF' },
    { icon: FileJson, label: 'Export as Word' },
    { icon: Copy, label: 'Copy to Clipboard' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-lg">{document.title}</h2>
            <p className="text-sm text-gray-400">Light Mode</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Document Preview */}
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                  {isProcessing ? (
                    <div className="text-center space-y-4 px-8">
                      <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-gray-300">{stages[processingStage]}</p>
                      <div className="w-full max-w-xs bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-blue-500 h-full transition-all duration-500"
                          style={{ width: `${((processingStage + 1) / stages.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white text-black p-8 overflow-y-auto">
                      <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl mb-2">Q4 PLANNING NOTES</h3>
                          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded" />
                        </div>
                        <div className="text-sm whitespace-pre-line leading-relaxed">
                          {extractedText}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Extracted Text (if processing complete) */}
              {!isProcessing && (
                <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">Extracted Text</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-teal-400 hover:text-teal-300"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {extractedText}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Intelligent Actions */}
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg mb-4">Intelligent Actions</h3>
                <div className="space-y-3">
                  {intelligentActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      disabled={isProcessing}
                      className="w-full flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white">{action.label}</p>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg mb-4">Correct Text Edits</h3>
                <div className="space-y-2">
                  {exportOptions.map((option, index) => (
                    <Button
                      key={index}
                      disabled={isProcessing}
                      className="w-full justify-start bg-white/5 hover:bg-white/10 text-white border-0"
                    >
                      <option.icon className="w-4 h-4 mr-3" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Connected Files */}
              {!isProcessing && (
                <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Connected files</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
