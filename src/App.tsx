import React, { useState, useEffect } from "react";
import { 
  Menu, X, Phone, Mail, MapPin, ArrowRight, 
  Upload, Heart, Star, ChevronLeft, ChevronRight 
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
];

const translations = {
  mk: {
    title: "KAMEN",
    subtitle: "Природен камен и мермер",
    nav: ["Почетна", "Услуги", "Галерија", "Проекти", "Контакт"],
    heroTitle: "Елеганција на природниот камен",
    heroSubtitle: "Премиум мермер, гранит и природен камен за вашиот дом и бизнис",
    cta1: "Погледни галерија",
    cta2: "Контактирај не",
    aboutTitle: "За нас",
    aboutText: "Со повеќе од 15 години искуство, KAMEN е водечка компанија во обработка и монтажа на природен камен. Ние создаваме уникатни решенија кои го комбинираат традиционалното занаетчиство со модерната технологија.",
    servicesTitle: "Наши услуги",
    services: [
      { title: "Кухински пултови", desc: "Гранит и кварц пултови со врвна издржливост и елеганција", icon: "Counter" },
      { title: "Подови од камен", desc: "Мермерни и гранитни подови за совршен изглед", icon: "Floor" },
      { title: "Фасади од камен", desc: "Природен камен за екстериер со долготрајна убавина", icon: "Wall" },
      { title: "Бањи и СПА", desc: "Луксузни камени бањи и релаксациони простори", icon: "Bath" },
      { title: "Скулптури и декор", desc: "Уметнички камени скулптури и декоративни елементи", icon: "Sculpture" },
      { title: "Реставрација", desc: "Обнова на стари мермерни и камени површини", icon: "Restore" },
    ],
    galleryTitle: "Галерија",
    uploadBtn: "Додај своја слика",
    projectsTitle: "Наши проекти",
    testimonialsTitle: "Што велат клиентите",
    contactTitle: "Контактирајте не",
    contactSubtitle: "Подготвени сме да го реализираме вашиот сон",
    name: "Име и презиме",
    phone: "Телефон",
    email: "Е-пошта",
    message: "Порака",
    send: "Испрати порака",
    footer: "© 2025 KAMEN. Сите права задржани."
  },
  en: {
    title: "KAMEN",
    subtitle: "Natural Stone & Marble",
    nav: ["Home", "Services", "Gallery", "Projects", "Contact"],
    heroTitle: "The Elegance of Natural Stone",
    heroSubtitle: "Premium marble, granite and natural stone for your home and business",
    cta1: "View Gallery",
    cta2: "Contact Us",
    aboutTitle: "About Us",
    aboutText: "With over 15 years of experience, KAMEN is a leading company in natural stone processing and installation. We create unique solutions that combine traditional craftsmanship with modern technology.",
    servicesTitle: "Our Services",
    services: [
      { title: "Kitchen Countertops", desc: "Granite and quartz countertops with top durability and elegance", icon: "Counter" },
      { title: "Stone Flooring", desc: "Marble and granite floors for a perfect look", icon: "Floor" },
      { title: "Stone Facades", desc: "Natural stone for exterior with long-lasting beauty", icon: "Wall" },
      { title: "Bathrooms & SPA", desc: "Luxurious stone bathrooms and relaxation areas", icon: "Bath" },
      { title: "Sculptures & Decor", desc: "Artistic stone sculptures and decorative elements", icon: "Sculpture" },
      { title: "Restoration", desc: "Restoration of old marble and stone surfaces", icon: "Restore" },
    ],
    galleryTitle: "Gallery",
    uploadBtn: "Upload your photo",
    projectsTitle: "Our Projects",
    testimonialsTitle: "What Our Clients Say",
    contactTitle: "Contact Us",
    contactSubtitle: "We are ready to make your dream come true",
    name: "Full Name",
    phone: "Phone",
    email: "Email",
    message: "Message",
    send: "Send Message",
    footer: "© 2025 KAMEN. All rights reserved."
  },
  bg: {
    title: "KAMEN",
    subtitle: "Естествен камък и мрамор",
    nav: ["Начало", "Услуги", "Галерия", "Проекти", "Контакт"],
    heroTitle: "Елегантността на естествения камък",
    heroSubtitle: "Премиум мрамор, гранит и естествен камък за вашия дом и бизнес",
    cta1: "Виж галерията",
    cta2: "Свържете се с нас",
    aboutTitle: "За нас",
    aboutText: "С над 15 години опит, KAMEN е водеща компания в обработката и монтажа на естествен камък. Създаваме уникални решения, които комбинират традиционния занаят с модерните технологии.",
    servicesTitle: "Нашите услуги",
    services: [
      { title: "Кухненски плотове", desc: "Гранитни и кварцови плотове с висока издръжливост и елегантност", icon: "Counter" },
      { title: "Каменни подове", desc: "Мраморни и гранитни подове за перфектен вид", icon: "Floor" },
      { title: "Каменни фасади", desc: "Естествен камък за екстериор с дълготрайна красота", icon: "Wall" },
      { title: "Бани и СПА", desc: "Луксозни каменни бани и зони за релаксация", icon: "Bath" },
      { title: "Скулптури и декор", desc: "Артистични каменни скулптури и декоративни елементи", icon: "Sculpture" },
      { title: "Реставрация", desc: "Възстановяване на стари мраморни и каменни повърхности", icon: "Restore" },
    ],
    galleryTitle: "Галерия",
    uploadBtn: "Качи своя снимка",
    projectsTitle: "Нашите проекти",
    testimonialsTitle: "Какво казват нашите клиенти",
    contactTitle: "Свържете се с нас",
    contactSubtitle: "Готови сме да реализираме вашата мечта",
    name: "Име и фамилия",
    phone: "Телефон",
    email: "Имейл",
    message: "Съобщение",
    send: "Изпрати",
    footer: "© 2025 KAMEN. Всички права запазени."
  },
  sq: {
    title: "KAMEN",
    subtitle: "Gur natyror & Mermer",
    nav: ["Kreu", "Shërbimet", "Galeria", "Projektet", "Kontakt"],
    heroTitle: "Eleganca e gurit natyror",
    heroSubtitle: "Mermer, granit dhe gur natyror premium për shtëpinë dhe biznesin tuaj",
    cta1: "Shiko Galerine",
    cta2: "Na kontakto",
    aboutTitle: "Rreth nesh",
    aboutText: "Me mbi 15 vjet përvojë, KAMEN është një kompani lider në përpunimin dhe instalimin e gurit natyror. Ne krijojmë zgjidhje unike që kombinojnë mjeshtërinë tradicionale me teknologjinë moderne.",
    servicesTitle: "Shërbimet tona",
    services: [
      { title: "Pllaka kuzhine", desc: "Pllaka graniti dhe kuarc me qëndrueshmëri dhe elegancë të lartë", icon: "Counter" },
      { title: "Dysheme guri", desc: "Dysheme mermeri dhe graniti për pamje perfekte", icon: "Floor" },
      { title: "Fasada guri", desc: "Gur natyror për eksterier me bukuri të qëndrueshme", icon: "Wall" },
      { title: "Banjo & SPA", desc: "Banjo luksoze prej guri dhe hapësira relaksi", icon: "Bath" },
      { title: "Skulptura & Dekor", desc: "Skulptura artistike prej guri dhe elemente dekorative", icon: "Sculpture" },
      { title: "Restaurim", desc: "Restaurim i sipërfaqeve të vjetra prej mermeri dhe guri", icon: "Restore" },
    ],
    galleryTitle: "Galeria",
    uploadBtn: "Ngarko foton tënde",
    projectsTitle: "Projektet tona",
    testimonialsTitle: "Çfarë thonë klientët tanë",
    contactTitle: "Na kontakto",
    contactSubtitle: "Jemi gati të realizojmë ëndrrën tuaj",
    name: "Emri i plotë",
    phone: "Telefoni",
    email: "Email",
    message: "Mesazhi",
    send: "Dërgo mesazhin",
    footer: "© 2025 KAMEN. Të gjitha të drejtat e rezervuara."
  }
};

