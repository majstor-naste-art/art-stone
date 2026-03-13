import React, { useState, useMemo } from 'react';

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
  showFeaturedOnly?: boolean;
  title?: string;
  subtitle?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  onImageClick,
  showFeaturedOnly = false,
  title = "Koleksioni Ynë",
  subtitle = "Zbuloni veprat më të mira të artit në gur"
}) => {
  const [filter, setFilter] = useState<'all' | 'featured' | 'recent'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = useMemo(() => {
    let result = showFeaturedOnly ? images.filter(img => img.featured) : images;

    // Apply filter
    if (filter === 'featured') {
      result = result.filter(img => img.featured);
    } else if (filter === 'recent') {
      result = [...result].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, 12);
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(img =>
        img.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [images, filter, searchTerm, showFeaturedOnly]);

  return (
    <section className="py-20 bg-stone-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-400 text-sm tracking-[0.3em] uppercase font-medium">
              Galeria
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            {title}
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {subtitle}
          </p>
        </div>

        {/* Filters & Search */}
        {!showFeaturedOnly && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'Të Gjitha', icon: '🖼️' },
                { id: 'featured', label: 'Të Zgjedhura', icon: '⭐' },
                { id: 'recent', label: 'Të Fundit', icon: '🕐' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id as 'all' | 'featured' | 'recent')}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    filter === item.id
                      ? 'bg-amber-500 text-stone-900'
                      : 'bg-stone-800/50 text-stone-300 hover:bg-stone-800 border border-stone-700'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kërko foto..."
                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => onImageClick(index, filteredImages)}
                className="card-luxury group cursor-pointer rounded-2xl overflow-hidden bg-stone-900/50 border border-stone-800"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured badge */}
                  {image.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-stone-900 text-xs font-semibold flex items-center gap-1">
                      <span>⭐</span>
                      <span>Featured</span>
                    </div>
                  )}

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium truncate mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                    {image.name.replace(/\.[^/.]+$/, '')}
                  </h3>
                  <p className="text-stone-500 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(image.date).toLocaleDateString('sq-AL')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-stone-800/50 flex items-center justify-center">
              <span className="text-4xl">📷</span>
            </div>
            <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Nuk u gjetën foto
            </h3>
            <p className="text-stone-500">
              {searchTerm 
                ? 'Provoni të kërkoni me terma të tjerë'
                : 'Shtoni foto nga paneli i administratorit'}
            </p>
          </div>
        )}

        {/* View All Button (for featured section) */}
        {showFeaturedOnly && images.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 rounded-xl border-2 border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all duration-300 inline-flex items-center gap-2">
              <span style={{ fontFamily: 'Cinzel, serif' }}>Shiko të Gjitha</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
