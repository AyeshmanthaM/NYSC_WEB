import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { colorConfig } from '../../config/colors';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshCanvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.5 ? colorConfig.animated.particles.burgundy : colorConfig.animated.particles.navy;
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Pulse effect
        this.opacity = (Math.sin(time * this.pulseSpeed + this.pulsePhase) + 1) * 0.15 + 0.1;

        // Smooth boundary wrapping
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${this.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;
      
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });

      // Draw connections with gradient
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;
            
            const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
            gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${other.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  // Dynamic Mesh Pattern
  useEffect(() => {
    const canvas = meshCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class MeshPoint {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      offsetX: number;
      offsetY: number;
      angle: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        const waveX = Math.sin(time * 0.001 + this.angle) * 20;
        const waveY = Math.cos(time * 0.001 + this.angle * 0.5) * 20;
        this.x = this.baseX + waveX;
        this.y = this.baseY + waveY;
      }
    }

    const gridSize = 100;
    const points: MeshPoint[][] = [];
    
    for (let i = 0; i <= canvas.width / gridSize + 1; i++) {
      points[i] = [];
      for (let j = 0; j <= canvas.height / gridSize + 1; j++) {
        points[i][j] = new MeshPoint(i * gridSize, j * gridSize);
      }
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;

      // Update mesh points
      points.forEach(row => {
        row.forEach(point => {
          point.update(time);
        });
      });

      // Draw mesh with gradients
      ctx.strokeStyle = isDark 
        ? colorConfig.animated.mesh.dark
        : colorConfig.animated.mesh.light;
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length - 1; j++) {
          ctx.beginPath();
          ctx.moveTo(points[i][j].x, points[i][j].y);
          ctx.lineTo(points[i][j + 1].x, points[i][j + 1].y);
          ctx.stroke();
        }
      }

      // Vertical lines
      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 0; j < points[i].length; j++) {
          ctx.beginPath();
          ctx.moveTo(points[i][j].x, points[i][j].y);
          ctx.lineTo(points[i + 1][j].x, points[i + 1][j].y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${
        isDark 
          ? colorConfig.animated.backgroundGradient.dark
          : colorConfig.animated.backgroundGradient.light
      }`} />
      
      {/* Top to Bottom Deep Red Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark
            ? colorConfig.animated.topGradient.dark
            : colorConfig.animated.topGradient.light,
        }}
      />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow ${
            isDark ? colorConfig.animated.orbs.burgundy.opacity.dark.primary : colorConfig.animated.orbs.burgundy.opacity.light.primary
          }`}
          style={{
            background: colorConfig.animated.orbs.burgundy.gradient,
            top: '10%',
            left: '-10%',
          }}
        />
        <div 
          className={`absolute w-[800px] h-[800px] rounded-full blur-3xl animate-float-reverse ${
            isDark ? colorConfig.animated.orbs.navy.opacity.dark : colorConfig.animated.orbs.navy.opacity.light
          }`}
          style={{
            background: colorConfig.animated.orbs.navy.gradient,
            bottom: '-20%',
            right: '-15%',
          }}
        />
        <div 
          className={`absolute w-[500px] h-[500px] rounded-full blur-3xl animate-float-medium ${
            isDark ? colorConfig.animated.orbs.burgundy.opacity.dark.secondary : colorConfig.animated.orbs.burgundy.opacity.light.secondary
          }`}
          style={{
            background: colorConfig.animated.orbs.burgundy.gradient,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Wave Pattern Overlay */}
      <svg 
        className={`absolute inset-0 w-full h-full ${
          isDark ? 'opacity-10' : 'opacity-5'
        }`}
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <g mask="url(#wave-mask)">
          <path 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,240C960,235,1056,213,1152,213.3C1248,213,1344,235,1392,245.3L1440,256L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z"
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <path 
            d="M0,320L48,309.3C96,299,192,277,288,277.3C384,277,480,299,576,314.7C672,331,768,341,864,336C960,331,1056,309,1152,309.3C1248,309,1344,331,1392,341.3L1440,352L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z"
            fill="url(#wave-gradient2)"
            className="animate-wave-reverse"
            opacity="0.5"
          />
        </g>
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorConfig.animated.wave.primary} />
            <stop offset="100%" stopColor={colorConfig.animated.wave.secondary} />
          </linearGradient>
          <linearGradient id="wave-gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorConfig.animated.wave.secondary} />
            <stop offset="100%" stopColor={colorConfig.animated.wave.tertiary} />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic Mesh Canvas */}
      <canvas 
        ref={meshCanvasRef}
        className={`absolute inset-0 w-full h-full ${
          isDark ? colorConfig.animated.canvas.mesh.dark : colorConfig.animated.canvas.mesh.light
        }`}
      />

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${
          isDark ? colorConfig.animated.canvas.particles.dark : colorConfig.animated.canvas.particles.light
        }`}
      />

      {/* Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-96 h-96 border rounded-full animate-rotate-slow ${
            isDark 
              ? colorConfig.animated.geometric.dark
              : colorConfig.animated.geometric.light
          }`}
          style={{ top: '20%', right: '10%' }}
        />
        <div 
          className={`absolute w-64 h-64 border rounded-full animate-rotate-reverse ${
            isDark 
              ? colorConfig.animated.geometric.dark
              : colorConfig.animated.geometric.light
          }`}
          style={{ bottom: '30%', left: '15%' }}
        />
        <div 
          className={`absolute w-48 h-48 border transform rotate-45 animate-pulse-slow ${
            isDark 
              ? colorConfig.animated.geometric.dark
              : colorConfig.animated.geometric.light
          }`}
          style={{ top: '60%', right: '40%' }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark ? colorConfig.animated.noise.dark : colorConfig.animated.noise.light
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;