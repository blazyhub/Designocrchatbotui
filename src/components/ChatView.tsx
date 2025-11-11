import { useState, useRef } from 'react';
import { Send, Mic, Camera, Paperclip, FileText, Languages, FolderOpen, ListChecks, Database, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedBackground } from './AnimatedBackground';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  cardType?: 'text' | 'document' | 'actions';
  documentData?: {
    title: string;
    thumbnail?: string;
    preview?: string;
  };
}

interface ChatViewProps {
  onScanDocument: (file?: File) => void;
  onOpenCamera: () => void;
  onGenerateFlashcards: (documentId: string) => void;
}

export function ChatView({ onScanDocument, onOpenCamera, onGenerateFlashcards }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Welcome back! What can I help you with today?',
      timestamp: new Date(),
      cardType: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuickAction = (action: string) => {
    if (action === 'scan') {
      fileInputRef.current?.click();
    } else if (action === 'translate') {
      onOpenCamera();
    } else if (action === 'files') {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: 'Show me my files',
        timestamp: new Date(),
        cardType: 'text',
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Here are your recent documents:',
          timestamp: new Date(),
          cardType: 'document',
          documentData: {
            title: 'Q4 Planning Notes.pdf',
            preview: 'Scan files like handwritten meeting agenda...',
          },
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 800);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `Uploaded: ${file.name}`,
        timestamp: new Date(),
        cardType: 'text',
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        onScanDocument(file);
      }, 500);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      cardType: 'text',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I can help you with that! Would you like to scan a document, translate text, or view your files?",
        timestamp: new Date(),
        cardType: 'text',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const suggestedPrompts = [
    {
      icon: ListChecks,
      text: 'Summarize these handwritten notes for key action items',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Database,
      text: 'Convert this receipt into a structured JSON file',
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      icon: BookOpen,
      text: 'Generate flashcards from my study material',
      gradient: 'from-orange-500 to-amber-600',
    },
  ];

  const handleSuggestedPrompt = (promptText: string) => {
    setInputValue(promptText);
  };

  return (
    <div className="flex flex-col h-full relative">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <span className="text-sm">CS</span>
          </div>
          <h1 className="text-xl">CogniScan AI</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <div className="w-full max-w-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0 flex items-center justify-center mt-1">
                    <span className="text-xs">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
                      <p className="text-gray-200">{message.content}</p>
                    </div>

                    {message.id === '1' && (
                      <>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Button
                            onClick={() => handleQuickAction('scan')}
                            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border-0 rounded-full transition-all hover:scale-105"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Scan Document
                          </Button>
                          <Button
                            onClick={() => handleQuickAction('translate')}
                            className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm transition-all hover:scale-105"
                          >
                            <Languages className="w-4 h-4 mr-2" />
                            Translate Sign
                          </Button>
                          <Button
                            onClick={() => handleQuickAction('files')}
                            className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm transition-all hover:scale-105"
                          >
                            <FolderOpen className="w-4 h-4 mr-2" />
                            View My Files
                          </Button>
                        </div>

                        {/* Suggested Prompts Section */}
                        <div className="mt-6">
                          <h3 className="text-sm text-gray-400 mb-3">Suggested Prompts</h3>
                          <div className="space-y-3">
                            {suggestedPrompts.map((prompt) => (
                              <button
                                key={prompt.text}
                                onClick={() => handleSuggestedPrompt(prompt.text)}
                                className={`w-full flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r ${prompt.gradient} bg-opacity-10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] text-left group`}
                              >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${prompt.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                  <prompt.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1 pt-2">
                                  {prompt.text}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {message.cardType === 'document' && message.documentData && (
                      <div className="mt-3 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-white">{message.documentData.title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{message.documentData.preview}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onScanDocument()}
                            className="bg-teal-500 hover:bg-teal-600 text-white border-0 rounded-lg flex-1"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => onGenerateFlashcards('doc1')}
                            className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-lg flex-1"
                          >
                            Generate Flashcards
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {message.type === 'user' && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-4 py-3 max-w-md">
                <p className="text-white">{message.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="px-6 py-4 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-3 backdrop-blur-sm">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything or upload a file..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="rounded-full hover:bg-white/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-teal-500/20"
          >
            <Mic className="w-5 h-5 text-gray-400 hover:text-teal-400 transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCamera}
            className="rounded-full hover:bg-white/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Camera className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full hover:bg-white/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Paperclip className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full w-10 h-10 p-0 transition-all hover:scale-110 hover:shadow-lg hover:shadow-teal-500/50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}