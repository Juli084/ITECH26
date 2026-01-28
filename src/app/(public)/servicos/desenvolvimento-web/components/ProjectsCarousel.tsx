"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string;
    projectUrl: string | null;
}

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate projects array to create a seamless loop effect
    const displayProjects = [...projects, ...projects];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isPaused) return;

        const autoScroll = setInterval(() => {
            const cardGap = 24; // gap-6 in Tailwind (1.5rem = 24px)
            const children = Array.from(scrollContainer.children) as HTMLElement[];
            if (children.length === 0) return;

            // Calculate width of the ORIGINAL set of items (not the duplicated ones)
            // We iterate up to projects.length
            let originalSetWidth = 0;
            for (let i = 0; i < projects.length; i++) {
                if (children[i]) {
                    // Include the card width and the gap
                    originalSetWidth += children[i].offsetWidth + cardGap;
                }
            }

            const currentScroll = scrollContainer.scrollLeft;
            const scrollStep = (children[0]?.offsetWidth || 400) + cardGap;

            let effectiveScroll = currentScroll;

            // INFINITE LOOP LOGIC:
            // Check if we have scrolled past the end of the first set (original items).
            // A tolerance of 10px handles sub-pixel rendering differences.
            if (currentScroll >= originalSetWidth - 10) {
                // Instantly snap back to the start (subtract the width of the first set)
                // This puts the scroll position at the exact equivalent spot in the first set.
                effectiveScroll = currentScroll - originalSetWidth;
                scrollContainer.scrollLeft = effectiveScroll;
            }

            // Scroll to the next item smoothly
            scrollContainer.scrollTo({
                left: effectiveScroll + scrollStep,
                behavior: "smooth"
            });
        }, 3000); // 3 seconds interval

        return () => clearInterval(autoScroll);
    }, [isPaused, projects.length]);

    if (!projects || projects.length === 0) return null;

    return (
        <section className="py-24 bg-neutral-950 text-white border-t border-white/5 w-full overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-purple-500 font-semibold tracking-wider text-sm uppercase mb-2 block"
                    >
                        Portfólio
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        Projetos Selecionados
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-md text-lg"
                >
                    Explore casos reais de transformação digital e design de alta performance.
                </motion.p>
            </div>

            {/* Wrapper to contain overflow cleanly */}
            <div className="w-full relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide w-full"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {displayProjects.map((project, index) => (
                        <ProjectCard
                            key={`${project.id}-copy-${index}`}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }} // Removed staged delay for duplicates to avoid weird staggering on loop
            viewport={{ once: true, margin: "-100px" }}
            className="relative min-w-[85vw] md:min-w-[600px] h-[400px] md:h-[500px] rounded-3xl overflow-hidden shrink-0 snap-center group border border-white/10 bg-neutral-900"
        >
            {/* Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90" />

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-3">
                        <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">{project.title}</h3>
                        <p className="text-gray-300 md:text-lg line-clamp-2 max-w-lg font-light leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {project.projectUrl && (
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                        >
                            <ArrowUpRight className="w-6 h-6" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
