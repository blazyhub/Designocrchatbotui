import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Zap, ZapOff, Circle, Square, Languages } from 'lucide-react';
import { Button } from './ui/button';

interface CameraViewProps {
  onBack: () => void;
}

export function CameraView({ onBack }: CameraViewProps) {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('Auto-detect');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate camera feed
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log('Camera access not available in this environment');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const toggleFreeze = () => {
    setIsFrozen(!isFrozen);
    if (videoRef.current && videoRef.current.srcObject) {
      if (isFrozen) {
        videoRef.current.play().catch(err => {
          console.log('Play interrupted:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Camera Feed */}
      <div className="flex-1 relative bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Camera feed placeholder when camera not available */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 mx-auto flex items-center justify-center">
              <Languages className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
            <p className="text-sm sm:text-base text-gray-400">Camera View (Demo Mode)</p>
          </div>
        </div>

        {/* AR Translation Overlay */}
        {isFrozen && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Simulated text detection boxes */}
            <div className="absolute top-1/4 sm:top-1/3 left-1/4 w-1/2">
              <div className="border-2 border-teal-500 rounded p-2 bg-black/50 backdrop-blur-sm">
                <p className="text-xs text-gray-400 line-through">Bienvenue</p>
                <p className="text-sm sm:text-base text-white">Welcome</p>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-2/3 sm:w-1/3">
              <div className="border-2 border-teal-500 rounded p-2 bg-black/50 backdrop-blur-sm">
                <p className="text-xs text-gray-400 line-through">Sortie</p>
                <p className="text-sm sm:text-base text-white">Exit</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 w-10 h-10 sm:w-12 sm:h-12"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">{sourceLanguage} → {targetLanguage}</span>
                <span className="sm:hidden">
                  <Languages className="w-4 h-4" />
                </span>
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFlashOn(!isFlashOn)}
              className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 w-10 h-10 sm:w-12 sm:h-12"
            >
              {isFlashOn ? <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <ZapOff className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>

        {/* Language Selector Overlay */}
        {showLanguageSelector && (
          <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 backdrop-blur-xl w-[calc(100%-2rem)] sm:w-80 max-w-md">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">From</label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm sm:text-base text-white outline-none"
                >
                  <option value="Auto-detect">Auto-detect</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">To</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm sm:text-base text-white outline-none"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
              <Button
                onClick={() => setShowLanguageSelector(false)}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-0"
              >
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <Square className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button
              onClick={toggleFreeze}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-4 border-white/30"
            >
              <Circle className="w-7 h-7 sm:w-8 sm:h-8" />
            </Button>

            <div className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="text-center mt-4">
            <p className="text-xs sm:text-sm text-gray-300">
              {isFrozen ? 'Tap detected text to interact' : 'Real-time Translate Mode'}
            </p>
            {isFrozen && (
              <Button
                onClick={toggleFreeze}
                className="mt-2 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm text-xs sm:text-sm px-4 sm:px-6"
              >
                Unfreeze Frame
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}