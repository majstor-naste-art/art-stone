import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface GalleryImage {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface HeroSectionProps {
  images: GalleryImage[];
  onExplore: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ images, onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = images.slice(0, 5);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {sliderImages.length > 0 ? (
          sliderImages.map((img, index) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img.data}
                alt={img.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">
                Premium Stone Art Gallery
              </span>
            </div>

            {/* Heading */}
            <h1 className="space-y-2">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                Arti i
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-gold-gradient leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                Përjetshëm
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                në Gur
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-stone-300 max-w-xl leading-relaxed font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Zbuloni koleksionin tonë ekskluziv të punimeve artistike në gur. 
              Çdo vepër është një dëshmi e përjetshme e artizanatit të rafinuar dhe bukurisë natyrore.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onExplore}
                className="btn-gold px-8 py-4 rounded-xl text-stone-900 font-semibold text-lg shadow-2xl flex items-center gap-3 group"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <span>Eksploro Galerinë</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button
                className="px-8 py-4 rounded-xl border-2 border-amber-500/30 text-amber-400 font-semibold text-lg hover:bg-amber-500/10 transition-all duration-300 flex items-center gap-3"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Shiko Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-amber-500/20">
              <div>
                <div className="text-3xl font-bold text-gold-gradient" style={{ fontFamily: 'Cinzel, serif' }}>
                  {images.length}+
                </div>
                <div className="text-stone-400 text-sm">Vepra Arti</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-gradient" style={{ fontFamily: 'Cinzel, serif' }}>
                  15+
                </div>
                <div className="text-stone-400 text-sm">Vite Përvojë</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-gradient" style={{ fontFamily: 'Cinzel, serif' }}>
                  100%
                </div>
                <div className="text-stone-400 text-sm">Klientë të Kënaqur</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Logo */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-amber-500/20 animate-spin-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-amber-500/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              </div>
              
              {/* Center Logo */}
              <div className="relative animate-float">
                <Logo size="xl" showText={false} />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl backdrop-blur-sm border border-amber-500/20 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">💎</span>
              </div>
              <div className="absolute -bottom-5 -left-10 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl backdrop-blur-sm border border-amber-500/20 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-2xl">🏛️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      {sliderImages.length > 0 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-amber-400 w-8'
                  : 'bg-amber-400/30 hover:bg-amber-400/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2 text-amber-400/50">
        <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-amber-400/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
