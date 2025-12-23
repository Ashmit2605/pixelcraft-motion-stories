import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredWorks = [
  {
    id: 1,
    title: 'Neon Dreams',
    category: '2D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Cosmic Journey',
    category: '3D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Abstract Flow',
    category: 'Motion Graphics',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Digital Reality',
    category: 'VFX',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'City Lights',
    category: 'Motion Graphics',
    thumbnail: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Future Vision',
    category: '3D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=400&fit=crop',
  },
];

export const FeaturedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Motion in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Featured creations from our talented members
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Play Button */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={hoveredId === work.id ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow-primary">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </motion.div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {work.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-1">
                    {work.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Button variant="hero-outline" size="lg" className="group">
            View Full Showcase
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
