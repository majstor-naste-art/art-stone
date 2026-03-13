import { useState, useEffect } from "react";
import { openDB, DBSchema } from "idb";

// Simple image slider component
function Slider({ images }: { images: ImageItem[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      {images.map((img, idx) => (
        <img
          key={img.id}
          src={img.data}
          alt={img.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        ›
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}


interface ImageItem {
  id: number;
  name: string;
  data: string; // data URL
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

// Helper to get DB instance
const getDB = async () => {
  return await openDB<GalleryDB>("gallery-db", 1, {
    upgrade(db) {
      const store = db.createObjectStore("images", { keyPath: "id" });
      store.createIndex("by-date", "date");
    },
  });
};

export function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [section, setSection] = useState<'home' | 'gallery' | 'about'>('home');
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(
    localStorage.getItem("adminLoggedIn") === "true"
  );
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Load images from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const db = await getDB();
      const all = await db.getAll("images");
      setImages(all);
    })();
  }, []);

  // Helper to persist a single image
  const persistImage = async (img: ImageItem) => {
    const db = await getDB();
    await db.put("images", img);
  };

  // Helper to delete from DB
  const deleteFromDB = async (id: number) => {
    const db = await getDB();
    await db.delete("images", id);
  };

  const addImages = (files: FileList) => {
    const newImages: ImageItem[] = [];
    const total = files.length;
    let processed = 0;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        processed++;
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result as string;
        const img: ImageItem = {
          id: Date.now() + Math.random(),
          name: file.name,
          data,
          date: new Date().toISOString(),
          featured: images.length + newImages.length < 3,
        };
        newImages.push(img);
        await persistImage(img);
        processed++;
        if (processed === total) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleFeatured = async (id: number) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id === id) {
          const updated = { ...img, featured: !img.featured };
          persistImage(updated);
          return updated;
        }
        return img;
      })
    );
  };

  const deleteImage = async (id: number) => {
    if (!adminLoggedIn) {
      alert('Only admin can delete images.');
      return;
    }
    await deleteFromDB(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => setSection('home')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"/><circle cx="12" cy="13" r="4" stroke="none" fill="currentColor"/></svg> <span className="text-2xl font-bold">ART-STONE</span>
          </div>
          <ul className="flex space-x-4">
            <li className="cursor-pointer" onClick={() => setSection('home')}>Home</li>
            <li className="cursor-pointer" onClick={() => setSection('gallery')}>Gallery</li>
            <li className="cursor-pointer" onClick={() => setSection('about')}>About</li>
            {adminLoggedIn ? (
              <li className="cursor-pointer text-red-300" onClick={() => { localStorage.setItem('adminLoggedIn','false'); setAdminLoggedIn(false); }}>
                Logout
              </li>
            ) : (
              <li className="cursor-pointer" onClick={() => setShowLogin(true)}>Admin</li>
            )}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto p-4">
{section === 'home' && (
        <section className="relative bg-gray-200 rounded-lg overflow-hidden">
          {/* Slider */}
          <Slider images={images.slice(0, 5)} />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h1 className="text-4xl font-bold mb-2 text-white">Mirë se vini në GalleryApp</h1>
            <p className="text-lg text-white mb-4">
              Zbuloni imazhet më të bukura të ngarkuara nga komuniteti ynë.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded" onClick={() => setSection('gallery')}>
              Shiko Gallery →
            </button>
          </div>
        </section>
      )}
        {section === 'gallery' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Të Gjitha Fotot</h2>
            {images.length === 0 ? (
              <p className="text-gray-500">Nuk ka foto të ngarkuara.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={img.id} className="cursor-pointer" onClick={() => setLightboxIndex(idx)}>
                    <img src={img.data} alt={img.name} className="w-full h-48 object-cover rounded" />
                    <div className="mt-2 text-sm text-gray-700" title={img.name}>
                      {img.name.length > 20 ? img.name.slice(0, 20) + "..." : img.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        {section === 'about' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Rreth nesh</h2>
            <p className="text-gray-600">GalleryApp është një platformë moderne për ndarjen e imazheve. Krijuar me pasion për fotografinë dhe teknologjinë.</p>
          </section>
        )}
      </main>

      {/* Admin Panel */}
      {adminLoggedIn && (
        <aside className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Admin Panel</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && addImages(e.target.files)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group">
                  <img src={img.data} alt={img.name} className="w-full h-32 object-cover rounded" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity">
                    <button
                      className="bg-white text-black rounded-full p-2"
                      onClick={() => toggleFeatured(img.id)}
                    >
                      {img.featured ? "★" : "☆"}
                    </button>
                    <button
                      className="bg-red-600 text-white rounded-full p-2"
                      onClick={() => deleteImage(img.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-gray-300 text-black py-1 px-3 rounded" onClick={() => { setAdminLoggedIn(false); localStorage.setItem('adminLoggedIn','false'); }}>
              Close Admin
            </button>
          </div>
        </aside>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <input id="login-user" type="text" defaultValue="admin" className="border p-2 rounded w-full mb-2" />
            <input id="login-pass" type="password" defaultValue="admin123" className="border p-2 rounded w-full mb-4" />
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
              onClick={() => {
                const user = (document.getElementById('login-user') as HTMLInputElement).value;
                const pass = (document.getElementById('login-pass') as HTMLInputElement).value;
                if (user === 'admin' && pass === 'admin123') {
                  localStorage.setItem('adminLoggedIn', 'true');
                  setAdminLoggedIn(true);
                  setShowLogin(false);
                } else {
                  alert('Credencialet e pasakta');
                }
              }}
            >
              Login
            </button>
            <button className="mt-2 text-gray-600" onClick={() => setShowLogin(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setLightboxIndex(null)}>
          <img src={images[lightboxIndex].data} alt={images[lightboxIndex].name} className="max-w-full max-h-full rounded" />
        </div>
      )}
    </div>
  );
}
