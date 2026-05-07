import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ value, onChange, children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = Array.isArray(children) ? children : [children];
  const selectedOption = options.find(opt => opt?.props?.value === value);
  const displayValue = selectedOption?.props?.children || 'Select...';

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-modern text-left flex items-center justify-between cursor-pointer hover:bg-white/[0.05] focus:ring-2 focus:ring-amber-500/30"
        {...props}
      >
        <span>{displayValue}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f14] border border-amber-500/20 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="max-h-64 overflow-y-auto scrollbar-styled">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.props.value)}
                className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors ${
                  value === option.props.value
                    ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-500'
                    : 'text-white hover:bg-white/[0.08] border-l-2 border-transparent'
                }`}
              >
                {option.props.children}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
