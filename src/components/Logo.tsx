import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[8px]' },
    md: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-xs' },
    xl: { icon: 'w-28 h-28', text: 'text-5xl', sub: 'text-sm' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Diamond/Stone Shape */}
      <div className={`${sizes[size].icon} relative group`}>
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Main container */}
        <div className="relative w-full h-full bg-gradient-to-br from-stone-900 to-stone-800 rounded-xl border-2 border-amber-500/50 overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
          {/* Inner shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-transparent" />
          
          {/* Diamond shape */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Stone/Diamond icon */}
              <svg 
                viewBox="0 0 100 100" 
                className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-16 h-16'} drop-shadow-lg`}
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b8860b" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#b8860b" />
                  </linearGradient>
                  <linearGradient id="stoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a4a4a" />
                    <stop offset="50%" stopColor="#6a6a6a" />
                    <stop offset="100%" stopColor="#3a3a3a" />
                  </linearGradient>
                </defs>
                {/* Diamond shape */}
                <polygon 
                  points="50,5 95,50 50,95 5,50" 
                  fill="url(#stoneGradient)"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                />
                {/* Inner facets */}
                <polygon 
                  points="50,15 80,50 50,85 20,50" 
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                {/* Center shine */}
                <polygon 
                  points="50,30 65,50 50,70 35,50" 
                  fill="url(#goldGradient)"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-amber-400/60 rounded-tl" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-amber-400/60 rounded-tr" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-amber-400/60 rounded-bl" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-amber-400/60 rounded-br" />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${sizes[size].text} font-bold tracking-wider`} style={{ fontFamily: 'Cinzel, serif' }}>
            <span className="text-gold-gradient">ART</span>
            <span className="text-stone-300">-</span>
            <span className="text-stone-200">STONE</span>
          </h1>
          <p className={`${sizes[size].sub} text-amber-500/80 tracking-[0.3em] uppercase font-light`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Premium Stone Gallery
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
