import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Box, Wand2, Sparkles, PenTool, ArrowRight } from 'lucide-react';

const domains = [
  { icon: Layers, name: '2D Animation', color: 'from-primary to-primary/60' },
  { icon: Box, name: '3D Animation', color: 'from-secondary to-secondary/60' },
  { icon: Wand2, name: 'Motion Graphics', color: 'from-accent to-accent/60' },
  { icon: Sparkles, name: 'VFX', color: 'from-primary to-secondary' },
  { icon: PenTool, name: 'Storyboarding', color: 'from-secondary to-accent' },
];

export const DomainsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-card/50" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Domains</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore the creative realms we master
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.08, 
                rotateY: 15,
                rotateX: -5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative glass rounded-2xl p-6 text-center border border-border/30 group-hover:border-primary/50 transition-all duration-500">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-4`}
                >
                  <domain.icon className="w-7 h-7 text-foreground" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground text-sm">
                  {domain.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
