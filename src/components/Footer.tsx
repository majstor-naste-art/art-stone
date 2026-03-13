export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl">
                  💎
                </div>
                <div>
                  <h3 className="text-xl font-bold gradient-text font-display">
                    ART-STONE
                  </h3>
                  <p className="text-xs text-gray-400">Premium Gallery</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Platforma moderne për ndarjen dhe menaxhimin e imazheve artistike. 
                Krijuar me pasion për artin dhe teknologjinë.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Navigimi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors">
                    Ballina
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors">
                    Galeria
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors">
                    Rreth nesh
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors">
                    Kontakt
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span> info@artstone.com
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> +383 44 123 456
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Prishtinë, Kosovë
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 ART-STONE. Të gjitha të drejtat e rezervuara.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Krijuar me ❤️ për artin</span>
              <div className="flex gap-2">
                {['📘', '📸', '🐦', '💼'].map((emoji, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
