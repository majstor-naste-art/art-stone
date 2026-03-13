// components/Header.tsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ currentPage, setCurrentPage, isLoggedIn, onLoginClick, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Kryefaqja', icon: '🏠' },
    { id: 'gallery', label: 'Galeria', icon: '🖼️' },
    { id: 'about', label: 'Rreth Nesh', icon: '📜' },
    ...(isLoggedIn ? [{ id: 'admin', label: 'Paneli', icon: '⚙️' }] : [])
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-black/50 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')} 
            className="cursor-pointer group"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              ART GALLERY
            </h1>
            <div className="h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group
                  ${currentPage === item.id 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full" />
                )}
              </button>
            ))}
            
            {!isLoggedIn ? (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/25"
              >
                Hyr si Admin
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="px-4 py-2 border border-red-600 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Dil
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-slideDown">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${currentPage === item.id 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-white/10'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg"
                >
                  <span>🔑</span>
                  <span>Hyr si Admin</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 border border-red-600 text-red-500 rounded-lg"
                >
                  <span>🚪</span>
                  <span>Dil</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}