"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
    children,
    width = "fit-content",
    delay = 0.1,
    className,
    direction = "up"
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const getDirectionOffset = () => {
        switch (direction) {
            case "up": return { y: 20, x: 0 };
            case "down": return { y: -20, x: 0 };
            case "left": return { y: 0, x: 20 };
            case "right": return { y: 0, x: -20 };
            case "none": return { y: 0, x: 0 };
            default: return { y: 20, x: 0 };
        }
    };

    const offset = getDirectionOffset();

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, ...offset },
                    visible: { opacity: 1, x: 0, y: 0 }
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
