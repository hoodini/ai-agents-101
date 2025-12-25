import { Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 dark:border-white/10 light:border-black/15"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
      )}
    </button>
  );
}
