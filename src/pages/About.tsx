import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Eye, Sparkles, Rocket, Heart, Zap } from 'lucide-react';
import { useRef } from 'react';

const journeySteps = [
  {
    year: '2021',
    title: 'The Spark',
    description: 'A group of animation enthusiasts came together with a shared dream — to create a space where creativity knows no bounds.',
  },
  {
    year: '2022',
    title: 'First Steps',
    description: 'We hosted our first workshop with just 12 members. The energy in that room was electric.',
  },
  {
    year: '2023',
    title: 'Growing Community',
    description: '100+ members joined PixelCraft. We launched our first collaborative project showcased at the university festival.',
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description: 'Our work caught the attention of animation studios. Partnerships formed. Members got internships.',
  },
  {
    year: 'Future',
    title: 'Limitless Horizons',
    description: 'We\'re just getting started. More workshops, more projects, more opportunities to create magic.',
  },
];

const differentiators = [
  {
    icon: Heart,
    title: 'Passion-First Community',
    description: 'We don\'t just teach techniques — we nurture creativity and celebrate every frame of your journey.',
    gradient: 'from-primary to-primary/60',
  },
  {
    icon: Rocket,
    title: 'Real-World Projects',
    description: 'Work on actual client projects and build a portfolio that matters, not just classroom exercises.',
    gradient: 'from-secondary to-secondary/60',
  },
  {
    icon: Zap,
    title: 'Industry Connections',
    description: 'Direct mentorship from working professionals and exclusive access to studio visits and internships.',
    gradient: 'from-accent to-accent/60',
  },
  {
    icon: Sparkles,
    title: 'Creative Freedom',
    description: 'Experiment with any style, any tool, any idea. We celebrate bold creative risks.',
    gradient: 'from-primary to-secondary',
  },
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, hsl(280 100% 65% / 0.4) 0%, transparent 70%)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
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
          </motion.div>

          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Story Behind
            <br />
            <span className="text-gradient">PixelCraft</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Where pixels become stories, and students become artists.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group"
            >
              <div className="glass rounded-3xl p-10 lg:p-12 border border-border/30 hover:border-primary/50 transition-all duration-500 h-full relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 30% 30%, hsl(25 100% 55% / 0.1) 0%, transparent 50%)' }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-8">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To democratize animation education by providing students with hands-on learning opportunities, 
                    industry mentorship, and a supportive community where creativity flourishes and every frame 
                    tells a story worth sharing.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="group"
            >
              <div className="glass rounded-3xl p-10 lg:p-12 border border-border/30 hover:border-secondary/50 transition-all duration-500 h-full relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 70% 70%, hsl(280 100% 65% / 0.1) 0%, transparent 50%)' }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center mb-8">
                    <Eye className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-foreground">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become the launchpad for the next generation of animators, motion designers, and 
                    visual storytellers — building a creative ecosystem where students collaborate, 
                    innovate, and inspire the world through motion.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-32 relative" ref={timelineRef}>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every great story has a beginning. Here's ours.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30">
              <motion.div 
                className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
                style={{ height: lineHeight }}
              />
            </div>

            {journeySteps.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary z-10 ring-4 ring-background"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div 
                    className="glass rounded-2xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <span className="text-primary font-display font-bold text-2xl">{step.year}</span>
                    <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Makes Us <span className="text-gradient">Different</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're not just another club. We're a creative movement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="glass rounded-2xl p-8 border border-border/30 hover:border-primary/50 transition-all duration-500 h-full relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 50%, hsl(25 100% 55% / 0.08) 0%, transparent 60%)` }}
                  />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                      <item.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/join">Start Your Journey</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;