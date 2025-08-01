import React, { useEffect, useState } from 'react';
import { ArrowRight, Brain, Sparkles, Zap } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export default function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-xl opacity-60 animate-float-${i % 4}`}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, 
                ${['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)]}, 
                ${['#EC4899', '#EF4444', '#06B6D4', '#84CC16'][Math.floor(Math.random() * 4)]}
              )`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Central Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo Animation */}
        <div className={`mb-12 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-75'
          }`}>
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-blue-400/40 animate-spin-reverse"></div>

              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>

              {/* Orbiting Icons */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title Animation */}
        <div className={`mb-8 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
          <h1 className="text-7xl md:text-8xl font-black mb-4">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient">
              Pypes
            </span>
            <span className="block text-4xl md:text-5xl font-bold text-white/80 mt-2">
              AI Paper Trail
            </span>
          </h1>
        </div>

        {/* Subtitle Animation */}
        <div className={`mb-12 transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Transform your business with intelligent CRM
          </p>
        </div>

        {/* CTA Button Animation */}
        <div className={`transform transition-all duration-1000 delay-700 ${showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}>
          <button
            onClick={onGetStarted}
            className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 mx-auto overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button Content */}
            <div className="relative flex items-center gap-4">
              <span className="group-hover:scale-110 transition-transform duration-300">
                Get Started
              </span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </button>
        </div>

        {/* Floating Action Hint */}
        <div className={`mt-16 transform transition-all duration-1000 delay-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white/60 text-sm">Ready to transform your business?</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      {/* @ts-ignore */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, -60px) rotate(180deg); }
          75% { transform: translate(-50px, -20px) rotate(270deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-40px, 40px) rotate(-90deg); }
          50% { transform: translate(30px, 80px) rotate(-180deg); }
          75% { transform: translate(60px, 30px) rotate(-270deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.2); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(0.8); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float-0 { animation: float-0 12s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 15s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 13s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}