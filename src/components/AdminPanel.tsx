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
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

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
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    
    if (fileArray.length === 0) {
      showMessage('error', 'Ju lutem zgjidhni skedarë imazhesh (JPG, PNG, GIF)');
      return;
    }

    setUploading(true);
    setUploadProgress({ current: 0, total: fileArray.length });
    
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress({ current: i + 1, total: fileArray.length });
      
      try {
        await onAddImage(file);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error('Upload error for', file.name, error);
      }
    }
    
    setUploading(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (successCount > 0 && errorCount === 0) {
      showMessage('success', `✅ ${successCount} imazh${successCount > 1 ? 'e' : ''} u ngarkua${successCount > 1 ? 'n' : ''} me sukses!`);
    } else if (successCount > 0 && errorCount > 0) {
      showMessage('error', `⚠️ ${successCount} u ngarkuan, ${errorCount} dështuan`);
    } else {
      showMessage('error', '❌ Ngarkimi dështoi. Kontrolloni madhësinë e imazheve.');
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Jeni i sigurt që doni ta fshini "${name}"?`)) {
      onDeleteImage(id);
      showMessage('success', `🗑️ "${name}" u fshi me sukses`);
    }
  };

  const handleToggleFeatured = (id: number, name: string, currentlyFeatured: boolean) => {
    onToggleFeatured(id);
    if (currentlyFeatured) {
      showMessage('success', `⭐ "${name}" u hoq nga featured`);
    } else {
      showMessage('success', `⭐ "${name}" u shtua te featured`);
    }
  };

  // Calculate storage usage
  const totalSizeBytes = images.reduce((acc, img) => acc + (img.data?.length || 0), 0);
  const totalSizeMB = (totalSizeBytes / 1024 / 1024).toFixed(2);
  const storageLimit = 5; // localStorage is typically ~5MB
  const storagePercentage = Math.min((parseFloat(totalSizeMB) / storageLimit) * 100, 100);

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

        {/* Message Toast */}
        {message && (
          <div
            className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-500 ${
              message.type === 'success'
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            <p className="font-medium">{message.text}</p>
          </div>
        )}

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
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-violet-500 bg-violet-500/10'
                : uploading
                ? 'border-yellow-500 bg-yellow-500/5 cursor-wait'
                : 'border-white/20 hover:border-violet-500/50 hover:bg-white/5'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xl font-semibold mb-2">Duke ngarkuar...</p>
                <p className="text-gray-400">
                  {uploadProgress.current} / {uploadProgress.total} imazhe
                </p>
                <div className="w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                  />
                </div>
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
                  JPG, PNG, GIF (max 5MB per imazh)
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
            <div className="text-gray-400 text-sm">Total Imazhe</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">
              {images.filter((i) => i.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{totalSizeMB}MB</div>
            <div className="text-gray-400 text-sm">Hapësira</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  storagePercentage > 80 ? 'bg-red-500' : 'bg-gradient-to-r from-violet-500 to-pink-500'
                }`}
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
            <div className="text-gray-400 text-sm">
              {storagePercentage.toFixed(0)}% përdorur
            </div>
          </div>
        </div>

        {/* Gallery Management */}
        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              🖼️
            </span>
            Imazhet e ngarkuara
            {images.length > 0 && (
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({images.length} imazhe)
              </span>
            )}
          </h2>

          {images.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-400 mb-2">Asnjë imazh i ngarkuar ende</p>
              <p className="text-gray-500 text-sm">Zvarritni ose klikoni zonën e ngarkimit më sipër</p>
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
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleToggleFeatured(image.id, image.name, image.featured)}
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
                      onClick={() => handleDelete(image.id, image.name)}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-500 flex items-center justify-center transition-all duration-300"
                      title="Fshi"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Featured Badge */}
                  {image.featured && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs shadow-lg animate-pulse">
                        ⭐
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-white truncate">{image.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(image.date).toLocaleDateString('sq-AL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="glass rounded-2xl p-6 mt-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>💡</span> Këshilla
          </h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Imazhet ruhen në localStorage të browserit (max ~5MB total)</li>
            <li>• Imazhet e mëdha kompresohen automatikisht</li>
            <li>• Kliko ⭐ për të shtuar/hequr imazhin nga featured</li>
            <li>• Featured imazhet shfaqen në ballinë</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
