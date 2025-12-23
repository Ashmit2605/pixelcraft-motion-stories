import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Animation Workshop: Character Design',
    date: 'January 15, 2024',
    time: '4:00 PM - 6:00 PM',
    location: 'Design Studio, Room 302',
    description: 'Learn the fundamentals of character design for animation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    upcoming: true,
  },
  {
    id: 2,
    title: 'Motion Graphics Masterclass',
    date: 'January 22, 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Media Lab',
    description: 'Advanced techniques in After Effects and motion design.',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=400&fit=crop',
    upcoming: true,
  },
  {
    id: 3,
    title: '3D Animation Bootcamp',
    date: 'December 10, 2023',
    time: '2:00 PM - 6:00 PM',
    location: 'Animation Lab',
    description: 'Intensive 3D animation training with Blender.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop',
    upcoming: false,
  },
  {
    id: 4,
    title: 'VFX Breakdown Session',
    date: 'November 28, 2023',
    time: '5:00 PM - 7:00 PM',
    location: 'Auditorium',
    description: 'Behind the scenes of professional VFX work.',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop',
    upcoming: false,
  },
];

const Events = () => {
  const upcomingEvents = events.filter(e => e.upcoming);
  const pastEvents = events.filter(e => !e.upcoming);

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
              Our <span className="text-gradient">Events</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-16">
              Workshops, masterclasses, and creative sessions to level up your animation skills.
            </p>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              Upcoming
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        Upcoming
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past Events */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-3xl font-bold mb-8 text-muted-foreground">
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-border/30">
                    <div className="relative aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
