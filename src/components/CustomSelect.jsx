import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={`custom-select-container ${className}`} ref={containerRef}>
      {label && <label className="form-label">{label}</label>}

      {/* Trigger Box */}
      <button
        type="button"
        id={`select-${name}`}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="custom-select-label">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`custom-select-chevron ${isOpen ? 'rotate' : ''}`}
        />
      </button>

      {/* Luxury Rounded Dropdown Menu */}
      {isOpen && (
        <div className="custom-select-menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={15} className="custom-select-check" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
