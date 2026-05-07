import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('shoplogic-theme');
    return stored || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shoplogic-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-md transition-colors duration-200"
      style={{
        backgroundColor: 'transparent',
        color: 'var(--text-muted)',
      }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
    >
      {theme === 'dark' ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l.707.707m-12.728 0l-.707-.707m12.728 12.728l.707.707m-12.728 0l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