const stoneImages = [
  "https://picsum.photos/id/1015/1200/800",
  "https://picsum.photos/id/1033/1200/800",
  "https://picsum.photos/id/106/1200/800",
  "https://picsum.photos/id/201/1200/800",
];

const galleryImages = [
  "https://picsum.photos/id/1015/600/600",
  "https://picsum.photos/id/1033/600/600",
  "https://picsum.photos/id/106/600/600",
  "https://picsum.photos/id/201/600/600",
  "https://picsum.photos/id/133/600/600",
  "https://picsum.photos/id/160/600/600",
  "https://picsum.photos/id/201/600/600",
  "https://picsum.photos/id/251/600/600",
];

const testimonials = [
  {
    name: "Александар Јовановски",
    text: "Одлична работа! Кухинскиот пулт од гранит изгледа фантастично. Професионалци!",
    role: "Скопје",
    rating: 5
  },
  {
    name: "Elena Petrova",
    text: "The marble bathroom they created is a masterpiece. Exceptional quality and service.",
    role: "Sofia",
    rating: 5
  },
  {
    name: "Fatmir Hoxha",
    text: "Shërbim shumë profesional. Fasada nga guri natyror doli shumë mirë.",
    role: "Tiranë",
    rating: 5
  },
];

export default function App() {
  const [currentLang, setCurrentLang] = useState<'mk'|'en'|'bg'|'sq'>('mk');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gallery, setGallery] = useState(galleryImages);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[currentLang];

  // Auto slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stoneImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stoneImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stoneImages.length) % stoneImages.length);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setGallery(prev => [event.target!.result as string, ...prev]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    setShowUpload(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 2500);
  };

  const changeLanguage = (lang: 'mk'|'en'|'bg'|'sq') => {
    setCurrentLang(lang);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-lg z-50 border-b border-amber-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-zinc-950 font-bold text-2xl shadow-inner">
                K
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tighter text-white">KAMEN</div>
                <div className="text-[10px] text-amber-400 -mt-1">NATURAL STONE</div>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {t.nav.map((item, index) => (
              <a 
                key={index} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code as any)}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all flex items-center gap-1.5 ${
                    currentLang === lang.code 
                      ? 'bg-amber-500 text-zinc-950 font-medium' 
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-700"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
              {t.nav.map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase()}`}
                  className="text-lg py-2 hover:text-amber-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SLIDER */}
      <div id="home" className="relative h-screen pt-20">
        {stoneImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt="Stone" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90"></div>
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-3xl mb-8 border border-white/20">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="uppercase text-xs tracking-[3px] font-medium">EST. 2009</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-none mb-6 tracking-tighter">
              {t.heroTitle}
            </h1>
            <p className="max-w-lg mx-auto text-xl md:text-2xl text-white/80 mb-12">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#gallery" 
                className="bg-white text-zinc-950 px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-amber-300 transition-all group"
              >
                {t.cta1}
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </a>
              <a 
                href="#contact" 
                className="border border-white/60 hover:bg-white/10 px-10 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 transition-all"
              >
                {t.cta2}
              </a>
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 bg-black/40 hover:bg-black/70 backdrop-blur rounded-2xl flex items-center justify-center border border-white/10 transition-all active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 bg-black/40 hover:bg-black/70 backdrop-blur rounded-2xl flex items-center justify-center border border-white/10 transition-all active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 flex gap-3 z-20">
          {stoneImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <div className="text-amber-400 text-sm tracking-[2px] mb-4">НАСЛЕДСТВО ОД КАМЕН</div>
              <h2 className="text-5xl font-semibold leading-none tracking-tight mb-8">
                {t.aboutTitle}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed max-w-prose">
                {t.aboutText}
              </p>
              
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div>
                  <div className="text-4xl font-mono text-amber-400">15+</div>
                  <div className="text-sm text-white/60 mt-2">ГОДИНИ ИСКУСТВО</div>
                </div>
                <div>
                  <div className="text-4xl font-mono text-amber-400">380</div>
                  <div className="text-sm text-white/60 mt-2">ПРОЕКТИ ЗАВРШЕНИ</div>
                </div>
                <div>
                  <div className="text-4xl font-mono text-amber-400">24</div>
                  <div className="text-sm text-white/60 mt-2">ЗЕМЈИ ИЗВЕЗЕНИ</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <div className="aspect-square bg-zinc-800 rounded-3xl overflow-hidden border border-amber-900">
                <img 
                  src="https://picsum.photos/id/1016/800/800" 
                  alt="Stone workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-amber-400 text-sm tracking-widest mb-3">ПРЕМИУМ КВАЛИТЕТ</div>
            <h2 className="text-5xl font-semibold">{t.servicesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service, index) => (
              <div key={index} className="group bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 rounded-3xl p-8 transition-all hover:-translate-y-1">
                <div className="h-16 w-16 bg-gradient-to-br from-amber-400 to-yellow-600 text-zinc-950 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-white/70 leading-relaxed">{service.desc}</p>
                
                <div className="mt-8 pt-8 border-t border-white/10 text-xs flex items-center gap-2 text-amber-400">
                  <span>ПОДОБРО ОД ВЧЕРА</span>
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div id="gallery" className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="uppercase text-xs tracking-widest text-amber-400 mb-2">НАШЕ ТВОРЕШТВО</div>
              <h2 className="text-5xl font-semibold">{t.galleryTitle}</h2>
            </div>
            
            <button 
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-3 bg-white text-zinc-950 px-8 py-4 rounded-2xl font-medium hover:bg-amber-300 active:scale-[0.985] transition-all"
            >
              <Upload size={20} />
              {t.uploadBtn}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((img, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(img)}
                className="aspect-square overflow-hidden rounded-3xl cursor-pointer relative group"
              >
                <img 
                  src={img} 
                  alt={`Stone work ${index}`} 
                  className="w-full h-full object-cover transition-all group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                  <div className="text-xs text-white/80">Природен камен • {2022 + (index % 3)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS / TESTIMONIALS */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-5xl font-semibold mb-16">{t.testimonialsTitle}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-900 p-8 rounded-3xl">
                <div className="flex mb-8">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-amber-400" size={22} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/80 mb-8">"{testimonial.text}"</p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-xs text-white/50">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="bg-zinc-950 py-24 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="sticky top-28">
                <div className="text-amber-400 text-sm mb-6 tracking-widest">СКАПЈЕ • СОФИЈА • ТИРАНА</div>
                <h2 className="text-6xl font-semibold leading-none tracking-tighter mb-8">
                  {t.contactTitle}
                </h2>
                <p className="text-2xl text-white/70 mb-10">{t.contactSubtitle}</p>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <Phone className="text-amber-400 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm">ТЕЛЕФОН</div>
                      <a href="tel:+38970123456" className="text-xl">+389 70 123 456</a>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <Mail className="text-amber-400 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm">EMAIL</div>
                      <a href="mailto:info@kamen.mk" className="text-xl">info@kamen.mk</a>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <MapPin className="text-amber-400 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm">АДРЕСА</div>
                      <div className="text-xl">Бул. Партизански Одреди 43,<br />1000 Скопје, Македонија</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7">
              {isSubmitted ? (
                <div className="bg-emerald-900/30 border border-emerald-400 h-full rounded-3xl flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
                    <Heart className="text-emerald-400" size={42} />
                  </div>
                  <div className="text-3xl font-medium mb-3">Ви благодариме!</div>
                  <div className="text-white/70 max-w-xs">Ќе ве контактираме во рок од 24 часа.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 text-white/60">{t.name}</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-2xl px-6 py-6 outline-none text-lg"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 text-white/60">{t.phone}</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-2xl px-6 py-6 outline-none text-lg"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-3 text-white/60">{t.email}</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-2xl px-6 py-6 outline-none text-lg"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-3 text-white/60">{t.message}</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-3xl px-6 py-6 outline-none text-lg resize-y"
                      placeholder="Кажете ни за вашиот проект..."
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-zinc-950 py-6 rounded-2xl text-lg font-semibold transition-all active:scale-[0.985]"
                  >
                    {t.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 opacity-40">
              <div className="w-8 h-8 bg-white rounded-2xl flex items-center justify-center text-xl">🪨</div>
              <div className="text-4xl font-bold tracking-tighter">KAMEN</div>
            </div>
          </div>
          
          <div className="text-white/40 text-sm">
            {t.footer}
          </div>
          <div className="text-[10px] text-white/30 mt-8">
            MULTILINGUAL • MACEDONIA • BULGARIA • ALBANIA
          </div>
        </div>
      </footer>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[85vh] mx-auto rounded-3xl shadow-2xl"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-6 -right-6 bg-zinc-900 text-white w-12 h-12 rounded-full flex items-center justify-center border border-zinc-700 hover:bg-red-500/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center">
          <div className="bg-zinc-900 rounded-3xl max-w-md w-full mx-4 p-10">
            <h3 className="text-3xl mb-2">Додај слика</h3>
            <p className="text-white/60 mb-8">Споделете ја вашата работа со природен камен</p>
            
            <label className="border border-dashed border-amber-400 hover:border-amber-300 h-64 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all">
              <Upload size={52} className="text-amber-400 mb-6" />
              <div className="text-center">
                <div className="font-medium">Кликни за да прикачиш</div>
                <div className="text-xs text-white/50 mt-1">JPG, PNG, WEBP • max 10MB</div>
              </div>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleUpload}
                className="hidden" 
              />
            </label>
            
            <button 
              onClick={() => setShowUpload(false)}
              className="mt-8 w-full py-4 text-sm tracking-widest border border-white/30 rounded-2xl"
            >
              ОТКАЖИ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
