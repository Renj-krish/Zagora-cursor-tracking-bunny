import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // targetTimeRef stores the intended time based on mouse movement
  const targetTimeRef = useRef<number>(0);
  
  // smoothTimeRef chases targetTimeRef smoothly
  const smoothTimeRef = useRef<number>(0);
  
  const isSeekingRef = useRef<boolean>(false);
  const prevXRef = useRef<number | null>(null);

  // Handle Mouse Movement to update targetTime
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || isNaN(videoRef.current.duration)) return;

      const video = videoRef.current;
      const currentX = e.clientX;

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const SENSITIVITY = 1.0; // Balanced sensitivity for better frame pacing
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;

      let newTarget = targetTimeRef.current + timeOffset;
      // Clamp between 0 and video duration
      newTarget = Math.max(0, Math.min(newTarget, video.duration));
      
      targetTimeRef.current = newTarget;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation Loop for Smooth Scrubbing
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      if (videoRef.current && !isNaN(videoRef.current.duration)) {
        // Lerp (Linear Interpolation)
        const diff = targetTimeRef.current - smoothTimeRef.current;
        smoothTimeRef.current += diff * 0.05; // Lowered to 0.05 for a much smoother, glide-like catchup

        if (!isSeekingRef.current) {
          const videoDiff = smoothTimeRef.current - videoRef.current.currentTime;
          
          // Only seek if the difference is larger than a tiny threshold
          if (Math.abs(videoDiff) > 0.03) {
            isSeekingRef.current = true;
            videoRef.current.currentTime = smoothTimeRef.current;
          }
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSeeked = () => {
    isSeekingRef.current = false;
  };

  return (
    <video
      ref={videoRef}
      src="/low quality bunny.mp4"
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 w-full h-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
