import ThemeToggle from './ThemeToggle';

export default function ToolLayout({ title, description, onBack, action, children }) {
  return (
    <div className="min-h-screen w-full flex flex-col relative z-10">
      {/* Header */}
      <header className="border-b sticky top-0 z-20 backdrop-blur-xl" style={{ borderColor: 'var(--border-light)', backgroundColor: 'rgba(8, 8, 12, 0.9)' }}>
        <div className="px-5 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 group"
            style={{ border: '1px solid var(--border-light)', backgroundColor: 'color-mix(in srgb, var(--text-primary) 3%, transparent)' }}
            title="Back to menu"
          >
            <svg className="w-4 h-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img src="/logo.png" alt="ShopLogic Logo" className="h-8 sm:h-10 w-auto flex-shrink-0" />

          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h2>
            {description && (
              <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {action && (
              <button
                onClick={action.onClick}
                className="px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200"
                style={{
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'color-mix(in srgb, var(--accent) 16%, transparent)',
                  color: 'var(--accent)',
                }}
                title={action.label}
              >
                {action.label}
              </button>
            )}
            <ThemeToggle />
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
