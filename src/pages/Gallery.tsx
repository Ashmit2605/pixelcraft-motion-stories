import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useMemo, useEffect, useCallback, useRef } from "react";

// Types
type Category = "all" | "events" | "workshops" | "behind-the-scenes" | "awards";
type ImageEffect = "stack" | "disclose" | "skew" | "normal";
type MediaType = "image" | "video";

interface GalleryItem {
    id: string;
    src: string;
    title: string;
    location: string;
    year: string;
    category: Category;
    size: "small" | "medium" | "large" | "tall" | "wide";
    effect: ImageEffect;
    angle?: string;
    type: MediaType;
    thumbnail?: string;
}

const randomAngles = ["-12deg", "-8deg", "-5deg", "0deg", "5deg", "8deg", "12deg", "-3deg", "3deg", "-10deg", "10deg"];
const getRandomAngle = () => randomAngles[Math.floor(Math.random() * randomAngles.length)];

const assignEffects = (items: Omit<GalleryItem, "effect" | "angle">[]): GalleryItem[] => {
    const effects: ImageEffect[] = ["stack", "disclose", "skew", "normal"];
    return items.map((item) => ({
        ...item,
        effect: effects[Math.floor(Math.random() * effects.length)],
        angle: getRandomAngle(),
    }));
};

const baseGalleryItems: Omit<GalleryItem, "effect" | "angle">[] = [
    {
        id: "1",
        src: "https://drive.google.com/thumbnail?id=1a8ImP8OfEj64lgbVUJMr2lew8BI0Kprv&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=1a8ImP8OfEj64lgbVUJMr2lew8BI0Kprv&sz=w400",
        title: "Studio Session",
        location: "New York City",
        year: "2024",
        category: "events",
        size: "large",
        type: "image",
    },
    {
        id: "2",
        src: "https://drive.google.com/file/d/15ib80NfBGELZnDlW3FEbBrzV-NcXjfSM/preview",
        thumbnail: "https://drive.google.com/thumbnail?id=15ib80NfBGELZnDlW3FEbBrzV-NcXjfSM&sz=w400",
        title: "Behind the Lens",
        location: "Los Angeles",
        year: "2024",
        category: "workshops",
        size: "large",
        type: "video",
    },
    {
        id: "3",
       src: "https://drive.google.com/thumbnail?id=12foUKiunbYCL-1V1Q49TDzdP2moZOL24&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=12foUKiunbYCL-1V1Q49TDzdP2moZOL24&sz=w400",
        title: "Golden Frame Awards",
        location: "London",
        year: "2023",
        category: "awards",
        size: "wide",
        type: "image",
    },
    {
        id: "4",
       src: "https://drive.google.com/thumbnail?id=1mJ8gEK_0rEJ9AywLGcDzQisDr-XCUoOp&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=1mJ8gEK_0rEJ9AywLGcDzQisDr-XCUoOp&sz=w400",
        title: "Fashion Week Prep",
        location: "Paris",
        year: "2024",
        category: "behind-the-scenes",
        size: "medium",
        type: "image",
    },
    {
        id: "5",
        src: "https://drive.google.com/file/d/1qR84cycetZ1l0aYTnghvbbkqVPVJp5j1/preview",
        thumbnail: "https://drive.google.com/thumbnail?id=1qR84cycetZ1l0aYTnghvbbkqVPVJp5j1&sz=w400",
        title: "Creative Process",
        location: "Santorini",
        year: "2023",
        category: "events",
        size: "wide",
        type: "video",
    },
    {
        id: "6",
        src: "https://drive.google.com/thumbnail?id=1NaTqP6xEqY5EeQb_cBTzxDVqiwekgjas&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=1NaTqP6xEqY5EeQb_cBTzxDVqiwekgjas&sz=w400",
        title: "Portrait Series",
        location: "Milan",
        year: "2024",
        category: "events",
        size: "medium",
        type: "image",
    },
    {
        id: "7",
        src: "https://drive.google.com/file/d/15ib80NfBGELZnDlW3FEbBrzV-NcXjfSM/preview",
        thumbnail: "https://drive.google.com/thumbnail?id=15ib80NfBGELZnDlW3FEbBrzV-NcXjfSM&sz=w400",
        title: "Product Photography",
        location: "Tokyo",
        year: "2023",
        category: "workshops",
        size: "large",
        type: "video",
    },
    {
        id: "8",
        src: "https://drive.google.com/thumbnail?id=1WOGxPe1aEMTYFm9Bk2xUxuBamKU2eOSp&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=1WOGxPe1aEMTYFm9Bk2xUxuBamKU2eOSp&sz=w400",
        title: "Film Production",
        location: "Vancouver",
        year: "2024",
        category: "behind-the-scenes",
        size: "large",
        type: "image",
    },
    {
        id: "9",
        src: "https://drive.google.com/thumbnail?id=1yeIpUcHe4Y5xU1RES7JkuAlt5UhZMaTT&sz=w1000",
        thumbnail: "https://drive.google.com/thumbnail?id=1yeIpUcHe4Y5xU1RES7JkuAlt5UhZMaTT&sz=w400",
        title: "Creative Workshop",
        location: "Berlin",
        year: "2024",
        category: "workshops",
        size: "small",
        type: "image",
    },
    {
        id: "10",
        src: "https://drive.google.com/file/d/18KZMrqq0h-QILXMJ8bfQQTkKLE-hT2qG/preview",
        thumbnail: "https://drive.google.com/thumbnail?id=18KZMrqq0h-QILXMJ8bfQQTkKLE-hT2qG&sz=w400",
        title: "Motion Showcase",
        location: "Amsterdam",
        year: "2023",
        category: "events",
        size: "wide",
        type: "video",
    },
    {
        id: "11",
        src: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600&h=900&fit=crop",
        title: "VFX Breakdown",
        location: "Seoul",
        year: "2024",
        category: "behind-the-scenes",
        size: "tall",
        type: "image",
    },
    {
        id: "12",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=600&fit=crop",
        title: "Abstract Motion Art",
        location: "Toronto",
        year: "2023",
        category: "workshops",
        size: "large",
        type: "video",
    },
    {
        id: "13",
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=750&fit=crop",
        title: "3D Rendering Workshop",
        location: "Singapore",
        year: "2024",
        category: "workshops",
        size: "medium",
        type: "image",
    },
    {
        id: "14",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&h=500&fit=crop",
        title: "Digital Animation",
        location: "Dubai",
        year: "2023",
        category: "awards",
        size: "wide",
        type: "video",
    },
    {
        id: "15",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=900&fit=crop",
        title: "Set Design",
        location: "Mumbai",
        year: "2024",
        category: "behind-the-scenes",
        size: "tall",
        type: "image",
    },
    {
        id: "16",
        src: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=600&fit=crop",
        title: "Color Grading Class",
        location: "Barcelona",
        year: "2023",
        category: "workshops",
        size: "small",
        type: "image",
    },
    {
        id: "17",
        src: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=1000&fit=crop",
        title: "Annual Conference",
        location: "San Francisco",
        year: "2024",
        category: "events",
        size: "large",
        type: "image",
    },
    {
        id: "18",
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=750&fit=crop",
        title: "Equipment Setup",
        location: "Sydney",
        year: "2023",
        category: "behind-the-scenes",
        size: "medium",
        type: "image",
    },
];
const galleryItems = assignEffects(baseGalleryItems);

