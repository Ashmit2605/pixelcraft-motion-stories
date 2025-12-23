import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Palette, Users, Rocket } from 'lucide-react';
import { gsap } from 'gsap';

const pillars = [
  {
    icon: Palette,
    title: 'Learn Animation',
    description: 'Master the art of motion through hands-on workshops and mentorship.',
    gradient: 'from-primary to-primary/50',
  },
  {
    icon: Users,
    title: 'Creative Collaboration',
    description: 'Work with passionate peers to bring ambitious projects to life.',
    gradient: 'from-secondary to-secondary/50',
  },
  {
    icon: Rocket,
    title: 'Real-World Projects',
    description: 'Build a portfolio with professional-grade animation work.',
    gradient: 'from-accent to-accent/50',
  },
];

export const IdentitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  // GSAP continuous icon floating animation
  useEffect(() => {
    iconRefs.current.forEach((iconEl, index) => {
      if (iconEl) {
        gsap.to(iconEl, {
          y: -6,
          duration: 2 + index * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    });
  }, []);

  // GSAP slow background gradient movement
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Animated Background with slow gradient shift */}
      <div 
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(240 10% 4%) 0%, hsl(240 10% 8%) 25%, hsl(240 10% 6%) 50%, hsl(240 10% 4%) 100%)',
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 0%',
        }}
      />
      
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading with shimmer effect on "PixelCraft" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What is{' '}
            <span className="relative inline-block">
              <span className="text-gradient">PixelCraft</span>
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ 
                  WebkitBackgroundClip: 'text',
                  mixBlendMode: 'overlay',
                }}
              />
            </span>
            ?
          </h2>
          
          {/* Description with delayed fade */}
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            PixelCraft is a creative space where students learn, collaborate, and build animations together.
          </motion.p>
        </motion.div>

        {/* Staggered Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + index * 0.15,
                ease: 'easeOut'
              }}
              className="group relative"
            >
              {/* Hover glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsl(25 100% 55% / 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              
              <motion.div 
                className="relative glass rounded-2xl p-8 h-full border border-border/50 transition-all duration-500"
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 40px -10px hsl(25 100% 55% / 0.2)',
                  borderColor: 'hsl(25 100% 55% / 0.5)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Floating icon with GSAP animation */}
                <div
                  ref={(el) => (iconRefs.current[index] = el)}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <pillar.icon className="w-8 h-8 text-foreground" />
                  </motion.div>
                </div>

                <h3 className="font-display text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};