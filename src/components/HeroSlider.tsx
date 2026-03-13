// components/HeroSlider.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSliderProps {
  images: Array<{ id: number; data: string; name: string }>;
  onExplore: () => void;
}

export default function HeroSlider({ images, onExplore }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredImages = images.filter(img => img.data).slice(0, 5);

  useEffect(() => {
    if (featuredImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  if (featuredImages.length === 0) {
    return (
      <div className="relative h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent animate-pulse">
            Art Gallery
          </h1>
          <p className="text-xl text-gray-400 mb-8">Shtoni foto për të filluar</p>
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50"
          >
            Eksploro Galerinë
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${featuredImages[currentIndex].data})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)',
          filter: 'brightness(0.7) blur(2px)'
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl px-4 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Arti në Gur
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            Zbuloni bukurinë e përjetshme të skulpturave tona të gdhendura me mjeshtëri
          </p>
          <button
            onClick={onExplore}
            className="group relative px-8 py-4 bg-red-600 text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50"
          >
            <span className="relative z-10">Eksploro Galerinë</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {featuredImages.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {featuredImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {featuredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-red-500' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white'
              } rounded-full`}
            />
          ))}
        </div>
      )}
    </div>
  );
}