const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Work" },
    { id: "events", label: "Events" },
    { id: "workshops", label: "Workshops" },
    { id: "behind-the-scenes", label: "Behind the Scenes" },
    { id: "awards", label: "Awards" },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }: { activeCategory: Category; onCategoryChange: (cat: Category) => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
        >
            {categories.map((category, index) => (
                <motion.button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-500 font-medium ${activeCategory === category.id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                            : "glass border border-border/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {category.label}
                </motion.button>
            ))}
        </motion.div>
    );
};

const GalleryCard = ({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const sizeClasses = {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 row-span-1",
        large: "col-span-2 row-span-2",
        tall: "col-span-1 row-span-2",
        wide: "col-span-2 row-span-1",
    };
const MediaContent = ({ showOverlay = true }: { showOverlay?: boolean }) => (
    <>
        {item.type === "video" ? (
            <>
                {item.src.includes('drive.google.com') ? (
                    <iframe
                        src={item.src}
                        className="w-full h-full"
                        allow="autoplay"
                        title={item.title}
                    />
                ) : (
                    <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    />
                )}
        {showOverlay && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-primary/20 backdrop-blur-sm flex size-16 items-center justify-center rounded-full border-2 border-white/80 transition-all duration-300 group-hover:scale-110">
                    <Play className="size-6 fill-white text-white" />
                </div>
            </div>
        )}
    </>
            ) : (
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            )}
        </>
    );

    const InfoOverlay = () => (
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
            <span className="text-primary text-xs font-medium tracking-widest mb-1">
                {item.year}
            </span>
            <h3 className="font-display text-lg md:text-xl text-foreground font-bold">
                {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">{item.location}</p>
        </div>
    );

    const StackEffect = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: item.angle }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.08,
                duration: 0.5,
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.8,
            }}
            whileHover={{
                scale: 1.08,
                rotate: "0deg",
                zIndex: 30,
                transition: { duration: 0.4, type: "spring", stiffness: 200, damping: 15 },
            }}
            className="w-full h-full relative group"
        >
            <div className="w-full h-full rounded-xl border-[6px] border-white shadow-2xl overflow-hidden">
                <MediaContent />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent rounded-xl pointer-events-none" />
            <InfoOverlay />
        </motion.div>
    );

    const DiscloseEffect = () => {
        const vertical = Math.random() > 0.5;
        return (
            <motion.div 
                className="relative w-full h-full overflow-hidden rounded-xl group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
            >
                <MediaContent />
                {imageLoaded && (
                    <>
                        <motion.div
                            className="absolute bg-primary z-20"
                            initial={vertical ? { top: 0, height: "50%", width: "100%" } : { left: 0, width: "50%", height: "100%", top: 0, bottom: 0 }}
                            animate={vertical ? { y: "-100%" } : { x: "-100%" }}
                            transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div
                            className="absolute bg-primary z-20"
                            initial={vertical ? { bottom: 0, height: "50%", width: "100%" } : { right: 0, width: "50%", height: "100%", top: 0, bottom: 0 }}
                            animate={vertical ? { y: "100%" } : { x: "100%" }}
                            transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                
                <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.8 }}
                >
                    <InfoOverlay />
                </motion.div>
            </motion.div>
        );
    };

    const SkewEffect = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full transition-all duration-500 ease-out rounded-xl overflow-hidden group"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            whileHover={{
                scale: 0.96,
                clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0% 100%)",
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
        >
            <motion.div className="relative w-full h-full">
                <motion.div
                    className="w-full h-full"
                    whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                    }}
                >
                    <MediaContent />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                
                <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.3 }}
                >
                    <InfoOverlay />
                </motion.div>
            </motion.div>
        </motion.div>
    );

    const NormalEffect = () => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full h-full overflow-hidden rounded-xl group"
            whileHover={{ scale: 1.02 }}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                <MediaContent />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            
            <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.3 }}
            >
                <InfoOverlay />
            </motion.div>
        </motion.div>
    );

    useEffect(() => {
        setImageLoaded(true);
    }, []);

    return (
        <motion.div
            layout
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`relative cursor-pointer ${sizeClasses[item.size]}`}
            onClick={onClick}
        >
            {item.effect === "stack" && <StackEffect />}
            {item.effect === "disclose" && <DiscloseEffect />}
            {item.effect === "skew" && <SkewEffect />}
            {item.effect === "normal" && <NormalEffect />}
        </motion.div>
    );
};

