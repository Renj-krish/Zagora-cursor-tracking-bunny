import { useState, useEffect } from 'react';

const LINKS = ['About', 'Projects', 'Openings', 'Services'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center z-20">
          <img src="/bunny-logo-transparent.png" alt="Logo" className="h-10 w-auto object-contain" />
          <img src="/zagora-name-transparent.png" alt="ZAGORA" className="h-6 sm:h-8 w-auto object-contain" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row gap-2 text-[14px] text-black">
          {LINKS.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="px-4 py-4 hover:opacity-60 transition-opacity bg-transparent cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a 
          href="#contact" 
          className="hidden md:block px-4 py-4 text-[14px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity bg-transparent cursor-pointer"
        >
          Get in touch
        </a>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col gap-[5px] justify-center items-center z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-[2px] bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-6 h-[2px] bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden z-[9]`}
        style={{ 
          opacity: isOpen ? 1 : 0, 
          pointerEvents: isOpen ? 'auto' : 'none' 
        }}
      >
        <div className="flex flex-col gap-8">
          {LINKS.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-[20px] font-medium text-black"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <a 
            href="#contact" 
            className="text-[20px] font-medium text-black underline underline-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
