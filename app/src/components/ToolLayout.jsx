export default function ToolLayout({ title, description, onBack, children }) {
  return (
    <div className="min-h-screen w-full bg-[#0d0d12] flex flex-col relative z-10">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0d0d12]/90 backdrop-blur-xl sticky top-0 z-20">
        <div className="px-5 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-amber-500/30 hover:bg-amber-500/[0.06] transition-all duration-200 group"
            title="Back to menu"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-white truncate">
              {title}
            </h2>
            {description && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full overflow-auto scrollbar-styled">
        {children}
      </main>
    </div>
  );
}