import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Zap, Users, Trophy } from 'lucide-react';

const benefits = [
  { icon: Zap, text: 'Weekly workshops & training' },
  { icon: Users, text: 'Collaborative project opportunities' },
  { icon: Trophy, text: 'Showcase your work' },
  { icon: Sparkles, text: 'Industry mentorship' },
];

const Join = () => {
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
              Join <span className="text-gradient">PixelCraft</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-16">
              Ready to start your animation journey? No experience needed — just bring your creativity and passion.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">What You'll Get</h2>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass rounded-2xl p-8 border border-border/30">
                <h2 className="font-display text-2xl font-bold mb-6">Sign Up</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-foreground mb-2">
                      Year of Study
                    </label>
                    <select
                      id="year"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                    >
                      <option value="">Select your year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="grad">Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                      Area of Interest
                    </label>
                    <select
                      id="interest"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                    >
                      <option value="">Select your interest</option>
                      <option value="2d">2D Animation</option>
                      <option value="3d">3D Animation</option>
                      <option value="motion">Motion Graphics</option>
                      <option value="vfx">VFX</option>
                      <option value="story">Storyboarding</option>
                      <option value="all">All of the above!</option>
                    </select>
                  </div>
                  <Button variant="hero" size="xl" className="w-full">
                    Join Now
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
