import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const quickLinks = [
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Events', path: '/events' },
  { name: 'Join', path: '/join' },
  { name: 'Contact', path: '/contact' },
];

const socials = [
  { icon: Instagram, url: '#', label: 'Instagram' },
  { icon: Twitter, url: '#', label: 'Twitter' },
  { icon: Youtube, url: '#', label: 'YouTube' },
  { icon: Linkedin, url: '#', label: 'LinkedIn' },
];

export const Footer = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 400;

    const waves: Array<{
      y: number;
      length: number;
      amplitude: number;
      frequency: number;
      color: string;
    }> = [
      { y: 200, length: 0.01, amplitude: 30, frequency: 0.02, color: 'rgba(255, 136, 51, 0.1)' },
      { y: 250, length: 0.015, amplitude: 25, frequency: 0.015, color: 'rgba(178, 102, 255, 0.08)' },
      { y: 300, length: 0.02, amplitude: 20, frequency: 0.01, color: 'rgba(0, 212, 212, 0.06)' },
    ];

    let animationId: number;
    let increment = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let i = 0; i < canvas.width; i++) {
          ctx.lineTo(
            i,
            wave.y + Math.sin(i * wave.length + increment * wave.frequency) * wave.amplitude
          );
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      increment += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden pt-20 pb-8">
      {/* Animated Wave Background */}
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 right-0 z-0 opacity-50"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-[1]" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12 mb-16"
        >
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <span className="text-primary-foreground font-display font-bold text-2xl">P</span>
              </motion.div>
              <span className="font-display font-bold text-2xl text-foreground">
                PixelCraft
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A student animation club where imagination meets motion. Crafting stories, one frame at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg glass border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-border/30 pt-8"
        >
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PixelCraft. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
