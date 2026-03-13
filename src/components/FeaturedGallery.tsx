import { GalleryImage } from '../types';

interface FeaturedGalleryProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function FeaturedGallery({ images, onImageClick }: FeaturedGalleryProps) {
  if (images.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display mb-4">
              <span className="gradient-text">Featured</span> Gallery
            </h2>
            <p className="text-gray-400 text-lg">Imazhet e zgjedhura nga koleksioni ynë</p>
          </div>

          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-7xl mb-6">📸</div>
            <h3 className="text-xl font-semibold mb-2">Asnjë imazh i featured</h3>
            <p className="text-gray-400">Shkoni te Admin për të shtuar imazhe të reja</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <span>⭐</span>
            <span className="text-sm text-gray-300">Të zgjedhura</span>
          </div>
          <h2 className="text-4xl font-bold font-display mb-4">
            <span className="gradient-text">Featured</span> Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Imazhet më të bukura të zgjedhura me kujdes nga koleksioni ynë premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => onImageClick(index)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.data}
                  alt={image.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="glass-dark rounded-xl p-4">
                  <h3 className="font-semibold text-white truncate mb-1">
                    {image.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>📅 {new Date(image.date).toLocaleDateString('sq-AL')}</span>
                    <span className="flex items-center gap-1">
                      <span>⭐</span> Featured
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-semibold shadow-lg">
                  ⭐ Featured
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
