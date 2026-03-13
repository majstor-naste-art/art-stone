import { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onAdminClick: () => void;
}

export function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
  onAdminClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'home', label: 'Ballina', icon: '🏠' },
    { id: 'gallery', label: 'Galeria', icon: '🖼️' },
    { id: 'about', label: 'Rreth nesh', icon: 'ℹ️' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                💎
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text font-display tracking-wide">
                ART-STONE
              </h1>
              <p className="text-xs text-gray-400">Premium Gallery</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}

            <div className="w-px h-8 bg-white/20 mx-2" />

            {isLoggedIn ? (
              <>
                <button
                  onClick={onAdminClick}
                  className="px-5 py-2.5 rounded-full font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  <span>⚙️</span>
                  Admin
                </button>
                <button
                  onClick={onLogoutClick}
                  className="px-5 py-2.5 rounded-full font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <span>🚪</span>
                  Dilni
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-5 py-2.5 rounded-full font-medium bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <span>👨‍💼</span>
                Admin
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div className="h-px bg-white/10 my-2" />

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      onAdminClick();
                      setMobileMenuOpen(false);
                    }}
                    className="px-5 py-3 rounded-xl font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-3"
                  >
                    <span className="text-xl">⚙️</span>
                    Admin Panel
                  </button>
                  <button
                    onClick={() => {
                      onLogoutClick();
                      setMobileMenuOpen(false);
                    }}
                    className="px-5 py-3 rounded-xl font-medium bg-gray-800 text-gray-300 flex items-center gap-3"
                  >
                    <span className="text-xl">🚪</span>
                    Dilni
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-5 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-pink-500 text-white flex items-center gap-3"
                >
                  <span className="text-xl">👨‍💼</span>
                  Admin Login
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
