import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, Box, Wand2, Sparkles, PenTool } from 'lucide-react';

const domains = [
  { 
    icon: Layers, 
    name: '2D Animation', 
    description: 'Traditional and digital frame-by-frame animation techniques.',
    color: 'from-primary to-primary/60' 
  },
  { 
    icon: Box, 
    name: '3D Animation', 
    description: 'Modeling, rigging, and animating in 3D environments.',
    color: 'from-secondary to-secondary/60' 
  },
  { 
    icon: Wand2, 
    name: 'Motion Graphics', 
    description: 'Dynamic graphics and text animation for media.',
    color: 'from-accent to-accent/60' 
  },
  { 
    icon: Sparkles, 
    name: 'VFX', 
    description: 'Visual effects and compositing for film and video.',
    color: 'from-primary to-secondary' 
  },
  { 
    icon: PenTool, 
    name: 'Storyboarding', 
    description: 'Visual storytelling and pre-production planning.',
    color: 'from-secondary to-accent' 
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">PixelCraft</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-16">
              PixelCraft is a student-run animation and motion design club dedicated to nurturing creative talent. 
              We believe in learning by doing, collaboration over competition, and the power of visual storytelling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="font-display text-3xl font-bold mb-8">Our Mission</h2>
            <div className="glass rounded-2xl p-8 border border-border/30">
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide students with a creative space to explore animation and motion design, 
                offering hands-on learning opportunities, mentorship from industry professionals, 
                and a supportive community where every frame counts.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-3xl font-bold mb-8">What We Do</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-4`}>
                    <domain.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                    {domain.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {domain.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/join">Join Us Today</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
