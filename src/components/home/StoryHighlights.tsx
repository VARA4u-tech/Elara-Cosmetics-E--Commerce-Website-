import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

// Import story videos
import storyVideo1 from "@/assets/Videos/WhatsApp Video 2026-02-01 at 11.11.54 AM.mp4";
import storyVideo2 from "@/assets/Videos/WhatsApp Video 2026-02-01 at 11.11.55 AM.mp4";
import storyVideo3 from "@/assets/Videos/WhatsApp Video 2026-02-01 at 11.11.57 AM.mp4";
import storyVideo4 from "@/assets/Videos/WhatsApp Video 2026-02-01 at 11.11.59 AM (1).mp4";
import storyVideo5 from "@/assets/Videos/WhatsApp Video 2026-02-01 at 11.11.59 AM.mp4";

// Import story cover images
import newInImg from "@/assets/category_updates/glowcell.png";
import routineImg from "@/assets/category_updates/face.png";
import glowImg from "@/assets/category_updates/golden-glow.png";
import hairImg from "@/assets/category_updates/hair.png";
import ritualsImg from "@/assets/category_updates/wellness.jpg";

// Story data with local videos and images
const stories = [
    {
        id: 1,
        title: "New In",
        image: newInImg,
        video: storyVideo1,
    },
    {
        id: 2,
        title: "Routine",
        image: routineImg,
        video: storyVideo2,
    },
    {
        id: 3,
        title: "Glow",
        image: glowImg,
        video: storyVideo3,
    },
    {
        id: 4,
        title: "Hair Care",
        image: hairImg,
        video: storyVideo4,
    },
    {
        id: 5,
        title: "Rituals",
        image: ritualsImg,
        video: storyVideo5,
    },
];

const StoryHighlights = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Handle outside click to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section className="py-6 bg-background border-b border-border/10 overflow-hidden select-none">
            <div className="container mx-auto px-4">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 px-2 md:justify-center">
                    {stories.map((story) => (
                        <div key={story.id} className="flex flex-col items-center gap-2 shrink-0">
                            <motion.div
                                layoutId={`story-circle-${story.id}`}
                                className="relative w-[70px] h-[70px] md:w-[85px] md:h-[85px] rounded-full p-[3px] cursor-pointer"
                                style={{
                                    background: "linear-gradient(45deg, #C5A065, #E5C590, #C5A065)",
                                }}
                                onClick={() => setSelectedId(story.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-full h-full rounded-full border-2 border-background overflow-hidden relative bg-white">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white/80 fill-white/80" />
                                    </div>
                                </div>
                            </motion.div>
                            <span className="text-[10px] uppercase tracking-wide font-medium text-center max-w-[80px] truncate">
                                {story.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {stories.map((story) => {
                            if (story.id !== selectedId) return null;
                            return (
                                <motion.div
                                    key={story.id}
                                    layoutId={`story-circle-${story.id}`}
                                    className="relative w-full h-full md:w-auto md:h-[85vh] md:aspect-[9/16] bg-black rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
                                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
                                >
                                    <video
                                        ref={videoRef}
                                        src={story.video}
                                        autoPlay
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 z-20 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
                                        aria-label="Close story"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent space-y-2">
                                        <h3 className="text-white font-serif text-2xl">{story.title}</h3>
                                        <p className="text-white/80 text-sm">Experience the ritual.</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default StoryHighlights;
