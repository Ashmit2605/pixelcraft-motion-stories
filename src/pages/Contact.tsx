import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MapPin, Send, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-500' },
  { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-400' },
  { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-500' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-500' },
];

const FloatingInput = ({ 
  id, 
  label, 
  type = 'text',
  ...props 
}: { 
  id: string; 
  label: string; 
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all duration-300 text-foreground"
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
        {...props}
      />
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || hasValue 
            ? 'top-2 text-xs text-primary' 
            : 'top-1/2 -translate-y-1/2 text-muted-foreground'
        }`}
      >
        {label}
      </label>
      {/* Focus glow */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ 
          boxShadow: focused ? '0 0 25px hsl(25 100% 55% / 0.2), inset 0 0 0 1px hsl(25 100% 55% / 0.3)' : 'none' 
        }}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const FloatingTextarea = ({ 
  id, 
  label,
  rows = 5,
}: { 
  id: string; 
  label: string;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <textarea
        id={id}
        rows={rows}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all duration-300 text-foreground resize-none"
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
      />
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || hasValue 
            ? 'top-2 text-xs text-primary' 
            : 'top-6 text-muted-foreground'
        }`}
      >
        {label}
      </label>
      {/* Focus glow */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ 
          boxShadow: focused ? '0 0 25px hsl(25 100% 55% / 0.2), inset 0 0 0 1px hsl(25 100% 55% / 0.3)' : 'none' 
        }}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.5) 0%, transparent 60%)' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 60%)' }}
            animate={{
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.h1 
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions? Want to collaborate? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Contact Info - Left Side */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Email Card */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-500 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@pixelcraft.club</p>
                    <p className="text-muted-foreground text-sm mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-border/30 hover:border-secondary/50 transition-all duration-500 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">Design Building, Room 401</p>
                    <p className="text-muted-foreground text-sm mt-1">University Campus</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass rounded-3xl p-8 md:p-10 border border-border/30">
                <h2 className="font-display text-2xl font-bold mb-8">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="name" label="Your Name" />
                    <FloatingInput id="email" label="Email Address" type="email" />
                  </div>
                  
                  <FloatingInput id="subject" label="Subject" />
                  
                  <FloatingTextarea id="message" label="Your Message" rows={6} />

                  <motion.div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Button 
                      variant="hero" 
                      size="xl" 
                      className="w-full relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      {/* Wave animation on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: isHovering ? '100%' : '-100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;