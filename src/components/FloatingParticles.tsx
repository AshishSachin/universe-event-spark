
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  shapes?: boolean;
  glow?: boolean;
}

const FloatingParticles = ({ 
  count = 30, 
  colors = ['#8B5CF6', '#A78BFA', '#EC4899', '#3B82F6'], 
  speed = 1,
  shapes = false,
  glow = false
}: FloatingParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setting

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Shape drawing functions
    const drawShape = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const fillStyle = glow 
        ? particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')
        : particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      
      ctx.fillStyle = fillStyle;
      
      if (glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
      }
      
      switch (particle.shape) {
        case 'square':
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          const spikes = 5;
          const outerRadius = particle.size;
          const innerRadius = particle.size / 2;
          let rot = Math.PI / 2 * 3;
          let step = Math.PI / spikes;
          
          ctx.beginPath();
          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(Math.cos(rot) * outerRadius + 0, Math.sin(rot) * outerRadius + 0);
            rot += step;
            ctx.lineTo(Math.cos(rot) * innerRadius + 0, Math.sin(rot) * innerRadius + 0);
            rot += step;
          }
          ctx.closePath();
          ctx.fill();
          break;
        case 'circle':
        default:
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.7 * speed,
      speedY: (Math.random() - 0.5) * 0.7 * speed,
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      shape: shapes ? 
        ['circle', 'square', 'triangle', 'star'][Math.floor(Math.random() * 4)] as Particle['shape'] :
        'circle'
    }));

    const animate = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Bounce effect when hitting edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1;
        }

        // Draw particle based on its shape
        drawShape(ctx, particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, count, colors, speed, shapes, glow]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FloatingParticles;
