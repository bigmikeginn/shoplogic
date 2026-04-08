import { getModulesSorted } from '../utils/moduleConfig';

export default function ModuleMenu({ onSelectModule }) {
  const modules = getModulesSorted();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-responsive-2xl font-bold text-white mb-2">
          ShopLogic Utility
        </h1>
        <p className="text-responsive-base text-gray-300">
          Woodworking Tools & Calculators
        </p>
      </div>

      {/* Module Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`
                relative overflow-hidden rounded-xl p-6 sm:p-8
                bg-gradient-to-br ${module.gradient}
                text-white font-semibold
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl
                focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
                group animate-slide-up
              `}
              style={{
                animationDelay: `${module.order * 50}ms`,
              }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-4xl sm:text-5xl mb-3">
                  {module.icon}
                </div>
                <h2 className="text-responsive-lg font-bold mb-2">
                  {module.title}
                </h2>
                <p className="text-responsive-sm opacity-90">
                  {module.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center mt-12 sm:mt-16 text-gray-400 text-responsive-sm">
        <p>✨ Select a tool to get started</p>
      </div>
    </div>
  );
}
