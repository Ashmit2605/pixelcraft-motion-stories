import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Users, Rocket } from 'lucide-react';

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

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What is <span className="text-gradient">PixelCraft</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            PixelCraft is a creative space where students learn, collaborate, and build animations together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative glass rounded-2xl p-8 h-full border border-border/50 hover:border-primary/50 transition-colors duration-500">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6`}
                >
                  <pillar.icon className="w-8 h-8 text-foreground" />
                </motion.div>

                <h3 className="font-display text-2xl font-bold mb-4 text-foreground group-hover:text-gradient transition-all duration-300">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
