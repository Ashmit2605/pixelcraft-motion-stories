import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef, ReactNode } from 'react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Animation Workshop: Character Design',
    date: 'January 15, 2026',
    time: '4:00 PM - 6:00 PM',
    location: 'Design Studio, Room 302',
    description: 'Learn the fundamentals of character design for animation. From concept sketches to final designs, master the art of creating memorable characters.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    featured: true,
    targetDate: new Date('2026-01-15T16:00:00'),
  },
  {
    id: 2,
    title: 'Motion Graphics Masterclass',
    date: 'January 22, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Media Lab',
    description: 'Advanced techniques in After Effects and motion design. Perfect for those ready to level up their motion graphics game.',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=500&fit=crop',
    featured: false,
    targetDate: new Date('2025-01-22T15:00:00'),
  },
  {
    id: 3,
    title: '3D Modeling Basics',
    date: 'February 5, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Animation Lab',
    description: 'Start your 3D journey with Blender. Learn modeling fundamentals that will set you up for success.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop',
    featured: false,
    targetDate: new Date('2025-02-05T14:00:00'),
  },
];

const pastEvents = [
  {
    id: 4,
    title: 'Inauguration Day',
    date: 'September 3, 2025',
    image: './Inauguration.jpg',
    attendees: 38,
  },
  {
    id: 5,
    title: 'The Art of Motion Design',
    date: 'February 5-6, 2026',
    image: './Workshop.jpg',
    attendees: 35,
  }
];


// Cool Mode Component
interface BaseParticle {
  element: HTMLElement | SVGSVGElement
  left: number
  size: number
  top: number
}

interface CoolParticle extends BaseParticle {
  direction: number
  speedHorz: number
  speedUp: number
  spinSpeed: number
  spinVal: number
}

interface CoolParticleOptions {
  particle?: string
  size?: number
  particleCount?: number
  speedHorz?: number
  speedUp?: number
}

const getContainer = () => {
  const id = "_coolMode_effect"
  const existingContainer = document.getElementById(id)

  if (existingContainer) {
    return existingContainer
  }

  const container = document.createElement("div")
  container.setAttribute("id", id)
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647"
  )

  document.body.appendChild(container)

  return container
}

let instanceCounter = 0

