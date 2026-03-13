// App.tsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import GallerySection from './components/GallerySection';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';

// ... (pjesa tjetër e importeve dhe interfaceve)

function App() {
  // ... (state-et ekzistuese)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={(page: string) => setCurrentPage(page as PageType)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main className="relative">
        {renderPage()}
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />

      {/* Loading Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 origin-left transition-transform duration-300" />
    </div>
  );
}

export default App;