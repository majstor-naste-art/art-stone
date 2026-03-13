import { useState } from 'react';
import { GalleryImage } from '../types';

interface GalleryPageProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function GalleryPage({ images, onImageClick }: GalleryPageProps) {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter((img) => {
    const matchesFilter = filter === 'all' || img.featured;
    const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Galeria</span> e Plotë
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Shfletoni të gjitha imazhet e ngarkuara në koleksionin tonë
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Kërko imazhe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 px-5 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                Të gjitha ({images.length})
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filter === 'featured'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                ⭐ Featured ({images.filter((i) => i.featured).length})
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-7xl mb-6">🖼️</div>
            <h3 className="text-xl font-semibold mb-2">Asnjë imazh</h3>
            <p className="text-gray-400">
              {searchTerm
                ? 'Nuk u gjet asnjë imazh me këtë kërkim'
                : 'Nuk ka imazhe të ngarkuara ende'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => onImageClick(images.indexOf(image))}
                className="group relative rounded-xl overflow-hidden cursor-pointer glass hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-medium text-sm truncate">
                      {image.name}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {new Date(image.date).toLocaleDateString('sq-AL')}
                    </p>
                  </div>
                </div>

                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      ⭐
                    </div>
                  </div>
                )}

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xl">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text">{images.length}</div>
            <div className="text-gray-400 text-sm">Total Imazhe</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text">
              {images.filter((i) => i.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text">
              {(images.reduce((acc, i) => acc + i.size, 0) / 1024 / 1024).toFixed(1)}MB
            </div>
            <div className="text-gray-400 text-sm">Total Size</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text">HD</div>
            <div className="text-gray-400 text-sm">Cilësi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
