import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroParticleMeshProps {
  className?: string;
}

const HeroParticleMesh: React.FC<HeroParticleMeshProps> = ({ className = '' }) => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      baseOpacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      centerDistance: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        // Enhanced base opacity for light mode
        this.baseOpacity = isDark ? Math.random() * 0.6 + 0.2 : Math.random() * 0.8 + 0.4;
        this.opacity = this.baseOpacity;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.centerDistance = 1;
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Calculate distance from center for fade effect
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        this.centerDistance = Math.min(distanceFromCenter / maxDistance, 1);

        // Pulse effect with center fade - enhanced for light mode
        const pulse = (Math.sin(time * this.pulseSpeed + this.pulsePhase) + 1) * 0.3 + 0.4;
        const centerFade = Math.pow(this.centerDistance, isDark ? 1.5 : 1.2);
        this.opacity = this.baseOpacity * pulse * centerFade;

        // Boundary wrapping
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        if (!ctx || this.opacity < 0.01) return;
        
        // Theme-aware colors
        const glowColor = isDark 
          ? { r: 100, g: 200, b: 255 } // Light blue for dark mode
          : { r: 30, g: 144, b: 255 };  // Darker blue for light mode
        
        const coreColor = isDark
          ? { r: 150, g: 220, b: 255 } // Light cyan for dark mode
          : { r: 0, g: 123, b: 255 };   // Strong blue for light mode
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Create glowing effect with enhanced visibility
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.radius * (isDark ? 3 : 4)
        );
        gradient.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${this.opacity})`);
        gradient.addColorStop(0.4, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${this.opacity * (isDark ? 0.6 : 0.8)})`);
        gradient.addColorStop(1, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle with enhanced visibility
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
        const coreOpacity = isDark ? this.opacity * 1.2 : this.opacity * 1.5;
        ctx.fillStyle = `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, ${Math.min(coreOpacity, 1)})`;
        ctx.fill();
      }
    }

    // Create particles with density based on screen size
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 120);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;
      
      // Update particles
      particles.forEach(particle => {
        particle.update(time);
      });

      // Draw connection lines
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxConnectionDistance = 150;

          if (distance < maxConnectionDistance) {
            const baseConnectionOpacity = isDark ? 0.4 : 0.6;
            const connectionOpacity = (1 - distance / maxConnectionDistance) * baseConnectionOpacity;
            const averageCenterDistance = (particle.centerDistance + other.centerDistance) / 2;
            const fadeOpacity = connectionOpacity * Math.pow(averageCenterDistance, isDark ? 1.2 : 1.0);
            
            const minOpacity = isDark ? 0.02 : 0.05;
            if (fadeOpacity > minOpacity) {
              // Theme-aware line colors
              const lineColor = isDark 
                ? { r: 100, g: 200, b: 255 } // Light blue for dark mode
                : { r: 30, g: 144, b: 255 };  // Darker blue for light mode
              
              const midColor = isDark
                ? { r: 120, g: 210, b: 255 } // Light cyan for dark mode  
                : { r: 0, g: 123, b: 255 };   // Strong blue for light mode
              
              // Create gradient line
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y, 
                other.x, other.y
              );
              gradient.addColorStop(0, `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${fadeOpacity * particle.opacity})`);
              gradient.addColorStop(0.5, `rgba(${midColor.r}, ${midColor.g}, ${midColor.b}, ${fadeOpacity * (isDark ? 0.8 : 1.0)})`);
              gradient.addColorStop(1, `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${fadeOpacity * other.opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = isDark ? 0.8 : 1.2;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();

            }
          }
        });
      });

      // Draw particles on top of connections
      particles.forEach(particle => {
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default HeroParticleMesh;