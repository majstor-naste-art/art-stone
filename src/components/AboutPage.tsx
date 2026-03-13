export function AboutPage() {
  const features = [
    {
      icon: '🎨',
      title: 'Dizajn Modern',
      description: 'Interface elegante dhe e thjeshtë për përdorim',
    },
    {
      icon: '🔒',
      title: 'Siguri',
      description: 'Imazhet tuaja të ruajtura në mënyrë të sigurt',
    },
    {
      icon: '⚡',
      title: 'Shpejtësi',
      description: 'Ngarkim dhe shfletim i shpejtë i imazheve',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Funksionon në të gjitha pajisjet',
    },
  ];

  const team = [
    { name: 'Art Stone', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Stone Art', role: 'Lead Designer', emoji: '👩‍🎨' },
    { name: 'Creative Mind', role: 'Developer', emoji: '👨‍💻' },
  ];

  return (
    <section className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span>💎</span>
            <span className="text-sm text-gray-300">Since 2024</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="gradient-text">Rreth</span> Nesh
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            ART-STONE është një platformë premium për ndarjen dhe menaxhimin e imazheve artistike. 
            Krijuar me pasion për artin dhe teknologjinë moderne.
          </p>
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="glass rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-3xl mb-6">
              🎯
            </div>
            <h2 className="text-2xl font-bold mb-4">Misioni Ynë</h2>
            <p className="text-gray-400 leading-relaxed">
              Të ofrojmë një platformë të thjeshtë dhe elegante për artistët dhe fotografët 
              që të ndajnë punën e tyre me botën. Besojmë se arti duhet të jetë i arritshëm 
              për të gjithë.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl mb-6">
              👁️
            </div>
            <h2 className="text-2xl font-bold mb-4">Vizioni Ynë</h2>
            <p className="text-gray-400 leading-relaxed">
              Të bëhemi platforma #1 për galeritë artistike online, duke kombinuar 
              teknologjinë më të fundit me dizajnin minimalist dhe funksionalitetin 
              e shkëlqyer.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Çfarë na <span className="gradient-text">dallon</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 text-center hover:scale-105 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ekipi <span className="gradient-text">Ynë</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-5xl mx-auto mb-4 group-hover:animate-pulse">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/10 to-pink-500/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Keni <span className="gradient-text">pyetje</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Na kontaktoni për çdo pyetje ose sugjerim. Jemi këtu për t'ju ndihmuar!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:info@artstone.com"
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <span>✉️</span> info@artstone.com
              </a>
              <a
                href="tel:+38344123456"
                className="px-6 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <span>📞</span> +383 44 123 456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
