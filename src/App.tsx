// src/components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Rreth Nesh
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Historia dhe pasioni ynë për artin në gur
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2070&auto=format&fit=crop" 
              alt="Studio"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Që nga viti 2010, ne kemi sjellë artin më të bukur në gur për klientët tanë. 
              Pasioni ynë për detajet dhe cilësinë na bën unik në treg.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Punojmë me mjeshtrit më të mirë të gurit në Shqipëri, duke sjellë traditën 
              dhe modernitetin në çdo vepër arti.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">100+</div>
                <div className="text-sm text-gray-400">Vepra Arti</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">50+</div>
                <div className="text-sm text-gray-400">Klientë</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">10+</div>
                <div className="text-sm text-gray-400">Vite Eksperiencë</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}