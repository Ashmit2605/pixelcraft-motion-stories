import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Ashmit Ostawal',
    role: 'President',
    category: 'core',
    bio: 'Motion designer with a passion for storytelling. Led 3 award-winning student films.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Imran Patel',
    role: 'Vice President',
    category: 'core',
    bio: '3D artist specializing in character animation. Pixar internship alumna.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Aniruddha Nalawade',
    role: 'Web Head',
    category: 'Heads',
    bio: 'VFX enthusiast and visual storyteller. Brings big-screen magic to student projects.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Sharvari Kinge',
    role: 'Events Head',
    category: 'Heads',
    bio: 'Organizer extraordinaire with a love for 2D animation. Runs our legendary workshops.',
    image: "https://drive.google.com/file/d/1kZMG531c8BTDlQ8obWKUhDor1OZyu8yY/preview",
  },
  {
    name: 'Soham Katore',
    role: 'Executive Head',
    category: 'Heads',
    bio: 'Pipeline wizard and render farm keeper. Makes sure nothing crashes (usually).',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Ajay Pawar',
    role: 'Marketing Head',
    category: 'Heads',
    bio: 'Pipeline wizard and render farm keeper. Makes sure nothing crashes (usually).',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },

  {
    name: 'Kanchan Garad',
    role: 'Design Head',
    category: 'Heads',
    bio: 'Building bridges between creatives. The glue that holds PixelCraft together.',
    image: 'https://drive.google.com/uc?export=view&id=1tXi2bzNvhPg06ZGJaQvhKOPvN_nwFao4',
  },
  {
    name: 'Vishal Wankhade',
    role: 'Digital Head',
    category: 'Heads',
    bio: 'Traditional animator at heart. Frame by frame, story by story.',
    image: 'https://drive.google.com/file/d/1DYSccaTLq8Hd5k8D5s1pyIdKm2qQrVep/view?usp=sharing',
  },
  {
    name: 'Atharv Lokhande',
    role: 'Media Head',
    category: 'Heads',
    bio: 'After Effects wizard. Turns boring presentations into visual experiences.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 1,
    name: "Suraj Kadam",
    role: "Editorial Head",
    category: "Heads",
    bio: "Storytelling expert. Crafts narratives that captivate and inspire audiences.",
    image: "https://drive.google.com/file/d/1FqOW-Qtt8hI_a1Vxkxz0xi5T7M8dDQBL/preview"
  },
  {
    name: 'Siddhi Patil',
    role: 'Technical Head',
    category: 'Heads',
    bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
    image: 'https://drive.google.com/uc?export=view&id=1AbCdEfGhIjKlMn',
  },
  {
    name: 'Kushal Mahajan',
    role: 'Design Co-Head',
    category: 'Heads',
    bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
    image: 'https://drive.google.com/thumbnail?id=Qtt8hI_a1Vxkxz0xi5T7M8dDQBL&sz=w800',
  },
  {
    name: 'Gauri Wankhede',
    role: 'Executive Co-Head',
    category: 'Heads',
    bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Soham Shejwal',
    role: 'Member',
    category: 'design',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Vrindda Gaikwad',
    role: 'Member',
    category: 'design',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  }, {
    name: 'Dikeshwar Manghate',
    role: 'Member',
    category: 'design',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/file/d/10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ/preview',
  },
  {
    name: 'Soham Pachpute',
    role: 'Member',
    category: 'web',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Akash Gore',
    role: 'Member',
    category: 'web',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Chaitnya Phuge',
    role: 'Member',
    category: 'web',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Shravani Kaulapure',
    role: 'Member',
    category: 'event',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Shravani Joshi',
    role: 'Member',
    category: 'event',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Mohit Patil',
    role: 'Member',
    category: 'event',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Abhyudya Waghmare',
    role: 'Member',
    category: 'executive',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Rohit Chaudhari',
    role: 'Member',
    category: 'executive',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Anushka Barde',
    role: 'Member',
    category: 'marketing',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Hemant Singh Rajput',
    role: 'Member',
    category: 'marketing',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Shruti Hingane',
    role: 'Member',
    category: 'marketing',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Prithvi Bandgujar',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Unmesh Patil',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  }, {
    name: 'Raviraj Pawar',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Kripsy Yadav ',
    role: 'Member',
    category: 'digital',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Yash Bhandari',
    role: 'Member',
    category: 'digital',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Aadi Kulkarni',
    role: 'Member',
    category: 'digital',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Amar Kolawale',
    role: 'Member',
    category: 'editorial',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Om Khatri',
    role: 'Member',
    category: 'editorial',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Swaraj Idhole',
    role: 'Member',
    category: 'editorial',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Athrav Patil',
    role: 'Member',
    category: 'media',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Apurv Patil',
    role: 'Member',
    category: 'media',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
  },


];

const categories = [
  { id: 'core', label: 'Core Team' },
  { id: 'Heads', label: 'Domain Heads' },
  { id: 'design', label: 'Design' },
  { id: 'web', label: 'Web' },
  { id: 'event', label: 'Event' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'digital', label: 'Digital' },
  { id: 'media', label: 'Media' },
  { id: 'technical', label: 'Technical' },
  { id: 'executive', label: 'Executive' },
  { id: 'marketing', label: 'Marketing' },
];

const Team = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMembers = activeCategory === 'all'
    ? teamMembers
    : teamMembers.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(280 100% 65% / 0.5) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 70%)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the <span className="text-gradient">Creators</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The passionate minds behind PixelCraft, dedicated to making animation accessible to every student.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'glass border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Grid with Flipping Cards */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group h-[420px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative h-full w-full transition-all duration-500 ease-linear"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(0deg)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateY(180deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateY(0deg)';
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute w-full h-full glass rounded-2xl overflow-hidden border border-border/30"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative h-full">
                      {member.image.includes("drive.google.com") ? (
                        <iframe
                          src={member.image}
                          title={member.name}
                          className="w-full h-full"
                          allow="autoplay"
                        />
                      ) : (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                        <h3 className="font-display text-2xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary font-medium">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden border border-border/30"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: `linear-gradient(135deg, hsl(${index * 36}, 70%, 50%), hsl(${(index * 36 + 60) % 360}, 70%, 40%))`
                    }}
                  >
                    <div className="flex flex-col justify-center h-full p-6 text-white">
                      <div>
                        <h3 className="font-display text-2xl font-bold mb-2">
                          {member.name}
                        </h3>
                        <p className="text-white/90 font-medium mb-4">
                          {member.role}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;