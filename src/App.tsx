import { useState, useEffect, useRef, useCallback } from 'react';
import { translations, Lang } from './i18n';

// ─── Funksioni për kompresimin e imazheve ───
async function compressImage(dataUrl: string, maxWidth: number = 1200, quality: number = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Zvogëlo imazhin nëse është shumë i madh
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height / width) * maxWidth);
          width = maxWidth;
        } else {
          width = Math.round((width / height) * maxWidth);
          height = maxWidth;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Konverto në JPEG me cilësi të reduktuar për madhësi më të vogël
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
  });
}

// ─── Image Store (localStorage) me trajtim gabimi ───
function loadImages(key: string): string[] {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : [];
  } catch { 
    return []; 
  }
}

function saveImages(key: string, imgs: string[]) {
  try {
    // Kontrollo madhësinë para se të ruash
    const size = new Blob([JSON.stringify(imgs)]).size;
    const sizeInMB = size / (1024 * 1024);
    
    // Nëse madhësia kalon 4.5 MB (lëmë pak hapësirë rezervë)
    if (sizeInMB > 4.5) {
      console.warn(`Storage size warning: ${sizeInMB.toFixed(2)}MB exceeds recommended limit`);
      // Megjithatë, provoje të ruash - mund të funksionojë ende
    }
    
    localStorage.setItem(key, JSON.stringify(imgs));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    // Nëse dështon, mund të tregojmë një mesazh
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      alert('Hapsira e ruajtjes është plot! Fshini disa imazhe para se të ngarkoni të reja.');
    }
    throw e; // Rihidhe gabimin që komponenti ta kapë
  }
}

// ─── Hooks ───
function useImages(key: string, maxImages: number = 30) {
  const [images, setImages] = useState<string[]>(() => {
    try {
      return loadImages(key);
    } catch {
      return [];
    }
  });
  
  useEffect(() => { 
    try {
      saveImages(key, images);
    } catch (e) {
      console.warn('Storage quota exceeded, cleaning up...');
      // Ruaj vetëm 10 imazhet më të fundit
      const recentImages = images.slice(-10);
      try {
        saveImages(key, recentImages);
        setImages(recentImages);
        alert('Hapsira e ruajtjes ishte plot. Janë ruajtur vetëm imazhet më të fundit.');
      } catch {
        // Nëse ende nuk ka vend, fshij gjithçka
        localStorage.removeItem(key);
        setImages([]);
        alert('Hapsira e ruajtjes është plot. Ju lutemi fshini disa imazhe para se të ngarkoni të reja.');
      }
    }
  }, [key, images]);
  
  const add = async (newImgs: string[]) => {
    // Kompreso imazhet para se t'i shtosh
    const compressedImgs = await Promise.all(
      newImgs.map(img => compressImage(img))
    );
    
    setImages(prev => {
      const combined = [...prev, ...compressedImgs];
      // Kufizo numrin total
      return combined.slice(-maxImages);
    });
  };
  
  const remove = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));
  
  return { images, add, remove };
}

function readFiles(files: FileList): Promise<string[]> {
  return Promise.all(
    Array.from(files).map(f => new Promise<string>((res) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.readAsDataURL(f);
    }))
  );
}

// ─── Language Selector ───
function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: { code: Lang; label: string; flag: string }[] = [
    { code: 'alb', label: 'ALB', flag: '🇦🇱' },
    { code: 'mk', label: 'MK', flag: '🇲🇰' },
    { code: 'eng', label: 'ENG', flag: '🇬🇧' },
    { code: 'bg', label: 'BG', flag: '🇧🇬' },
  ];
  return (
    <div className="flex gap-1">
      {langs.map(l => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 rounded text-xs font-bold transition-all ${
            lang === l.code
              ? 'bg-amber-500 text-white shadow-lg scale-110'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <span className="mr-1">{l.flag}</span>{l.label}
        </button>
      ))}
    </div>
  );
}

