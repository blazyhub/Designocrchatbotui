import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { AnimatedBackground } from './AnimatedBackground';

interface LoginViewProps {
  onLogin: (email: string, password: string) => void;
  onGuestLogin: () => void;
}

export function LoginView({ onLogin, onGuestLogin }: LoginViewProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleGuestLogin = () => {
    onGuestLogin();
  };

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-400">AI-Powered OCR Technology</span>
            </div>
            
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text text-transparent">
                Welcome to
                <br />
                CogniScan AI
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-lg">
                Transform handwritten notes, receipts, and documents into intelligent, searchable data with cutting-edge AI.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-white mb-1">Smart OCR</h3>
                <p className="text-xs text-gray-400">Extract text from any document with 99% accuracy</p>
              </div>

              <div className="bg-gradient-to-br from-teal-500/10 to-emerald-600/5 border border-teal-500/20 rounded-2xl p-4 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-white mb-1">Real-time AR</h3>
                <p className="text-xs text-gray-400">Translate signs instantly with your camera</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/5 border border-orange-500/20 rounded-2xl p-4 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-white mb-1">AI Learning</h3>
                <p className="text-xs text-gray-400">Generate flashcards from your notes automatically</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 justify-center lg:justify-start">
              <div>
                <p className="text-3xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">99%</p>
                <p className="text-sm text-gray-500">Accuracy Rate</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-3xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">50+</p>
                <p className="text-sm text-gray-500">Languages</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-3xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">24/7</p>
                <p className="text-sm text-gray-500">Available</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl blur-xl opacity-20" />
              
              <div className="relative bg-[#0f0f0f]/90 border border-white/20 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                      <span className="text-2xl">CS</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl text-center mb-6">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>

                {/* Toggle Tabs */}
                <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      !isSignUp
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      isSignUp
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-0 blur transition-opacity ${focusedField === 'name' ? 'opacity-20' : 'group-hover:opacity-10'}`} />
                      <div className="relative flex items-center">
                        <User className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-teal-400' : 'text-gray-500'}`} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Full Name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-0 blur transition-opacity ${focusedField === 'email' ? 'opacity-20' : 'group-hover:opacity-10'}`} />
                    <div className="relative flex items-center">
                      <Mail className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-teal-400' : 'text-gray-500'}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-0 blur transition-opacity ${focusedField === 'password' ? 'opacity-20' : 'group-hover:opacity-10'}`} />
                    <div className="relative flex items-center">
                      <Lock className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-teal-400' : 'text-gray-500'}`} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  {!isSignUp && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-teal-500" />
                        Remember me
                      </label>
                      <button type="button" className="text-teal-400 hover:text-teal-300 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-0 rounded-xl py-6 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/50 group"
                  >
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0f0f0f] text-gray-400">or continue with</span>
                  </div>
                </div>

                <Button
                  onClick={handleGuestLogin}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl py-6 transition-all hover:scale-[1.02] group"
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>Continue as Guest</span>
                  <Sparkles className="w-4 h-4 ml-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                {isSignUp && (
                  <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                    By signing up, you agree to our{' '}
                    <button className="text-teal-400 hover:text-teal-300 transition-colors">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button className="text-teal-400 hover:text-teal-300 transition-colors">
                      Privacy Policy
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}