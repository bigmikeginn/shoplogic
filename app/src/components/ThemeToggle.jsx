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
      className="px-3.5 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
      style={{
        border: '1px solid var(--border-light)',
        backgroundColor: 'color-mix(in srgb, var(--text-primary) 3%, transparent)',
        color: 'var(--text-primary)',
      }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--text-primary) 6%, transparent)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--text-primary) 3%, transparent)'}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
