import React, { useEffect, useRef } from 'react';

export const SolarVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for solar energy matrix
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? '#FACC15' : Math.random() > 0.5 ? '#F97316' : '#06B6D4',
      alpha: Math.random() * 0.7 + 0.3
    }));

    let pulseAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseAngle += 0.02;

      // Draw central sun core glow
      const centerX = width / 2;
      const centerY = height / 2;
      const coreRadius = 50 + Math.sin(pulseAngle) * 6;

      const radialGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreRadius * 2.5);
      radialGrad.addColorStop(0, 'rgba(250, 204, 21, 0.9)');
      radialGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.5)');
      radialGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.15)');
      radialGrad.addColorStop(1, 'rgba(11, 15, 25, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = radialGrad;
      ctx.fill();

      // Sun core outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#FACC15';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw solar particle energy mesh
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with glowing energy filaments
        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 90) * 0.25;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] flex items-center justify-center rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/60 backdrop-blur-xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-amber-400">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        Interactive Particle Array
      </div>
    </div>
  );
};
