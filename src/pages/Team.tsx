import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'President',
    bio: 'Motion designer with a passion for storytelling.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Maya Chen',
    role: 'Vice President',
    bio: '3D artist specializing in character animation.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Jordan Lee',
    role: 'Creative Director',
    bio: 'VFX enthusiast and visual storyteller.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Priya Sharma',
    role: 'Events Lead',
    bio: 'Organizer extraordinaire with a love for 2D animation.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Marcus Johnson',
    role: 'Technical Lead',
    bio: 'Pipeline wizard and render farm keeper.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Emma Wilson',
    role: 'Community Manager',
    bio: 'Building bridges between creatives.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  },
];

const Team = () => {
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
              Meet the <span className="text-gradient">Team</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-16">
              The passionate creatives behind PixelCraft, dedicated to making animation accessible to every student.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
