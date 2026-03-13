import React, { useState, useRef, useCallback } from 'react';

interface GalleryImage {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface AdminPanelProps {
  images: GalleryImage[];
  onAddImage: (image: Omit<GalleryImage, 'id'>) => void;
  onDeleteImage: (id: number) => void;
  onToggleFeatured: (id: number) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  images,
  onAddImage,
  onDeleteImage,
  onToggleFeatured,
  onLogout,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 1200;
          let { width, height } = img;

          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = (height / width) * MAX_SIZE;
              width = MAX_SIZE;
            } else {
              width = (width / height) * MAX_SIZE;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        showToast(`${file.name} nuk është një imazh i vlefshëm`, 'error');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast(`${file.name} është më i madh se 5MB`, 'error');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      try {
        const compressedData = await compressImage(file);
        onAddImage({
          name: file.name,
          data: compressedData,
          date: new Date().toISOString(),
          featured: images.length < 6,
        });
        setUploadProgress(((i + 1) / validFiles.length) * 100);
      } catch (error) {
        showToast(`Gabim gjatë ngarkimit të ${file.name}`, 'error');
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
    showToast(`${validFiles.length} foto u ngarkuan me sukses!`, 'success');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [images.length, onAddImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const storageUsed = () => {
    try {
      const total = JSON.stringify(localStorage).length;
      const used = (total / (5 * 1024 * 1024)) * 100;
      return Math.min(used, 100).toFixed(1);
    } catch {
      return '0';
    }
  };

  return (
    <section className="min-h-screen py-24 bg-stone-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass-dark rounded-3xl p-6 mb-8 border border-amber-500/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-amber-400">👑</span>
                Admin Panel
              </h1>
              <p className="text-stone-400">
                Menaxhoni galerinë tuaj të artit në gur
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Storage indicator */}
              <div className="hidden sm:block">
                <div className="text-xs text-stone-500 mb-1">Hapësira e përdorur</div>
                <div className="w-32 h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${storageUsed()}%` }}
                  />
                </div>
                <div className="text-xs text-stone-500 mt-1">{storageUsed()}% / 5MB</div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/50 border border-stone-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-stone-900 font-bold">
                  A
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Administrator</div>
                  <div className="text-stone-500 text-xs">Logged in</div>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Dil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="glass-dark rounded-3xl p-8 mb-8 border border-amber-500/20">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
            <span>📤</span>
            Ngarko Foto të Reja
          </h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-stone-700 hover:border-amber-500/50 hover:bg-stone-800/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && processFiles(e.target.files)}
              className="hidden"
            />

            {isUploading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                <div className="text-white font-medium">Duke ngarkuar...</div>
                <div className="w-64 mx-auto h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Zvarrit fotot këtu ose kliko për të zgjedhur
                </h3>
                <p className="text-stone-500 text-sm">
                  JPG, PNG, GIF • Max 5MB për foto
                </p>
              </>
            )}
          </div>
        </div>

        {/* Gallery Management */}
        <div className="glass-dark rounded-3xl p-8 border border-amber-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
              <span>🖼️</span>
              Fotot e Ngarkuara
              <span className="ml-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
                {images.length}
              </span>
            </h2>
            
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-amber-500" />
                Featured
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-stone-700" />
                Normal
              </span>
            </div>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    image.featured 
                      ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' 
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full aspect-square object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    {/* Toggle Featured */}
                    <button
                      onClick={() => onToggleFeatured(image.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        image.featured
                          ? 'bg-amber-500 text-stone-900'
                          : 'bg-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-900'
                      }`}
                      title={image.featured ? 'Hiq nga Featured' : 'Shto në Featured'}
                    >
                      <svg className="w-5 h-5" fill={image.featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (window.confirm('Jeni i sigurt që doni ta fshini këtë foto?')) {
                          onDeleteImage(image.id);
                          showToast('Foto u fshi me sukses', 'success');
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300"
                      title="Fshi"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Featured badge */}
                  {image.featured && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-stone-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs truncate">{image.name}</p>
                    <p className="text-stone-400 text-[10px]">
                      {new Date(image.date).toLocaleDateString('sq-AL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-stone-800/50 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Nuk ka foto të ngarkuara
              </h3>
              <p className="text-stone-500">
                Përdorni zonën e sipërme për të ngarkuar foto
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-reveal ${
          toast.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {toast.type === 'success' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
