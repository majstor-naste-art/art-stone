import { useState, useEffect } from "react";
import { openDB, DBSchema } from "idb";

// Types
interface ImageItem {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface GalleryDB extends DBSchema {
  images: {
    key: number;
    value: ImageItem;
    indexes: { "by-date": string };
  };
}

// Components
const Slider = ({ images }: { images: ImageItem[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <p className="text-white text-xl">No images to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {images.map((img, idx) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-all duration-1000 transform ${
            idx === current 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={img.data}
            alt={img.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
      >
        ←
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all rounded-full ${
              idx === current 
                ? 'w-8 h-2 bg-white' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

const ImageCard = ({ 
  image, 
  onClick,
  showActions,
  onToggleFeatured,
  onDelete
}: { 
  image: ImageItem;
  onClick: () => void;
  showActions?: boolean;
  onToggleFeatured?: () => void;
  onDelete?: () => void;
}) => (
  <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="aspect-square overflow-hidden">
      <img
        src={image.data}
        alt={image.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onClick={onClick}
      />
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {image.featured && (
      <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
        ⭐ Featured
      </div>
    )}

    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <p className="text-white text-sm font-medium truncate">{image.name}</p>
      <p className="text-gray-300 text-xs mt-1">
        {new Date(image.date).toLocaleDateString()}
      </p>
    </div>

    {showActions && (
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onToggleFeatured}
          className="bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-full p-2 shadow-lg transition-colors"
        >
          {image.featured ? '★' : '☆'}
        </button>
        <button
          onClick={onDelete}
          className="bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 shadow-lg transition-colors"
        >
          ✕
        </button>
      </div>
    )}
  </div>
);

const Modal = ({ 
  isOpen, 
  onClose, 
  children,
  title 
}: { 
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        {title && (
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Main App Component
export function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentSection, setCurrentSection] = useState<'home' | 'gallery' | 'about'>('home');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      const db = await openDB<GalleryDB>("gallery-db", 1, {
        upgrade(db) {
          const store = db.createObjectStore("images", { keyPath: "id" });
          store.createIndex("by-date", "date");
        },
      });
      const all = await db.getAll("images");
      setImages(all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    loadImages();
  }, []);

  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      if (!file.type.startsWith("image/")) return null;

      return new Promise<ImageItem>((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const newImage: ImageItem = {
            id: Date.now() + Math.random(),
            name: file.name,
            data: e.target?.result as string,
            date: new Date().toISOString(),
            featured: images.length < 3,
          };

          const db = await openDB<GalleryDB>("gallery-db", 1);
          await db.put("images", newImage);
          resolve(newImage);
        };
        reader.readAsDataURL(file);
      });
    });

    const newImages = (await Promise.all(uploadPromises)).filter(Boolean) as ImageItem[];
    setImages((prev) => [...newImages, ...prev]);
    setIsUploading(false);
  };

  const toggleFeatured = async (id: number) => {
    setImages((prev) =>
      prev.map(async (img) => {
        if (img.id === id) {
          const updated = { ...img, featured: !img.featured };
          const db = await openDB<GalleryDB>("gallery-db", 1);
          await db.put("images", updated);
          return updated;
        }
        return img;
      })
    );
  };

  const deleteImage = async (id: number) => {
    if (!isAdmin || !confirm('Are you sure you want to delete this image?')) return;
    
    const db = await openDB<GalleryDB>("gallery-db", 1);
    await db.delete("images", id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const featuredImages = images.filter(img => img.featured).slice(0, 5);
  const regularImages = images;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={() => setCurrentSection('home')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ArtStone
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {(['home', 'gallery', 'about'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentSection === section
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              
              <button
                onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)}
                className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isAdmin
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isAdmin ? 'Logout' : 'Admin'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentSection === 'home' && (
          <div className="space-y-12">
            {/* Hero Slider */}
            <section className="relative">
              <Slider images={featuredImages.length > 0 ? featuredImages : images.slice(0, 5)} />
            </section>

            {/* Featured Section */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Gallery</h2>
                <p className="text-gray-600">Discover our most popular and featured images</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {images.slice(0, 3).map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onClick={() => setSelectedImageIndex(images.findIndex(img => img.id === image.id))}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {currentSection === 'gallery' && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
                <p className="text-gray-600 mt-1">Browse through our collection of {images.length} images</p>
              </div>
              {isAdmin && (
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="hidden"
                    id="upload-input"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="upload-input"
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg cursor-pointer transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUploading ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload Images
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>

            {regularImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl text-gray-600">No images yet</h3>
                {isAdmin && (
                  <p className="text-gray-500 mt-2">Start by uploading some images</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularImages.map((image, idx) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onClick={() => setSelectedImageIndex(idx)}
                    showActions={isAdmin}
                    onToggleFeatured={() => toggleFeatured(image.id)}
                    onDelete={() => deleteImage(image.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {currentSection === 'about' && (
          <section className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About ArtStone</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                ArtStone is a modern gallery platform built with passion for photography and technology. 
                We provide a space for artists and photographers to showcase their work and connect with 
                art enthusiasts from around the world.
              </p>
              <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 rounded-xl p-6">
                <div>
                  <h4 className="font-semibold text-gray-900">Total Images</h4>
                  <p className="text-2xl font-bold text-indigo-600">{images.length}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Featured</h4>
                  <p className="text-2xl font-bold text-purple-600">{images.filter(i => i.featured).length}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Login Modal */}
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)} title="Admin Login">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            defaultValue="admin"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue="admin123"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <button
            onClick={() => {
              // Simple auth - in production, use proper authentication
              setIsAdmin(true);
              localStorage.setItem("isAdmin", "true");
              setShowLogin(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Login
          </button>
        </div>
      </Modal>

      {/* Lightbox */}
      <Modal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
      >
        {selectedImageIndex !== null && images[selectedImageIndex] && (
          <div className="relative">
            <img
              src={images[selectedImageIndex].data}
              alt={images[selectedImageIndex].name}
              className="max-h-[70vh] mx-auto rounded-lg"
            />
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{images[selectedImageIndex].name}</h3>
                <p className="text-sm text-gray-500">
                  Uploaded on {new Date(images[selectedImageIndex].date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                  disabled={selectedImageIndex === 0}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
                  disabled={selectedImageIndex === images.length - 1}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
