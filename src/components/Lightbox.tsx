import React, { useEffect, useCallback } from 'react';

interface GalleryImage {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface LightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full bg-stone-800/80 border border-stone-700 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 flex items-center justify-center group"
      >
        <svg 
          className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-stone-800/80 border border-stone-700 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-stone-900 transition-all duration-300 flex items-center justify-center group"
      >
        <svg 
          className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Navigation - Next */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-stone-800/80 border border-stone-700 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-stone-900 transition-all duration-300 flex items-center justify-center group"
      >
        <svg 
          className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] mx-4 animate-reveal">
        <img
          src={currentImage.data}
          alt={currentImage.name}
          className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
        />
        
        {/* Info Bar */}
        <div className="absolute -bottom-20 left-0 right-0 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-medium mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
              {currentImage.name.replace(/\.[^/.]+$/, '')}
            </h3>
            <p className="text-stone-400 text-sm flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(currentImage.date).toLocaleDateString('sq-AL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {currentImage.featured && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                  ⭐ Featured
                </span>
              )}
            </p>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-4">
            <span className="text-stone-400 text-sm">
              {currentIndex + 1} / {images.length}
            </span>
            <div className="flex gap-1">
              {images.slice(
                Math.max(0, currentIndex - 3),
                Math.min(images.length, currentIndex + 4)
              ).map((img, idx) => {
                const actualIndex = Math.max(0, currentIndex - 3) + idx;
                return (
                  <div
                    key={img.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      actualIndex === currentIndex
                        ? 'bg-amber-400 w-4'
                        : 'bg-stone-600'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-lg overflow-x-auto px-4 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => {
              const diff = idx - currentIndex;
              if (diff > 0) {
                for (let i = 0; i < diff; i++) onNext();
              } else {
                for (let i = 0; i < Math.abs(diff); i++) onPrev();
              }
            }}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              idx === currentIndex
                ? 'border-amber-500 scale-110'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={img.data}
              alt={img.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
