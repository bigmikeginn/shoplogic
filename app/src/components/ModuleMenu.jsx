import { useState, useEffect, useMemo } from 'react';
import { getModulesByCategory, CATEGORIES } from '../utils/moduleConfig';
import { MODULE_ICONS } from './Icons';
import ThemeToggle from './ThemeToggle';

function loadFavorites() {
  try {
    const stored = localStorage.getItem('shoplogic-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem('shoplogic-favorites', JSON.stringify(ids));
}

export default function ModuleMenu({ onSelectModule }) {
  const grouped = useMemo(() => getModulesByCategory(), []);
  const categoryOrder = Object.keys(CATEGORIES);

  const [favorites, setFavorites] = useState(loadFavorites);
  const [hoveredFav, setHoveredFav] = useState(null);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (moduleId, e) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const favoriteModules = useMemo(() => {
    const all = [];
    categoryOrder.forEach(cat => {
      (grouped[cat] || []).forEach(m => {
        if (favorites.includes(m.id)) all.push(m);
      });
    });
    return all;
  }, [favorites, grouped]);

  const renderCard = (module) => {
    const isFav = favorites.includes(module.id);
    const cat = CATEGORIES[module.category];
    const IconComponent = MODULE_ICONS[module.id];

    return (
      <button
        key={module.id}
        onClick={() => onSelectModule(module.id)}
        onMouseEnter={() => setHoveredFav(module.id)}
        onMouseLeave={() => setHoveredFav(null)}
        className={`glass-card glass-card-hover p-3 sm:p-4 text-center group animate-slide-up cursor-pointer relative ${cat?.accent} border-l-2`}
        style={{ animationDelay: `${module.order * 25}ms` }}
      >
        {/* Favorite star */}
        <button
          onClick={(e) => toggleFavorite(module.id, e)}
          className={`absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-200 z-10 ${isFav || hoveredFav === module.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${isFav ? 'text-amber-400' : 'text-gray-600 hover:text-amber-400/60'}`}
          title={isFav ? 'Remove favorite' : 'Add favorite'}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-amber-400/60 group-hover:text-amber-400 mb-1.5 sm:mb-2 transition-colors duration-200 flex justify-center">
          {IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" /> : <span className="text-lg sm:text-xl">{module.icon}</span>}
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold mb-0.5 group-hover:text-amber-400 transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>
          {module.title}
        </h3>

        {/* Description */}
        <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {module.description}
        </p>

        {/* Bottom accent */}
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/30 transition-all duration-300" />
      </button>
    );
  };

  return (
    <div className="w-full h-screen overflow-y-auto p-6 sm:p-8 lg:p-10 scrollbar-styled relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="relative z-10">
        {/* Theme toggle in header */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 gold-pulse" />
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-500">Workshop Tools</span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 gold-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
          ShopLogic<span className="text-amber-500 gold-glow-text">.</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
          Precision calculators for woodworking, metalworking & automotive
        </p>
      </div>

      {/* Favorites row */}
      {favoriteModules.length > 0 && (
        <div className="max-w-[1600px] mx-auto mb-8">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-amber-400/70">Favorites</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4">
            {favoriteModules.map(renderCard)}
          </div>
          <div className="mt-6 divider-subtle" />
        </div>
      )}

      {/* Category sections */}
      <div className="max-w-[1600px] mx-auto space-y-8">
        {categoryOrder.map(cat => {
          const tools = grouped[cat] || [];
          const catInfo = CATEGORIES[cat];
          if (tools.length === 0) return null;
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1 h-4 rounded-full bg-${catInfo.color}-500/40`} />
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">{catInfo.label}</span>
                <span className="text-[10px] text-gray-600">{tools.length} tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4">
                {tools.map(renderCard)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-10 sm:mt-12 text-gray-600 text-[10px] sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          Select a tool to begin
          <span className="w-1 h-1 rounded-full bg-gray-700" />
        </span>
      </div>
      </div>
    </div>
  );
}