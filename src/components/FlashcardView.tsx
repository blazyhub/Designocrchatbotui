import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  cards: Flashcard[];
}

interface FlashcardViewProps {
  flashcardSet: FlashcardSet;
  onBack: () => void;
}

export function FlashcardView({ flashcardSet, onBack }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());

  const currentCard = flashcardSet.cards[currentIndex];
  const progress = ((currentIndex + 1) / flashcardSet.cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcardSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (difficulty === 'easy') {
      setMasteredCards(new Set([...masteredCards, currentIndex]));
    }
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
  };

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
            <h2 className="text-lg">Flashcards: {flashcardSet.title}</h2>
            <p className="text-sm text-gray-400">
              {currentIndex + 1} / {flashcardSet.cards.length} cards
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="rounded-full hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div
            onClick={handleFlip}
            className="relative cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative w-full h-96 transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of card (Question) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-teal-500/50 rounded-3xl p-8 flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500" />
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-4">Question</p>
                  <h3 className="text-2xl">{currentCard.question}</h3>
                </div>
                <p className="text-sm text-gray-400 mt-8">Tap to reveal answer</p>
              </div>

              {/* Back of card (Answer) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-blue-500/50 rounded-3xl p-8 flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-4">Answer</p>
                  <h3 className="text-2xl">{currentCard.answer}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Feedback */}
          <div className="mt-8 space-y-4">
            {isFlipped && (
              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={() => handleDifficulty('hard')}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-full px-6"
                >
                  Hard
                </Button>
                <Button
                  onClick={() => handleDifficulty('medium')}
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 rounded-full px-6"
                >
                  Good
                </Button>
                <Button
                  onClick={() => handleDifficulty('easy')}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 rounded-full px-6"
                >
                  Easy
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {flashcardSet.cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-teal-500 w-6'
                        : masteredCards.has(index)
                        ? 'bg-green-500'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={currentIndex === flashcardSet.cards.length - 1}
                className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full disabled:opacity-30"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl text-teal-400">{masteredCards.size}</p>
              <p className="text-sm text-gray-400 mt-1">Mastered</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl text-white">{currentIndex + 1}</p>
              <p className="text-sm text-gray-400 mt-1">Current</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl text-gray-400">
                {flashcardSet.cards.length - currentIndex - 1}
              </p>
              <p className="text-sm text-gray-400 mt-1">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
