import { useState, useRef, useEffect, useMemo, createRef, forwardRef, useCallback, useImperativeHandle } from "react";
import { motion, useAnimation } from "framer-motion";
import { Zap, Shield, Clock, Award, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Utility functions
function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function useMousePosition(
  ref: React.RefObject<HTMLElement>,
  callback?: ({ x, y }: { x: number; y: number }) => void,
) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      callback?.({ x: clientX - left, y: clientY - top });
    };
    const handleTouchMove = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      callback?.({ x: clientX - left, y: clientY - top });
    };
    ref.current?.addEventListener("mousemove", handleMouseMove);
    ref.current?.addEventListener("touchmove", handleTouchMove);
    const nodeRef = ref.current;
    return () => {
      nodeRef?.removeEventListener("mousemove", handleMouseMove);
      nodeRef?.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref, callback]);
}

interface Benefit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  x: number;
  y: number;
  mobileX?: number;
  mobileY?: number;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Hands-On",
    subtitle: "Real Experience",
    description:
      "Work on real projects, events, and ideas that go beyond classrooms and theory.",
    icon: Zap,
    x: 15,
    y: 25,
    mobileX: 50,
    mobileY: 10,
  },
  {
    id: 2,
    title: "Skill-Driven",
    subtitle: "Learning",
    description:
      "Sharpen practical skills through workshops, challenges, and peer collaboration.",
    icon: Shield,
    x: 15,
    y: 75,
    mobileX: 50,
    mobileY: 30,
  },
  {
    id: 3,
    title: "Always Connected",
    subtitle: "Community",
    description:
      "Be part of a supportive circle that grows, builds, and learns together.",
    icon: Clock,
    x: 50,
    y: 50,
    mobileX: 50,
    mobileY: 50,
  },
  {
    id: 4,
    title: "Recognition",
    subtitle: "Opportunities",
    description:
      "Get recognized through showcases, competitions, certifications, and leadership roles.",
    icon: Award,
    x: 85,
    y: 25,
    mobileX: 50,
    mobileY: 70,
  },
  {
    id: 5,
    title: "Creative",
    subtitle: "Innovation",
    description:
      "Experiment freely, explore new ideas, and turn creativity into impact.",
    icon: Sparkles,
    x: 85,
    y: 75,
    mobileX: 50,
    mobileY: 90,
  },
];

interface Particle {
  id: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  startAngle: number;
  size: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
}

interface OrbitingParticlesProps {
  centerX: number;
  centerY: number;
  benefitPositions: { x: number; y: number }[];
  isMobile: boolean;
}

const OrbitingParticles = ({ centerX, centerY, benefitPositions, isMobile }: OrbitingParticlesProps) => {
  const particles: Particle[] = useMemo(() => {
    const allParticles: Particle[] = [];

    const coreParticleCount = isMobile ? 4 : 8;
    const benefitParticleCount = isMobile ? 1 : 2;
    const wanderingParticleCount = isMobile ? 2 : 6;

    for (let i = 0; i < coreParticleCount; i++) {
      allParticles.push({
        id: i,
        orbitRadiusX: (isMobile ? 30 : 60) + Math.random() * (isMobile ? 40 : 100),
        orbitRadiusY: (isMobile ? 25 : 50) + Math.random() * (isMobile ? 35 : 80),
        speed: 28 + Math.random() * 15,
        startAngle: (Math.PI * 2 * i) / coreParticleCount + Math.random() * 0.5,
        size: (isMobile ? 1.5 : 2) + Math.random() * 1.5,
        opacity: isMobile ? 0.15 + Math.random() * 0.2 : 0.2 + Math.random() * 0.3,
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
      });
    }

    benefitPositions.forEach((pos, idx) => {
      const dx = pos.x - centerX;
      const dy = pos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      for (let j = 0; j < benefitParticleCount; j++) {
        allParticles.push({
          id: 100 + idx * 3 + j,
          orbitRadiusX: distance * (0.7 + Math.random() * 0.4),
          orbitRadiusY: distance * (0.3 + Math.random() * 0.3),
          speed: 35 + Math.random() * 25,
          startAngle: Math.random() * Math.PI * 2,
          size: (isMobile ? 1 : 1.5) + Math.random() * 1.5,
          opacity: isMobile ? 0.1 + Math.random() * 0.15 : 0.12 + Math.random() * 0.25,
          offsetX: dx * 0.15,
          offsetY: dy * 0.15,
          rotation: angle,
        });
      }
    });

    for (let i = 0; i < wanderingParticleCount; i++) {
      allParticles.push({
        id: 200 + i,
        orbitRadiusX: (isMobile ? 60 : 120) + Math.random() * (isMobile ? 80 : 200),
        orbitRadiusY: (isMobile ? 40 : 80) + Math.random() * (isMobile ? 60 : 120),
        speed: 40 + Math.random() * 30,
        startAngle: Math.random() * Math.PI * 2,
        size: (isMobile ? 1 : 1.5) + Math.random() * 2,
        opacity: isMobile ? 0.08 + Math.random() * 0.12 : 0.1 + Math.random() * 0.2,
        offsetX: (Math.random() - 0.5) * (isMobile ? 40 : 100),
        offsetY: (Math.random() - 0.5) * (isMobile ? 30 : 80),
        rotation: (Math.random() - 0.5) * Math.PI * 0.6,
      });
    }

    return allParticles;
  }, [centerX, centerY, benefitPositions, isMobile]);

  return (
    <g>
      <defs>
        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {particles.map((particle) => (
        <OrbitingParticle
          key={particle.id}
          particle={particle}
          centerX={centerX}
          centerY={centerY}
        />
      ))}
    </g>
  );
};

