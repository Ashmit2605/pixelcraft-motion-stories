import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvent = {
  title: 'Animation Workshop: Character Design',
  date: 'January 15, 2024',
  time: '4:00 PM - 6:00 PM',
  location: 'Design Studio, Room 302',
  poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
};

const pastEvents = [
  { id: 1, image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=200&h=150&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&h=150&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=200&h=150&fit=crop' },
];

export const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Upcoming <span className="text-gradient">Events</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured Event Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <div className="glass rounded-3xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={upcomingEvent.poster}
                  alt={upcomingEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{upcomingEvent.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {upcomingEvent.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {upcomingEvent.time} • {upcomingEvent.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Past Events & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Past Events
              </h3>
              <div className="flex gap-4">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-xl w-24 h-24 cursor-pointer"
                  >
                    <img
                      src={event.image}
                      alt="Past event"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/40 hover:bg-transparent transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <Button variant="hero-outline" size="lg" className="group" asChild>
              <Link to="/events">
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
