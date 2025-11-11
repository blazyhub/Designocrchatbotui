import { useState } from 'react';
import { ChatView } from './components/ChatView';
import { CameraView } from './components/CameraView';
import { FlashcardView } from './components/FlashcardView';
import { DocumentProcessingView } from './components/DocumentProcessingView';
import { LoginView } from './components/LoginView';

export type ViewType = 'chat' | 'camera' | 'flashcard' | 'processing';

export interface DocumentData {
  id: string;
  title: string;
  thumbnail?: string;
  extractedText?: string;
  type?: 'receipt' | 'notes' | 'legal' | 'general';
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('chat');
  const [processingDocument, setProcessingDocument] = useState<DocumentData | null>(null);
  const [flashcardSet, setFlashcardSet] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleGuestLogin = () => {
    setUserEmail('guest');
    setIsAuthenticated(true);
  };

  const handleScanDocument = (file?: File) => {
    setProcessingDocument({
      id: Date.now().toString(),
      title: file?.name || 'Scanned Document',
      type: 'notes',
    });
    setCurrentView('processing');
  };

  const handleOpenCamera = () => {
    setCurrentView('camera');
  };

  const handleGenerateFlashcards = (documentId: string) => {
    setFlashcardSet({
      id: documentId,
      title: 'Q4 Tasks',
      cards: [
        { question: 'What are Q4 revenue targets', answer: '$3M USD 15% 156 Growth' },
        { question: 'Key Q4 Priorities', answer: 'Launch new product line, expand sales team' },
        { question: 'Budget allocation', answer: '40% Marketing, 30% R&D, 30% Operations' },
      ],
    });
    setCurrentView('flashcard');
  };

  const handleBackToChat = () => {
    setCurrentView('chat');
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
        <LoginView onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      {currentView === 'chat' && (
        <ChatView
          onScanDocument={handleScanDocument}
          onOpenCamera={handleOpenCamera}
          onGenerateFlashcards={handleGenerateFlashcards}
        />
      )}
      {currentView === 'processing' && processingDocument && (
        <DocumentProcessingView
          document={processingDocument}
          onBack={handleBackToChat}
          onGenerateFlashcards={handleGenerateFlashcards}
        />
      )}
      {currentView === 'camera' && <CameraView onBack={handleBackToChat} />}
      {currentView === 'flashcard' && flashcardSet && (
        <FlashcardView flashcardSet={flashcardSet} onBack={handleBackToChat} />
      )}
    </div>
  );
}