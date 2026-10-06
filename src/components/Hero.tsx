import { useState, useEffect } from 'react';

function useTypewriter(text: string, speed = 38, start = true, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    
    let timeoutId: number;
    let intervalId: number;

    timeoutId = window.setTimeout(() => {
      let i = 0;
      intervalId = window.setInterval(() => {
        setDisplayed(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, start, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const introText = "Hey there, meet ZAGORA,\nTIMESPARK's Adaptive Response Interface Agent";
  const mainText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";

  const intro = useTypewriter(introText, 38, true, 600);
  const main = useTypewriter(mainText, 38, intro.done, 200);

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (main.done) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [main.done]);

  const copyEmail = () => {
    navigator.clipboard.writeText("timespark.in");
  };

  const pillBaseClass = "inline-flex items-center justify-center rounded-full text-[10px] sm:text-[12px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200 cursor-pointer";

  return (
    <section className="h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative z-10">
      <div className="max-w-xl">
        
        {/* Intro Text */}
        <div 
          className="select-none mb-5 sm:mb-6 font-normal text-black whitespace-pre-line min-h-[44px]"
          style={{
            fontSize: 'clamp(14px, 3vw, 20px)',
            lineHeight: 1.3
          }}
        >
          {intro.displayed}
          {!intro.done && <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />}
        </div>

        {/* Main Text */}
        {intro.done && (
          <p 
            className="text-black mb-5 sm:mb-6 font-normal min-h-[44px]"
            style={{
              fontSize: 'clamp(14px, 3vw, 20px)',
              lineHeight: 1.35
            }}
          >
            {main.displayed}
            {!main.done && <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />}
          </p>
        )}

        {/* Action Pill Buttons */}
        <div 
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
        >
          {["Pitch us an idea", "Work with us", "Send a brief hello", "See how we operate"].map((label) => (
            <button key={label} className={`${pillBaseClass} bg-white text-black border border-black/10 hover:bg-black hover:text-white`}>
              {label}
            </button>
          ))}
          
          <button 
            onClick={copyEmail}
            className={`${pillBaseClass} text-white bg-transparent border border-white hover:bg-white hover:text-black gap-2 sm:gap-3`}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">timespark.in</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