const LightboxModal = ({ item, onClose, items, onNavigate }: { item: GalleryItem | null; onClose: () => void; items: GalleryItem[]; onNavigate: (item: GalleryItem) => void }) => {
    const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            onNavigate(items[currentIndex - 1]);
        }
    }, [currentIndex, items, onNavigate]);

    const goToNext = useCallback(() => {
        if (currentIndex < items.length - 1) {
            onNavigate(items[currentIndex + 1]);
        }
    }, [currentIndex, items, onNavigate]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!item) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [item, onClose, goToPrevious, goToNext]);

    useEffect(() => {
        if (item) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [item]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full max-w-6xl mx-4 md:mx-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={onClose}
                            className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors p-2"
                        >
                            <X size={28} />
                        </motion.button>

                        <div className="relative aspect-[16/10] bg-card rounded-2xl overflow-hidden border border-border/30">
                            <AnimatePresence mode="wait">
                                {item.type === "video" ? (
    <motion.iframe
        key={item.id}
        src={item.src}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
        allow="autoplay"
        title={item.title}
    />
                                ) : (
                                    <motion.img
                                        key={item.id}
                                        src={item.src}
                                        alt={item.title}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                            >
                                <span className="text-primary text-sm tracking-widest font-medium">
                                    {item.year}
                                </span>
                                <h2 className="font-display text-2xl md:text-4xl text-foreground mt-2 font-bold">
                                    {item.title}
                                </h2>
                                <p className="text-muted-foreground mt-1">{item.location}</p>
                            </motion.div>
                        </div>

                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: currentIndex > 0 ? 1 : 0.3, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                disabled={currentIndex === 0}
                                className="pointer-events-auto p-3 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card border border-border/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: currentIndex < items.length - 1 ? 1 : 0.3, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                disabled={currentIndex === items.length - 1}
                                className="pointer-events-auto p-3 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card border border-border/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={24} />
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center mt-4 text-muted-foreground text-sm"
                        >
                            {currentIndex + 1} / {items.length}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === "all") return galleryItems;
        return galleryItems.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            <Navigation />

            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
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
                        Moments We
                        <br />
                        <span className="text-gradient">Crafted</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        A curated collection of visual stories from our creative sessions, workshops, and award-winning productions.
                    </motion.p>
                </div>

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

            <section className="py-32 relative">
                <div className="container mx-auto px-6 lg:px-8">
                    <CategoryFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <GalleryCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <AnimatePresence>
                        {filteredItems.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20"
                            >
                                <p className="text-muted-foreground text-lg">
                                    No items found in this category.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <LightboxModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    items={filteredItems}
                    onNavigate={setSelectedItem}
                />
            </section>

            <Footer />
        </div>
    );
};

export default Gallery;