const OrbitingParticle = ({
  particle,
  centerX,
  centerY,
}: {
  particle: Particle;
  centerX: number;
  centerY: number;
}) => {
  const [angle, setAngle] = useState(particle.startAngle);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setAngle((prev) => prev + (deltaTime * Math.PI * 2) / particle.speed);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [particle.speed]);

  const localX = Math.cos(angle) * particle.orbitRadiusX;
  const localY = Math.sin(angle) * particle.orbitRadiusY;

  const rotatedX = localX * Math.cos(particle.rotation) - localY * Math.sin(particle.rotation);
  const rotatedY = localX * Math.sin(particle.rotation) + localY * Math.cos(particle.rotation);

  const x = centerX + particle.offsetX + rotatedX;
  const y = centerY + particle.offsetY + rotatedY;

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={particle.size}
      fill="hsl(25 100% 55%)"
      opacity={particle.opacity}
      filter="url(#particleGlow)"
      initial={{ opacity: 0 }}
      animate={{ opacity: particle.opacity }}
      transition={{ duration: 2, delay: particle.id * 0.15 }}
    />
  );
};

// Mouse trail effect components
interface AnimatedImageRef {
  show: ({
    x,
    y,
    newX,
    newY,
    zIndex,
  }: {
    x: number;
    y: number;
    zIndex: number;
    newX: number;
    newY: number;
  }) => void;
  isActive: () => boolean;
}

const AnimatedTrailElement = forwardRef<AnimatedImageRef, { color: string }>(({ color }, ref) => {
  const controls = useAnimation();
  const isRunning = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    isActive: () => isRunning.current,
    show: async ({
      x,
      y,
      newX,
      newY,
      zIndex,
    }: {
      x: number;
      y: number;
      zIndex: number;
      newX: number;
      newY: number;
    }) => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const center = (posX: number, posY: number) => {
        const coords = {
          x: posX - rect.width / 2,
          y: posY - rect.height / 2,
        };
        return `translate(${coords.x}px, ${coords.y}px)`;
      };

      controls.stop();

      controls.set({
        opacity: isRunning.current ? 1 : 0.75,
        zIndex,
        transform: `${center(x, y)} scale(1)`,
        transition: { ease: "circOut" },
      });

      isRunning.current = true;

      await controls.start({
        opacity: 1,
        transform: `${center(newX, newY)} scale(1)`,
        transition: { duration: 0.9, ease: "circOut" },
      });

      await Promise.all([
        controls.start({
          transition: { duration: 1, ease: "easeInOut" },
          transform: `${center(newX, newY)} scale(0.1)`,
        }),
        controls.start({
          opacity: 0,
          transition: { duration: 1.1, ease: "easeOut" },
        }),
      ]);

      isRunning.current = false;
    },
  }));

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, scale: 1 }}
      animate={controls}
      className="absolute w-16 h-16 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(8px)',
      }}
    />
  );
});

AnimatedTrailElement.displayName = "AnimatedTrailElement";

const trailColors = [
  "rgba(249, 115, 22, 0.6)",
  "rgba(251, 146, 60, 0.5)",
  "rgba(234, 88, 12, 0.6)",
  "rgba(253, 186, 116, 0.5)",
  "rgba(194, 65, 12, 0.6)",
];

