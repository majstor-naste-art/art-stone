import { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';

interface HeroSectionProps {
  images: GalleryImage[];
  onExploreClick: () => void;
}

export function HeroSection({ images, onExploreClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = images.slice(0, 10);

  const nextSlide = useCallback(() => {
    if (sliderImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    if (sliderImages.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    }
  }, [sliderImages.length]);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length, nextSlide]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-300">Premium Collection</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">Art-Stone</span>
              <br />
              <span className="text-white">Gallery</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Zbuloni koleksionin tonë premium të imazheve artistike. 
              Një galeri moderne për të apasionuarit pas artit dhe fotografisë.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onExploreClick}
                className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Eksploro Galerinë
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 glass rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                <span>▶</span>
                Shiko Video
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold gradient-text">{images.length}+</div>
                <div className="text-gray-400 text-sm">Imazhe</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-gray-400 text-sm">Cilësi</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-gray-400 text-sm">Online</div>
              </div>
            </div>
          </div>

          {/* Hero Slider */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {sliderImages.length > 0 ? (
                  sliderImages.map((img, index) => (
                    <div
                      key={img.id}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentSlide
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={img.data}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🖼️</div>
                      <p className="text-gray-400">Ngarko imazhe për slider</p>
                    </div>
                  </div>
                )}

                {/* Slider Info */}
                {sliderImages.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="glass-dark px-4 py-2 rounded-xl">
                      <p className="text-white font-medium truncate max-w-[200px]">
                        {sliderImages[currentSlide]?.name}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {sliderImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? 'w-6 bg-white'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Slider Controls */}
              {sliderImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-2xl animate-float">
              ✨
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-3xl shadow-2xl animate-float delay-500">
              🎨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
