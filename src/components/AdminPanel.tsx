import { useRef, useState } from 'react';
import { GalleryImage } from '../types';

interface AdminPanelProps {
  images: GalleryImage[];
  onAddImage: (file: File) => Promise<void>;
  onDeleteImage: (id: number) => void;
  onToggleFeatured: (id: number) => void;
  onClose: () => void;
}

export function AdminPanel({
  images,
  onAddImage,
  onDeleteImage,
  onToggleFeatured,
  onClose,
}: AdminPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    await handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await onAddImage(file);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gabim gjatë ngarkimit');
    }
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">
              <span className="gradient-text">Admin</span> Panel
            </h1>
            <p className="text-gray-400">Menaxho imazhet e galerisë</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
          >
            <span>←</span>
            Kthehu
          </button>
        </div>

        {/* Upload Section */}
        <div className="glass rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              📤
            </span>
            Ngarko Imazhe
          </h2>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-white/20 hover:border-violet-500/50 hover:bg-white/5'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-400">Duke ngarkuar...</p>
              </div>
            ) : (
              <>
                <div className="text-6xl mb-4">
                  {isDragging ? '📥' : '📤'}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragging ? 'Lësho për të ngarkuar' : 'Zvarrit imazhet këtu'}
                </h3>
                <p className="text-gray-400 mb-4">ose kliko për të zgjedhur</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-400">
                  <span>📎</span>
                  JPG, PNG, GIF (max 10MB)
                </div>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{images.length}</div>
            <div className="text-gray-400 text-sm">Total</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">
              {images.filter((i) => i.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">
              {(images.reduce((acc, i) => acc + i.size, 0) / 1024 / 1024).toFixed(1)}MB
            </div>
            <div className="text-gray-400 text-sm">Size</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">∞</div>
            <div className="text-gray-400 text-sm">Limit</div>
          </div>
        </div>

        {/* Gallery Management */}
        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              🖼️
            </span>
            Imazhet e ngarkuara
          </h2>

          {images.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-400">Asnjë imazh i ngarkuar ende</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative rounded-xl overflow-hidden glass"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.data}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onToggleFeatured(image.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        image.featured
                          ? 'bg-amber-500 text-white'
                          : 'bg-white/20 hover:bg-amber-500'
                      }`}
                      title={image.featured ? 'Hiq nga featured' : 'Shto te featured'}
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Jeni i sigurt që doni ta fshini këtë imazh?')) {
                          onDeleteImage(image.id);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-500 flex items-center justify-center transition-all duration-300"
                      title="Fshi"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Featured Badge */}
                  {image.featured && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs shadow-lg">
                        ⭐
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-white truncate">{image.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
