import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dots" | "pulse" | "city";
  color?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  variant = "default",
  color,
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const containerSizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };

  // Style based on color prop
  const colorStyle = color ? { backgroundColor: color } : {};
  const strokeStyle = color ? { stroke: color } : {};

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-2 justify-center items-center", className)}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn("rounded-full bg-primary", sizeClasses[size])}
            style={colorStyle}
            animate={{
              y: ["0%", "-50%", "0%"],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", containerSizeClasses[size], className)}>
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-30"
          style={colorStyle}
          animate={{
            scale: [0, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          style={colorStyle}
          animate={{
            scale: [0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    );
  }

  if (variant === "city") {
    // A playful city skyline loading animation
    return (
      <div className={cn("flex items-end justify-center space-x-1", containerSizeClasses[size], className)}>
        {[1, 2, 3, 4, 5].map((_, index) => {
          const height = (index % 3 === 0) ? "75%" : (index % 2 === 0) ? "60%" : "40%";
          return (
            <motion.div
              key={index}
              className="bg-primary w-2 rounded-t-md"
              style={{
                ...colorStyle,
                height,
              }}
              animate={{
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("relative", className)}>
      <motion.svg
        className={cn("text-muted-foreground", sizeClasses[size])}
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          style={strokeStyle}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          style={colorStyle}
        />
      </motion.svg>
    </div>
  );
}