import { useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:rotate-90"
      >
        ✕
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 z-10 w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 z-10 w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            →
          </button>
        </>
      )}

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[85vh] animate-in zoom-in duration-300">
        <img
          src={currentImage.data}
          alt={currentImage.name}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Info */}
        <div className="absolute -bottom-20 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-4 glass-dark px-6 py-3 rounded-full">
            <span className="font-medium">{currentImage.name}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400 text-sm">
              {new Date(currentImage.date).toLocaleDateString('sq-AL')}
            </span>
            {currentImage.featured && (
              <>
                <span className="text-gray-400">|</span>
                <span className="text-amber-400">⭐ Featured</span>
              </>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="glass-dark px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2 px-4">
          {images.slice(0, 10).map((img, index) => (
            <button
              key={img.id}
              onClick={() => {
                // This would need to be handled by parent
              }}
              className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-violet-500 scale-110'
                  : 'opacity-50 hover:opacity-100'
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
      )}
    </div>
  );
}
