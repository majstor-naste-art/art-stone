// components/GallerySection.tsx
import { useState } from 'react';
import { Heart, Maximize2, X } from 'lucide-react';

interface GalleryImage {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface GallerySectionProps {
  images: GalleryImage[];
  onImageClick: (index: number, images: GalleryImage[]) => void;
  title?: string;
  subtitle?: string;
  showFeaturedOnly?: boolean;
}

export default function GallerySection({ 
  images, 
  onImageClick, 
  title, 
  subtitle,
  showFeaturedOnly = false 
}: GallerySectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Të Gjitha' },
    { id: 'recent', label: 'Më të Rejat' },
    { id: 'featured', label: 'Të Zgjedhura' }
  ];

  const filteredImages = () => {
    let filtered = [...images];
    
    if (showFeaturedOnly) {
      filtered = filtered.filter(img => img.featured);
    }

    switch(selectedFilter) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 12);
      case 'featured':
        return filtered.filter(img => img.featured);
      default:
        return filtered;
    }
  };

  const displayImages = filteredImages();

  if (displayImages.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Galeria'}</h2>
          <p className="text-gray-400">Nuk ka foto në këtë kategori</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Filters */}
        {!showFeaturedOnly && (
          <div className="flex justify-center space-x-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onImageClick(index, displayImages)}
            >
              <img
                src={image.data}
                alt={image.name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                hoveredId === image.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{image.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {new Date(image.date).toLocaleDateString('sq-AL', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-red-600 transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-red-600 transition-colors">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-sm rounded-full shadow-lg">
                  Të Zgjedhura
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-500 mb-2">{images.length}</div>
            <div className="text-gray-400">Foto Gjithsej</div>
          </div>
          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {images.filter(img => img.featured).length}
            </div>
            <div className="text-gray-400">Të Zgjedhura</div>
          </div>
          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {new Date().getFullYear()}
            </div>
            <div className="text-gray-400">Viti Aktual</div>
          </div>
        </div>
      </div>
    </section>
  );
}