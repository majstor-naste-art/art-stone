import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLoginClick,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Ballina', icon: '🏛️' },
    { id: 'gallery', label: 'Galeria', icon: '🖼️' },
    { id: 'about', label: 'Rreth Nesh', icon: '✨' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 glass-dark shadow-2xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="focus:outline-none transform hover:scale-105 transition-transform duration-300"
          >
            <Logo size={isScrolled ? 'sm' : 'md'} />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 group ${
                  currentPage === item.id
                    ? 'text-amber-400'
                    : 'text-stone-300 hover:text-amber-400'
                }`}
              >
                {/* Background */}
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-transparent group-hover:bg-amber-500/5'
                  }`}
                />
                
                {/* Content */}
                <span className="relative flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span style={{ fontFamily: 'Cinzel, serif' }}>{item.label}</span>
                </span>

                {/* Active indicator */}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent mx-2" />

            {/* Admin Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    currentPage === 'admin'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-amber-400 hover:bg-amber-500/10'
                  }`}
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  <span className="flex items-center gap-2">
                    <span>👑</span>
                    <span>Admin</span>
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden lg:inline">Dil</span>
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-gold px-6 py-2.5 rounded-full text-stone-900 font-semibold shadow-lg"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Admin</span>
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-stone-800/50 border border-amber-500/20 text-amber-400"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-dark rounded-2xl p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  currentPage === item.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-stone-300 hover:bg-stone-800/50'
                }`}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-2" />

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium flex items-center gap-3"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  <span>👑</span>
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-medium flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Dil</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full btn-gold px-4 py-3 rounded-xl text-stone-900 font-semibold flex items-center justify-center gap-2"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Hyr si Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
