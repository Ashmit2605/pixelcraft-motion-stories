import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, FolderKanban, Heart, Star } from 'lucide-react';

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

  return (
    <section ref={ref} className="py-32 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Why Join <span className="text-gradient">PixelCraft</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            More than just a club — it's a launchpad for your creative journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative glass rounded-2xl p-8 h-full border border-border/30 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 relative z-10`}
                >
                  <benefit.icon className="w-7 h-7 text-foreground" />
                </motion.div>

                <h3 className="font-display text-xl font-bold mb-3 text-foreground relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