const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Mouse trail setup
  const trailsRef = useRef(
    Array.from({ length: 15 }, createRef<AnimatedImageRef>),
  );

  const lastPosition = useRef({ x: 0, y: 0 });
  const cachedPosition = useRef({ x: 0, y: 0 });
  const trailIndex = useRef(0);
  const zIndex = useRef(1);

  const updateTrail = useCallback((cursor: { x: number; y: number }) => {
    const activeRefCount = trailsRef.current.filter((ref) => ref.current?.isActive()).length;
    if (activeRefCount === 0) {
      zIndex.current = 1;
    }

    const distance = getDistance(
      cursor.x,
      cursor.y,
      lastPosition.current.x,
      lastPosition.current.y,
    );
    const threshold = 50;

    const newCachePosition = {
      x: lerp(cachedPosition.current.x || cursor.x, cursor.x, 0.1),
      y: lerp(cachedPosition.current.y || cursor.y, cursor.y, 0.1),
    };
    cachedPosition.current = newCachePosition;

    if (distance > threshold) {
      trailIndex.current = (trailIndex.current + 1) % trailsRef.current.length;
      zIndex.current = zIndex.current + 1;
      lastPosition.current = cursor;
      trailsRef.current[trailIndex.current].current?.show?.({
        x: newCachePosition.x,
        y: newCachePosition.y,
        zIndex: zIndex.current,
        newX: cursor.x,
        newY: cursor.y,
      });
    }
  }, []);

  useMousePosition(containerRef, updateTrail);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const centerBenefit = benefits.find(b => b.id === 3)!;
  const centerX = ((isMobile ? centerBenefit.mobileX : centerBenefit.x) || centerBenefit.x) / 100 * dimensions.width;
  const centerY = ((isMobile ? centerBenefit.mobileY : centerBenefit.y) || centerBenefit.y) / 100 * dimensions.height;

  const surroundingBenefits = benefits.filter(b => b.id !== 3);
  const benefitPositions = surroundingBenefits.map(b => ({
    x: ((isMobile ? b.mobileX : b.x) || b.x) / 100 * dimensions.width,
    y: ((isMobile ? b.mobileY : b.y) || b.y) / 100 * dimensions.height,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col pb-12 md:pb-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />

      {/* Mouse trail effects */}
      {trailsRef.current.map((ref, index) => (
        <AnimatedTrailElement key={index} ref={ref} color={trailColors[index % trailColors.length]} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 pt-8 md:pt-16 pb-6 md:pb-8 px-4 text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white">
          Discover Our <span className="italic bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Benefits</span>
        </h2>
      </motion.div>

      <div className="relative flex-1 min-h-[900px] md:min-h-[600px] px-4 md:px-0">
        {dimensions.width > 0 && !isMobile && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: 'visible' }}
          >
            <OrbitingParticles
              centerX={centerX}
              centerY={centerY}
              benefitPositions={benefitPositions}
              isMobile={isMobile}
            />
          </svg>
        )}

        {dimensions.width > 0 && isMobile && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
            style={{ overflow: 'visible' }}
          >
            <OrbitingParticles
              centerX={centerX}
              centerY={centerY}
              benefitPositions={benefitPositions}
              isMobile={isMobile}
            />
          </svg>
        )}

        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.id}
            benefit={benefit}
            isMobile={isMobile}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-l border-t border-gray-800" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-r border-b border-gray-800" />
    </section>
  );
};

interface BenefitItemProps {
  benefit: Benefit;
  isMobile: boolean;
}

const BenefitItem = ({ benefit, isMobile }: BenefitItemProps) => {
  const Icon = benefit.icon;
  const xPos = isMobile && benefit.mobileX !== undefined ? benefit.mobileX : benefit.x;
  const yPos = isMobile && benefit.mobileY !== undefined ? benefit.mobileY : benefit.y;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: benefit.id * 0.1 }}
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
        x: "-50%",
        y: "-50%",
      }}
      className={`absolute z-10 text-center px-4 ${isMobile
          ? 'max-w-[300px] sm:max-w-[340px]'
          : 'max-w-[240px]'
        }`}
    >
      {isMobile && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-3xl border border-gray-800 shadow-lg -z-10" />
      )}

      <motion.div className={`flex justify-center ${isMobile ? 'mb-4 pt-2' : 'mb-4'}`}>
        <div className={`flex items-center justify-center ${isMobile ? 'w-14 h-14' : 'w-12 h-12 md:w-12 md:h-12'}`}>
          <Icon
            className={isMobile ? 'w-8 h-8' : 'w-6 h-6 md:w-6 md:h-6'}
            style={{ color: 'hsl(25 100% 55%)' }}
            strokeWidth={1.5}
          />
        </div>
      </motion.div>

      <h3 className={`font-display font-light text-white leading-tight ${isMobile
          ? 'text-2xl sm:text-3xl mb-1'
          : 'text-2xl md:text-3xl'
        }`}>
        {benefit.title}
      </h3>
      <p
        className={`font-display italic bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent ${isMobile
            ? 'text-lg sm:text-xl mb-3'
            : 'text-lg md:text-xl mt-1'
          }`}
      >
        {benefit.subtitle}
      </p>

      {!isMobile && (
        <p className="text-gray-400 text-sm font-body font-light mt-3 leading-relaxed">
          {benefit.description}
        </p>
      )}

      {isMobile && benefit.id !== 5 && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      )}
    </motion.div>
  );
};

export default Benefits;