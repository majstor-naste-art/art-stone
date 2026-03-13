import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
        </svg>
      ),
      href: '#' 
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
        </svg>
      ),
      href: '#' 
    },
    { 
      name: 'YouTube', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.5,6.19a3,3,0,0,0-2.12-2.12C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.57A3,3,0,0,0,.5,6.19,31.49,31.49,0,0,0,0,12a31.49,31.49,0,0,0,.5,5.81,3,3,0,0,0,2.12,2.12c1.84.57,9.38.57,9.38.57s7.54,0,9.38-.57a3,3,0,0,0,2.12-2.12A31.49,31.49,0,0,0,24,12,31.49,31.49,0,0,0,23.5,6.19ZM9.54,15.57V8.43L15.82,12Z"/>
        </svg>
      ),
      href: '#' 
    },
    { 
      name: 'WhatsApp', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.47,14.38c-.29-.14-1.7-.84-2-1s-.46-.14-.65.15-.75,1-1,1.18-.34.22-.63.07a8.14,8.14,0,0,1-2.37-1.46,8.88,8.88,0,0,1-1.64-2c-.17-.29,0-.45.13-.6s.29-.34.44-.51a1.77,1.77,0,0,0,.29-.49.53.53,0,0,0,0-.51c-.08-.14-.66-1.58-.9-2.17s-.48-.49-.66-.5H7.9a1.28,1.28,0,0,0-.92.43,3.87,3.87,0,0,0-1.21,2.88A6.71,6.71,0,0,0,7.17,13a15.41,15.41,0,0,0,5.88,5.2c.82.36,1.47.57,2,.73a4.69,4.69,0,0,0,2.17.14,3.55,3.55,0,0,0,2.34-1.64,2.88,2.88,0,0,0,.2-1.64C19.63,15.55,19.18,15.38,17.47,14.38ZM12,21.5A9.38,9.38,0,0,1,7,20.15L6.61,19.9.5,21.5l1.63-6L1.85,15A9.44,9.44,0,0,1,2.5,12,9.5,9.5,0,1,1,12,21.5ZM12,0A12,12,0,0,0,2.13,18.06L0,24l6.11-2.08A12,12,0,1,0,12,0Z"/>
        </svg>
      ),
      href: '#' 
    },
  ];

  return (
    <footer className="bg-stone-900/80 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-6 text-stone-400 max-w-md leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              ART-STONE është galeria kryesore e artit në gur në Kosovë. 
              Ne ofrojmë vepra të jashtëzakonshme artistike që transformojnë 
              hapësirat tuaja në ambiente elegante dhe të përjetshme.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 text-stone-400 hover:bg-amber-500 hover:border-amber-500 hover:text-stone-900 transition-all duration-300 flex items-center justify-center"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Linke të Shpejta
            </h4>
            <ul className="space-y-3">
              {['Ballina', 'Galeria', 'Rreth Nesh', 'Kontakt'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-stone-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Kontakti
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-400">
                <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Prishtinë, Kosovë<br />Rruga "Nëna Terezë" Nr. 123</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+383 49 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@artstone-ks.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              © {currentYear} ART-STONE. Të gjitha të drejtat e rezervuara.
            </p>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <a href="#" className="hover:text-amber-400 transition-colors">Politika e Privatësisë</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Kushtet e Përdorimit</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
