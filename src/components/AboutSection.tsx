import React from 'react';
import Logo from './Logo';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: '💎',
      title: 'Cilësi Premium',
      description: 'Çdo vepër krijohet nga gur i përzgjedhur me kujdes për cilësinë më të lartë.',
    },
    {
      icon: '🎨',
      title: 'Artizanat Unik',
      description: 'Dizajne ekskluzive të krijuara nga artistët tanë me përvojë dekadash.',
    },
    {
      icon: '🏛️',
      title: 'Traditë & Inovacion',
      description: 'Kombinim i teknikave tradicionale me teknologjinë moderne.',
    },
    {
      icon: '🌍',
      title: 'Materiale Globale',
      description: 'Gur i importuar nga vendet më të njohura për cilësinë e tyre.',
    },
  ];

  const team = [
    {
      name: 'Artan Krasniqi',
      role: 'Themelues & Artist Kryesor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    },
    {
      name: 'Blerina Hoxha',
      role: 'Dizajnere e Lartë',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    },
    {
      name: 'Driton Berisha',
      role: 'Master Skulptor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    },
  ];

  return (
    <section className="py-24 bg-stone-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-400 text-sm tracking-[0.3em] uppercase font-medium">
              Rreth Nesh
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
            Krijues të <span className="text-gold-gradient">Artit në Gur</span>
          </h1>
          
          <p className="text-xl text-stone-400 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Që nga viti 2009, ART-STONE ka qenë sinonim i përsosmërisë në artizanatin e gurit. 
            Ne transformojmë gurin e thjeshtë në vepra arti që qëndrojnë përjetë.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="glass-dark rounded-3xl p-8 border border-amber-500/20">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Misioni Ynë
            </h3>
            <p className="text-stone-400 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Të sjellim bukurinë e përjetshme të gurit në çdo hapësirë. Ne besojmë se arti 
              në gur nuk është thjesht dekoracion - është një dëshmi e kulturës, historisë 
              dhe pasionit njerëzor për të krijuar.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-8 border border-amber-500/20">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <span className="text-3xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Vizioni Ynë
            </h3>
            <p className="text-stone-400 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Të bëhemi galeria më e njohur e artit në gur në rajon, duke ruajtur traditën 
              tonë të artizanatit ndërsa përqafojmë inovacionin. Çdo vepër që krijojmë 
              synon të jetojë për breza.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Pse <span className="text-gold-gradient">ART-STONE</span>?
            </h2>
            <p className="text-stone-400">Arsyet pse klientët na zgjedhin ne</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-luxury bg-stone-900/50 border border-stone-800 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                  {feature.title}
                </h3>
                <p className="text-stone-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="glass-gold rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Vite Përvojë' },
              { value: '500+', label: 'Projekte të Përfunduara' },
              { value: '100%', label: 'Klientë të Kënaqur' },
              { value: '50+', label: 'Çmime & Njohje' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-gradient mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                  {stat.value}
                </div>
                <div className="text-stone-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Ekipi Ynë
            </h2>
            <p className="text-stone-400">Artistët pas veprave të jashtëzakonshme</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card-luxury bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden text-center"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-amber-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="glass-dark rounded-3xl p-12 border border-amber-500/20">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Gati për të Filluar?
            </h2>
            <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
              Na kontaktoni për të diskutuar projektin tuaj të ardhshëm. 
              Ekipi ynë është gati t'ju ndihmojë të realizoni vizionin tuaj.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+38349123456"
                className="btn-gold px-8 py-4 rounded-xl text-stone-900 font-semibold inline-flex items-center gap-2"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Na Telefononi
              </a>
              
              <a
                href="mailto:info@artstone.com"
                className="px-8 py-4 rounded-xl border-2 border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all duration-300 inline-flex items-center gap-2"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Dërgo Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