// ─── Slider ───
function HeroSlider({ images, t }: { images: string[]; t: Record<string, string> }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => {
    if (images.length === 0) return;
    setCurrent(p => (p + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setCurrent(p => (p - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [images.length, next]);

  useEffect(() => {
    if (current >= images.length) setCurrent(0);
  }, [images.length, current]);

  if (images.length === 0) {
    return (
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="text-center z-10 px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-500/20 rounded-full mb-6">
            <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            {t.brand}
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-semibold mb-3">{t.tagline}</p>
          <p className="text-gray-400 text-lg mb-8">{t.heroSubtitle}</p>
          <a href="#contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-xl hover:shadow-amber-500/30 hover:scale-105">
            {t.heroBtn}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            {t.brand}
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-semibold mb-3 drop-shadow-lg">{t.tagline}</p>
          <p className="text-gray-200 text-lg mb-8 drop-shadow-lg max-w-2xl mx-auto">{t.heroSubtitle}</p>
          <a href="#contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-xl hover:shadow-amber-500/30 hover:scale-105">
            {t.heroBtn}
          </a>
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all">
            {t.prev}
          </button>
          <button type="button" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all">
            {t.next}
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? 'bg-amber-500 scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ─── Upload Button ───
function UploadButton({ label, onUpload }: { label: string; onUpload: (imgs: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setIsUploading(true);
        const imgs = await readFiles(e.target.files);
        await onUpload(imgs);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Ndodhi një gabim gjatë ngarkimit të imazheve.');
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    }
  };
  
  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Duke ngarkuar...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            {label}
          </>
        )}
      </button>
    </>
  );
}

// ─── Service Icons ───
const serviceIcons = [
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
];

// ─── Lightbox ───
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button type="button" className="absolute top-6 right-6 text-white text-4xl hover:text-amber-400 transition-colors z-10" onClick={onClose}>✕</button>
      {images.length > 1 && (
        <>
          <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-400 z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }}>❮</button>
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-400 z-10" onClick={(e) => { e.stopPropagation(); onNext(); }}>❯</button>
        </>
      )}
      <img
        src={images[index]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 text-white/60 text-sm">{index + 1} / {images.length}</div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'mk');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const t = translations[lang];

  const slider = useImages('majstor-slider', 15); // Maksimumi 15 imazhe për slider
  const gallery = useImages('majstor-gallery', 30); // Maksimumi 30 imazhe për galeri

  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#services', label: t.services },
    { href: '#gallery', label: t.gallery },
    { href: '#contact', label: t.contact },
  ];

  return (
    <div className="font-sans antialiased">
      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="text-white font-black text-xl tracking-tight">{t.brand}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-white/80 hover:text-amber-400 font-medium transition-colors text-sm uppercase tracking-wider">
                {l.label}
              </a>
            ))}
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>

          {/* Mobile toggle */}
          <button type="button" className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenu
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-xl border-t border-white/10 mt-2">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-amber-400 font-medium py-2 text-lg">
                  {l.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10">
                <LangSwitcher lang={lang} setLang={setLang} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Slider ── */}
      <HeroSlider images={slider.images} t={t} />

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.aboutTitle}</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{t.aboutText1}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{t.aboutText2}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '15+', label: t.yearsExp },
                { num: '500+', label: t.projectsDone },
                { num: '400+', label: t.happyClients },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="text-3xl md:text-4xl font-black text-amber-500 mb-2">{s.num}</div>
                  <div className="text-gray-500 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.servicesTitle}</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.service1, desc: t.service1Desc, icon: serviceIcons[0] },
              { title: t.service2, desc: t.service2Desc, icon: serviceIcons[1] },
              { title: t.service3, desc: t.service3Desc, icon: serviceIcons[2] },
              { title: t.service4, desc: t.service4Desc, icon: serviceIcons[3] },
              { title: t.service5, desc: t.service5Desc, icon: serviceIcons[4] },
              { title: t.service6, desc: t.service6Desc, icon: serviceIcons[5] },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-5 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.galleryTitle}</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 text-lg">{t.gallerySubtitle}</p>
          </div>

          {/* Slider images management */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {t.sliderSection}
              </h3>
              <UploadButton label={t.uploadSlider} onUpload={slider.add} />
            </div>
            {slider.images.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-gray-400 text-lg">{t.noSliderImages}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {slider.images.map((img, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden aspect-video bg-gray-100">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => slider.remove(i)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                      >
                        {t.deleteImg}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gallery images */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                {t.gallerySection}
              </h3>
              <UploadButton label={t.uploadBtn} onUpload={gallery.add} />
            </div>
            {gallery.images.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="text-gray-400 text-lg">{t.noImages}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-100 cursor-pointer"
                    onClick={() => setLightbox({ images: gallery.images, index: i })}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); gallery.remove(i); }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.contactTitle}</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <input type="text" placeholder={t.contactName} className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder={t.contactEmail} className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all" />
                <input type="tel" placeholder={t.contactPhone} className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all" />
              </div>
              <textarea rows={5} placeholder={t.contactMessage} className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none" />
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02]">
                {t.contactSend}
              </button>
            </form>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">{t.contactInfo}</h3>
              {[
                { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: t.address, val: t.addressVal },
                { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: t.phone, val: t.phoneVal },
                { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: t.email, val: t.emailVal },
                { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: t.workHours, val: t.workHoursVal },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-white/50 text-sm font-medium mb-1">{c.label}</div>
                    <div className="text-white text-lg">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="text-white font-bold">{t.brand}</span>
          </div>
          <p className="text-white/40 text-sm">{t.footerText}</p>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null)}
          onNext={() => setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null)}
        />
      )}
    </div>
  );
}
