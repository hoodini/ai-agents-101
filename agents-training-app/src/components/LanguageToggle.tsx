import { useStore } from '../store/useStore';

export function LanguageToggle() {
  const { language, setLanguage } = useStore();

  const handleLanguageChange = (lang: 'en' | 'he') => {
    setLanguage(lang);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return (
    <div className="flex items-center gap-1 glass rounded-lg p-1 border border-white/10 min-w-[140px]">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all flex-1 min-w-[64px] ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        title="English"
      >
        <span className="text-base leading-none">🇺🇸</span>
        <span className="text-sm font-medium">EN</span>
      </button>
      <button
        onClick={() => handleLanguageChange('he')}
        className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all flex-1 min-w-[64px] ${
          language === 'he'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        title="עברית"
      >
        <span className="text-base leading-none">🇮🇱</span>
        <span className="text-sm font-medium">HE</span>
      </button>
    </div>
  );
}
