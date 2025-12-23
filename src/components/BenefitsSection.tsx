import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Zap, FolderKanban, Heart, Star } from 'lucide-react';
import { gsap } from 'gsap';

const benefits = [
  {
    icon: Zap,
    title: 'Learn by Doing',
    description: 'Hands-on workshops and real projects from day one.',
    gradient: 'from-primary to-primary/50',
  },
  {
    icon: FolderKanban,
    title: 'Build Real Projects',
    description: 'Create portfolio-worthy work with industry tools.',
    gradient: 'from-secondary to-secondary/50',
  },
  {
    icon: Heart,
    title: 'Creative Community',
    description: 'Connect with like-minded creative peers.',
    gradient: 'from-accent to-accent/50',
  },
  {
    icon: Star,
    title: 'Exposure & Recognition',
    description: 'Showcase your work and gain visibility.',
    gradient: 'from-primary to-secondary',
  },
];

export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  // Scroll-based background gradient shift
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  // GSAP pulse glow animation for icons (offset timings)
  useEffect(() => {
    iconRefs.current.forEach((iconEl, index) => {
      if (iconEl) {
        gsap.to(iconEl, {
          scale: 1.05,
          opacity: 0.9,
          duration: 2 + index * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.5, // Offset so they don't pulse together
        });
      }
    });
  }, []);

  // GSAP slow background movement
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 50%',
        duration: 25,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  // First row (indices 0, 1) and second row (indices 2, 3)
  const firstRow = benefits.slice(0, 2);
  const secondRow = benefits.slice(2, 4);

  const renderCard = (benefit: typeof benefits[0], index: number, rowOffset: number) => {
    const actualIndex = index + rowOffset;
    
    return (
      <motion.div
        key={benefit.title}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: 0.3 + actualIndex * 0.12,
          ease: 'easeOut'
        }}
        className="group"
      >
        <motion.div 
          className="relative glass rounded-2xl p-8 h-full border border-border/30 transition-all duration-500 overflow-hidden"
          whileHover={{ 
            y: -8,
            boxShadow: '0 25px 50px -12px hsl(25 100% 55% / 0.25)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Hover glow accent border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, hsl(25 100% 55% / 0.1) 0%, hsl(280 100% 65% / 0.1) 100%)',
            }}
          />
          
          {/* Animated glow border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              border: '1px solid hsl(25 100% 55% / 0.4)',
            }}
          />
          
          {/* Icon with GSAP pulse glow */}
          <div
            ref={(el) => (iconRefs.current[actualIndex] = el)}
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 relative z-10`}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <benefit.icon className="w-7 h-7 text-foreground" />
            </motion.div>
          </div>

          <h3 className="font-display text-xl font-bold mb-3 text-foreground relative z-10 group-hover:text-primary transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
            {benefit.description}
          </p>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Animated background with scroll-linked gradient shift */}
      <motion.div 
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(25 100% 55% / 0.05) 25%, hsl(280 100% 65% / 0.05) 50%, hsl(240 10% 4%) 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
          opacity: bgOpacity,
        }}
      />
      
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />
      
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading with scale-up animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Why Join{' '}
            <span className="relative inline-block">
              <span className="text-gradient">PixelCraft</span>
              {/* Shimmer effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
                style={{ mixBlendMode: 'overlay' }}
              />
            </span>
            ?
          </h2>
          
          {/* Subheading with delay */}
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            More than just a club — it's a launchpad for your creative journey
          </motion.p>
        </motion.div>

        {/* Two-row grid with independent stagger */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* First Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {firstRow.map((benefit, index) => renderCard(benefit, index, 0))}
          </div>
          
          {/* Second Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {secondRow.map((benefit, index) => renderCard(benefit, index, 2))}
          </div>
        </div>
      </div>
    </section>
  );
};