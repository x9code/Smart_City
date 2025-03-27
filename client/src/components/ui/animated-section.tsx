import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function AnimatedSection({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
  className,
  ...props
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
  });

  // Define animation variants
  const getAnimationVariant = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: duration,
              delay: delay,
              ease: "easeOut" 
            }
          }
        };
      case "slideUp":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: duration,
              delay: delay
            }
          }
        };
      case "slideLeft":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: duration,
              delay: delay
            }
          }
        };
      case "slideRight":
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: duration,
              delay: delay
            }
          }
        };
      case "scaleIn":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: duration,
              delay: delay
            }
          }
        };
      case "none":
      default:
        return {
          visible: {}, 
          hidden: {}
        };
    }
  };

  // Trigger animation when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  if (animation === "none") {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getAnimationVariant()}
      className={cn("", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}