const applyParticleEffect = (
  element: HTMLElement,
  options?: CoolParticleOptions
): (() => void) => {
  instanceCounter++

  const defaultParticle = "circle"
  const particleType = options?.particle || defaultParticle
  const sizes = [15, 20, 25, 35, 45]
  const limit = 45

  let particles: CoolParticle[] = []
  let autoAddParticle = false
  let mouseX = 0
  let mouseY = 0

  const container = getContainer()

  function generateParticle() {
    const size =
      options?.size || sizes[Math.floor(Math.random() * sizes.length)]
    const speedHorz = options?.speedHorz || Math.random() * 10
    const speedUp = options?.speedUp || Math.random() * 25
    const spinVal = Math.random() * 360
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1)
    const top = mouseY - size / 2
    const left = mouseX - size / 2
    const direction = Math.random() <= 0.5 ? -1 : 1

    const particle = document.createElement("div")

    if (particleType === "circle") {
      const svgNS = "http://www.w3.org/2000/svg"
      const circleSVG = document.createElementNS(svgNS, "svg")
      const circle = document.createElementNS(svgNS, "circle")
      circle.setAttributeNS(null, "cx", (size / 2).toString())
      circle.setAttributeNS(null, "cy", (size / 2).toString())
      circle.setAttributeNS(null, "r", (size / 2).toString())
      circle.setAttributeNS(
        null,
        "fill",
        `hsl(${Math.random() * 360}, 70%, 50%)`
      )

      circleSVG.appendChild(circle)
      circleSVG.setAttribute("width", size.toString())
      circleSVG.setAttribute("height", size.toString())

      particle.appendChild(circleSVG)
    } else if (
      particleType.startsWith("http") ||
      particleType.startsWith("/")
    ) {
      particle.innerHTML = `<img src="${particleType}" width="${size}" height="${size}" style="border-radius: 50%">`
    } else {
      const fontSizeMultiplier = 3
      const emojiSize = size * fontSizeMultiplier
      particle.innerHTML = `<div style="font-size: ${emojiSize}px; line-height: 1; text-align: center; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; transform: scale(${fontSizeMultiplier}); transform-origin: center;">${particleType}</div>`
    }

    particle.style.position = "absolute"
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`

    container.appendChild(particle)

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    })
  }

  function refreshParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction
      p.top = p.top - p.speedUp
      p.speedUp = Math.min(p.size, p.speedUp - 1)
      p.spinVal = p.spinVal + p.spinSpeed

      if (
        p.top >=
        Math.max(window.innerHeight, document.body.clientHeight) + p.size
      ) {
        particles = particles.filter((o) => o !== p)
        p.element.remove()
      }

      p.element.setAttribute(
        "style",
        [
          "position:absolute",
          "will-change:transform",
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
        ].join(";")
      )
    })
  }

  let animationFrame: number | undefined

  let lastParticleTimestamp = 0
  const particleGenerationDelay = 30

  function loop() {
    const currentTime = performance.now()
    if (
      autoAddParticle &&
      particles.length < limit &&
      currentTime - lastParticleTimestamp > particleGenerationDelay
    ) {
      generateParticle()
      lastParticleTimestamp = currentTime
    }

    refreshParticles()
    animationFrame = requestAnimationFrame(loop)
  }

  loop()

  const isTouchInteraction = "ontouchstart" in window

  const tap = isTouchInteraction ? "touchstart" : "mousedown"
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup"
  const move = isTouchInteraction ? "touchmove" : "mousemove"

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      mouseX = e.touches?.[0].clientX
      mouseY = e.touches?.[0].clientY
    } else {
      mouseX = e.clientX
      mouseY = e.clientY
    }
  }
  const pomPomSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
  // Or use your own sound file URL
  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e)
    autoAddParticle = true
    pomPomSound.currentTime = 0;
    pomPomSound.play().catch(() => { });
  }

  const disableAutoAddParticle = () => {
    autoAddParticle = false
  }

  element.addEventListener(move, updateMousePosition, { passive: true })
  element.addEventListener(tap, tapHandler, { passive: true })
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true })
  element.addEventListener("mouseleave", disableAutoAddParticle, {
    passive: true,
  })

  return () => {
    element.removeEventListener(move, updateMousePosition)
    element.removeEventListener(tap, tapHandler)
    element.removeEventListener(tapEnd, disableAutoAddParticle)
    element.removeEventListener("mouseleave", disableAutoAddParticle)

    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame)
        clearInterval(interval)

        if (--instanceCounter === 0) {
          container.remove()
        }
      }
    }, 500)
  }
}

interface CoolModeProps {
  children: ReactNode
  options?: CoolParticleOptions
}

const CoolMode: React.FC<CoolModeProps> = ({ children, options }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      return applyParticleEffect(ref.current, options)
    }
  }, [options])

  return <span ref={ref}>{children}</span>
}

const LiveClock = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4">
      {Object.entries(time).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-muted/50 border border-primary/30 flex items-center justify-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.span
              key={value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-display text-2xl md:text-3xl font-bold text-primary"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </motion.div>
          <span className="text-xs text-muted-foreground mt-2 block capitalize">{unit}</span>
        </div>
      ))}
    </div>
  );
};

const Events = () => {
  const featuredEvent = upcomingEvents.find(e => e.featured);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section with Featured Event */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
        {/* Background image with overlay */}
        {featuredEvent && (
          <>
            <div className="absolute inset-0">
              <img
                src={featuredEvent.image}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
            </div>

            {/* Animated glow effect */}
            <motion.div
              className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.15) 0%, transparent 70%)' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >

          </motion.div>

          {featuredEvent && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Next Workshop
                  </span>

                  <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
                    {featuredEvent.title}
                  </h1>

                  <p className="text-lg text-muted-foreground mb-8">
                    {featuredEvent.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>

                  <div className="flex">
                    <CoolMode options={{ particle: "✨", particleCount: 40, speedHorz: 8, speedUp: 20 }}>
                      <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/50 bg-background px-8 py-4 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5">
                        Are you excited? 🎉
                      </button>
                    </CoolMode>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Current Time</h3>
                <LiveClock />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-32 relative bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-muted-foreground">
              Past Events
            </h2>
            <p className="text-muted-foreground mt-2">Moments that shaped our community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                      <span className="text-xs text-primary font-medium">{event.attendees} attended</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;