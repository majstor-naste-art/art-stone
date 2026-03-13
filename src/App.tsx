import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';

interface GalleryImage {
  id: number;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

type PageType = 'home' | 'gallery' | 'about' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Ref to track latest images
  const imagesRef = useRef<GalleryImage[]>(images);

  // Update ref when images change
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Load images and auth state from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (e) {
        console.error('Error loading images:', e);
      }
    }

    // Check login status and session timeout
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (loggedIn && loginTime) {
      // Session expires after 2 hours
      const sessionDuration = 2 * 60 * 60 * 1000;
      if (Date.now() - parseInt(loginTime) > sessionDuration) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      try {
        localStorage.setItem('galleryImages', JSON.stringify(images));
      } catch (e) {
        console.error('Error saving images:', e);
        alert('Hapësira e ruajtjes është e plotë. Fshini disa foto.');
      }
    }
  }, [images]);

  const addImage = useCallback((image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now() + Math.random(),
    };
    setImages(prevImages => [...prevImages, newImage]);
  }, []);

  const deleteImage = useCallback((id: number) => {
    setImages(prevImages => prevImages.filter(img => img.id !== id));
  }, []);

  const toggleFeatured = useCallback((id: number) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === id ? { ...img, featured: !img.featured } : img
      )
    );
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const openLightbox = (index: number, imgs: GalleryImage[]) => {
    setLightboxImages(imgs);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex(prev => (prev + 1) % lightboxImages.length);
  };

  const prevLightbox = () => {
    setLightboxIndex(prev => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection 
              images={images} 
              onExplore={() => setCurrentPage('gallery')} 
            />
            <GallerySection
              images={images.filter(img => img.featured).slice(0, 6)}
              onImageClick={openLightbox}
              showFeaturedOnly={true}
              title="Koleksioni i Zgjedhur"
              subtitle="Veprat tona më të mira të artit në gur"
            />
          </>
        );
      case 'gallery':
        return (
          <div className="pt-24">
            <GallerySection
              images={images}
              onImageClick={openLightbox}
              title="Galeria e Plotë"
              subtitle="Zbuloni të gjitha veprat tona artistike"
            />
          </div>
        );
      case 'about':
        return (
          <div className="pt-24">
            <AboutSection />
          </div>
        );
      case 'admin':
        if (!isLoggedIn) {
          setCurrentPage('home');
          setShowLoginModal(true);
          return null;
        }
        return (
          <AdminPanel
            images={images}
            onAddImage={addImage}
            onDeleteImage={deleteImage}
            onToggleFeatured={toggleFeatured}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={(page: string) => setCurrentPage(page as PageType)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main>
        {renderPage()}
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </div>
  );
}

export default App;
