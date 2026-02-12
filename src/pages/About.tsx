import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Target, Eye, Sparkles, Rocket, Heart, Zap, Lightbulb, PenTool, Play } from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  { icon: Lightbulb, title: "Ideation", description: "Brainstorm creative concepts and storylines" },
  { icon: PenTool, title: "Design", description: "Create storyboards, characters, and visual assets" },
  { icon: Play, title: "Animation", description: "Bring designs to life through motion" },
  { icon: Sparkles, title: "Polish", description: "Add effects, sound, and final touches" },
]

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

// SwapText Component
interface SwapTextProps {
  initialText: string;
  finalText: string;
  initialTextClassName?: string;
  finalTextClassName?: string;
  className?: string;
}

const SwapText = ({
  initialText,
  finalText,
  initialTextClassName = "",
  finalTextClassName = "",
  className = "",
}: SwapTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={initialTextClassName}
      >
        {initialText}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 ${finalTextClassName}`}
      >
        {finalText}
      </motion.div>
    </div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
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

      {/* Mission & Vision Cards with Swap Text Effect */}
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

                  <div className="hidden md:block">
                    <SwapText
                      initialText="To democratize animation education"
                      finalText="To democratize animation education by providing students with hands-on learning opportunities, industry mentorship, and a supportive community where creativity flourishes and every frame tells a story worth sharing."
                      className="min-h-[120px] transition-all duration-200 group-hover:mb-0"
                      initialTextClassName="text-lg text-muted-foreground leading-relaxed"
                      finalTextClassName="text-lg text-muted-foreground leading-relaxed"
                    />
                  </div>

                  <p className="md:hidden text-lg text-muted-foreground leading-relaxed">
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

                  <div className="hidden md:block">
                    <SwapText
                      initialText="To become the launchpad for the next generation"
                      finalText="To become the launchpad for the next generation of animators, motion designers, and visual storytellers — building a creative ecosystem where students collaborate, innovate, and inspire the world through motion."
                      className="min-h-[120px] transition-all duration-200 group-hover:mb-0"
                      initialTextClassName="text-lg text-muted-foreground leading-relaxed"
                      finalTextClassName="text-lg text-muted-foreground leading-relaxed"
                    />
                  </div>

                  <p className="md:hidden text-lg text-muted-foreground leading-relaxed">
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

      {/* Process Section */}
      <section ref={containerRef} className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to completion, here&apos;s how we bring animations to life.
            </p>
          </motion.div>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
              <motion.div className="w-full bg-gradient-to-b from-primary to-secondary" style={{ height: lineHeight }} />
            </div>

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center`}>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <step.icon className="text-background" size={24} />
                    </motion.div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Tilted Cover Cards */}
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

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {differentiators.map((item, index) => {
              const tiltLeft = index % 2 === 0;
              const factor = tiltLeft ? 1 : -1;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <div className="flex h-96 w-80 items-center justify-center overflow-hidden">
                    <div className="group relative h-80 w-64">
                      {/* Background content with info */}
                      <div
                        className="pointer-events-none relative h-full w-full overflow-hidden rounded-xl border border-border/30 glass transition-all duration-500 ease-out group-hover:!transform-none"
                        style={{
                          transform: `perspective(400px) rotateY(${factor * 20}deg) scale(0.85) translateX(${-factor * 20}%)`,
                        }}
                      >
                        <div className="p-8 h-full flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                            <item.icon className="w-7 h-7 text-foreground" />
                          </div>
                          <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                          <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                        <div className="absolute inset-0 h-full w-full bg-muted/10 transition-all group-hover:bg-transparent" />
                      </div>

                      {/* Cover with icon */}
                      <div
                        className={`pointer-events-none absolute inset-0 h-full w-full rounded-xl border-4 border-border/50 bg-gradient-to-br ${item.gradient} transition-all delay-75 duration-500 ease-out group-hover:!transform-none group-hover:opacity-0 ${tiltLeft ? 'group-hover:left-[200%]' : 'group-hover:-left-[200%]'
                          }`}
                        style={{
                          transform: `perspective(400px) rotateY(${factor * 20}deg)`,
                        }}
                      >
                        <div className="h-full w-full rounded-md flex items-center justify-center">
                          <item.icon className="w-24 h-24 text-white/90" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;