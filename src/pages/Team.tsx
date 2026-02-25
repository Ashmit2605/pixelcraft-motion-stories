import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Dr. Faculty Member 1',
    role: 'Faculty Advisor',
    category: 'faculty',
    bio: 'Experienced educator guiding students in animation and digital media with industry expertise.',
    image: 'https://www.pccoer.com/computer/images/Teach/vaishali-latke.png',
  },
  {
    name: 'Prof. Faculty Member 2',
    role: 'Faculty Mentor',
    category: 'faculty',
    bio: 'Passionate about nurturing creative talent and fostering innovation in visual storytelling.',
    image: 'https://www.pccoer.com/computer/images/Teach/mrs-madhavi-milind-kapre.jpg',
  },
  {
    name: 'Dr. Faculty Member 3',
    role: 'Faculty Coordinator',
    category: 'faculty',
    bio: 'Dedicated to bridging academic knowledge with practical animation industry applications.',
    image: 'https://www.pccoer.com/computer/images/Teach/yogeshwari-vinod-mahajan.jpg',
  },
  {
    name: 'Ashmit Ostawal',
    role: 'President',
    category: 'core',
    bio: 'Motion designer with a passion for storytelling. Led 3 award-winning student films.',
    image: 'https://drive.google.com/thumbnail?id=1QCQ9XEiGP8qDqq0PSCUhrHSMVJh8ybG7&sz=w1000',
  },
  {
    name: 'Imran Patel',
    role: 'Vice President',
    category: 'core',
    bio: '3D artist specializing in character animation. Pixar internship alumna.',
    image: 'https://drive.google.com/thumbnail?id=1LcUjBWqxJUxQtdqyhxjzhRg3CkLmp-3w&sz=w1000',
  },
  {
    name: 'Aniruddha Nalawade',
    role: 'Web Head',
    category: 'Heads',
    bio: 'VFX enthusiast and visual storyteller. Brings big-screen magic to student projects.',
    image: 'https://drive.google.com/thumbnail?id=1ipRuJUUkp-fU-SJrKUHkTXs1QRDbO5ew&sz=w1000',
  },
  {
    name: 'Sharvari Kinge',
    role: 'Events Head',
    category: 'Heads',
    bio: 'Organizer extraordinaire with a love for 2D animation. Runs our legendary workshops.',
    image: "https://drive.google.com/thumbnail?id=1kZMG531c8BTDlQ8obWKUhDor1OZyu8yY&sz=w1000",
  }, {
    name: 'Atharv Lokhande',
    role: 'Media Head',
    category: 'Heads',
    bio: 'After Effects wizard. Turns boring presentations into visual experiences.',
    image: 'https://drive.google.com/thumbnail?id=14kcFyXRxn28jMxGY1G7VrWi34prHRwHP&sz=w1000',
  },
  {
    name: 'Siddhi Patil',
    role: 'Technical Head',
    category: 'Heads',
    bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
    image: 'https://drive.google.com/thumbnail?id=1tYyD5kbpNVXXUujqrSacn_DqT1YI7HYR&sz=w1000',
  },
  {
    name: 'Soham Katore',
    role: 'Executive Head',
    category: 'Heads',
    bio: 'Pipeline wizard and render farm keeper. Makes sure nothing crashes (usually).',
    image: 'https://drive.google.com/thumbnail?id=1-4P4Iux4jNVLn1COyUKVVUeXuk2-DARd&sz=w1000',
  },
  {
    name: 'Ajay Pawar',
    role: 'Marketing Head',
    category: 'Heads',
    bio: 'Pipeline wizard and render farm keeper. Makes sure nothing crashes (usually).',
    image: 'https://drive.google.com/thumbnail?id=156pKooqdUUrs_OXPsoJAJMmvT31_UNyg&sz=w1000',
  },

  {
    name: 'Kanchan Garad',
    role: 'Design Head',
    category: 'Heads',
    bio: 'Building bridges between creatives. The glue that holds PixelCraft together.',
    image: 'https://drive.google.com/thumbnail?id=1tXi2bzNvhPg06ZGJaQvhKOPvN_nwFao4&sz=w1000',
  },
  {
    name: 'Vishal Wankhade',
    role: 'Digital Head',
    category: 'Heads',
    bio: 'Traditional animator at heart. Frame by frame, story by story.',
    image: 'https://drive.google.com/thumbnail?id=1DYSccaTLq8Hd5k8D5s1pyIdKm2qQrVep&sz=w1000',
  },

  // {
  //   id: 1,
  //   name: "Suraj Kadam",
  //   role: "Editorial Head",
  //   category: "Heads",
  //   bio: "Storytelling expert. Crafts narratives that captivate and inspire audiences.",
  //   image: "https://drive.google.com/thumbnail?id=10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ&sz=w1000"
  // },

  {
    name: 'Kushal Mahajan',
    role: 'Design Co-Head',
    category: 'Heads',
    bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
    image: 'https://drive.google.com/thumbnail?id=147ubdKp7vFfwkR5WBbonGAcHjI7y1yuB&sz=w1000',

  },
  // {
  //   name: 'Gauri Wankhede',
  //   role: 'Executive Co-Head',
  //   category: 'Heads',
  //   bio: 'Tech-savvy problem solver. Keeps our tools and workflows running smoothly.',
  //   image: 'https://drive.google.com/thumbnail?id=10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ&sz=w1000',
  // },
  // {
  //   name: 'Soham Shejwal',
  //   role: 'Member',
  //   category: 'design',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ&sz=w1000',
  // },
  //  {
  //     name: 'Vrindda Gaikwad',
  //     role: 'Member',
  //     category: 'design',
  //     bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //     image: 'https://drive.google.com/thumbnail?id=10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ&sz=w1000',
  //   },  
  {
    name: 'Dikeshwar Manghate',
    role: 'Member',
    category: 'design',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=10Sihqa4i_nskP7awmScN1Uaq2jhcl7RZ&sz=w1000',
  },
  {
    name: 'Soham Pachpute',
    role: 'Member',
    category: 'web',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=1tfS6ANa1zUAdhuXD15nqaQSmt0Hxpodk&sz=w800',
  },
  // {
  //   name: 'Sushant Gore',
  //   role: 'Member',
  //   category: 'web',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Chaitnya Phuge',
  //   role: 'Member',
  //   category: 'web',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Shravani Kaulapure',
  //   role: 'Member',
  //   category: 'event',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=1VI3Tkez-X647YiwcM4gsKsrVE6BfaRVL&sz=w1000',
  // },
  // {
  //   name: 'Shravani Joshi',
  //   role: 'Member',
  //   category: 'event',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Mohit Patil',
  //   role: 'Member',
  //   category: 'event',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Abhyudya Waghmare',
  //   role: 'Member',
  //   category: 'executive',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  {
    name: 'Rohit Chaudhari',
    role: 'Member',
    category: 'executive',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=1LFLHmXsK1oX6AE22efUB4lYemmxJC2WK&sz=w1000',
  },
  // {
  //   name: 'Anushka Barde',
  //   role: 'Member',
  //   category: 'marketing',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Hemant Singh Rajput',
  //   role: 'Member',
  //   category: 'marketing',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Shruti Hingane',
  //   role: 'Member',
  //   category: 'marketing',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  {
    name: 'Prithvi Bandgujar',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=1MczVVd3y1SLWCHpkIaDAi5rc8yuln6zl&sz=w1000',
  },
  {
    name: 'Unmesh Patil',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=17PBv-b43JL0m78-1dgW0iMiWrGIUNbrm&sz=w1000',
  }, {
    name: 'Raviraj Pawar',
    role: 'Member',
    category: 'technical',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  },
  // {
  //   name: 'Kripsy Yadav ',
  //   role: 'Member',
  //   category: 'digital',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Yash Bhandari',
  //   role: 'Member',
  //   category: 'digital',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',

  // },
  {
    name: 'Aadi Kulkarni',
    role: 'Member',
    category: 'digital',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=1SF7Rj3Dmzl-SfYpr8do-ggW9_gym4tel&sz=w1000',
  },
  // {
  //   name: 'Sakshi Kulkarni',
  //   role: 'Member',
  //   category: 'digital',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=1SF7Rj3Dmzl-SfYpr8do-ggW9_gym4tel&sz=w1000',
  // },
  // {
  //   name: 'Amar Kolawale',
  //   role: 'Member',
  //   category: 'editorial',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Om Khatri',
  //   role: 'Member',
  //   category: 'editorial',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Swaraj Idhole',
  //   role: 'Member',
  //   category: 'editorial',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  // {
  //   name: 'Athrav Patil',
  //   role: 'Member',
  //   category: 'media',
  //   bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
  //   image: 'https://drive.google.com/thumbnail?id=19P8oKZ4fQ5Oy-z7XO71s1lH2Qhpxlvvk&sz=w1000',
  // },
  {
    name: 'Apurv Patil',
    role: 'Member',
    category: 'media',
    bio: 'Storytelling expert. Crafts narratives that captivate and inspire audiences.',
    image: 'https://drive.google.com/thumbnail?id=12Wu_sY87_WKz-0T_X9JL5Gae9MkT9fjd&sz=w1000',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'faculty', label: 'Faculty' },
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

                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />

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