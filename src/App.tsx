import { useState, useCallback } from 'react';
import { Page } from './types';
import { useGallery } from './hooks/useGallery';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedGallery } from './components/FeaturedGallery';
import { GalleryPage } from './components/GalleryPage';
import { AboutPage } from './components/AboutPage';
import { AdminPanel } from './components/AdminPanel';
import { LoginModal } from './components/LoginModal';
import { Lightbox } from './components/Lightbox';
import { Footer } from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<typeof images>([]);

  const { images, featuredImages, addImage, deleteImage, toggleFeatured } = useGallery();
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    setShowAdmin(false);
  }, [logout]);

  const handleAdminClick = useCallback(() => {
    if (isLoggedIn) {
      setShowAdmin(true);
    } else {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLogin = useCallback(
    (username: string, password: string) => {
      const success = login(username, password);
      if (success) {
        setShowAdmin(true);
      }
      return success;
    },
    [login]
  );

  const openLightbox = useCallback(
    (index: number, imageList: typeof images = images) => {
      setLightboxImages(imageList);
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [images]
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      (prev - 1 + lightboxImages.length) % lightboxImages.length
    );
  }, [lightboxImages.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  const handleFeaturedImageClick = useCallback(
    (index: number) => {
      openLightbox(index, featuredImages);
    },
    [featuredImages, openLightbox]
  );

  const handleGalleryImageClick = useCallback(
    (index: number) => {
      openLightbox(index, images);
    },
    [images, openLightbox]
  );

  return (
    <div className="min-h-screen">
      <Header
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setShowAdmin(false);
        }}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
        onAdminClick={handleAdminClick}
      />

      <main className="pt-20">
        {showAdmin ? (
          <AdminPanel
            images={images}
            onAddImage={addImage}
            onDeleteImage={deleteImage}
            onToggleFeatured={toggleFeatured}
            onClose={() => setShowAdmin(false)}
          />
        ) : (
          <>
            {currentPage === 'home' && (
              <>
                <HeroSection
                  images={images}
                  onExploreClick={() => setCurrentPage('gallery')}
                />
                <FeaturedGallery
                  images={featuredImages}
                  onImageClick={handleFeaturedImageClick}
                />
              </>
            )}

            {currentPage === 'gallery' && (
              <GalleryPage
                images={images}
                onImageClick={handleGalleryImageClick}
              />
            )}

            {currentPage === 'about' && <AboutPage />}
          </>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />
    </div>
  );
}

export default App;
