import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  icon: React.ReactNode;
  animationStyle?: "pulse" | "rotate" | "bounce" | "shake" | "pingPong" | "none";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  onClick?: () => void;
}

export function AnimatedIcon({
  icon,
  animationStyle = "pulse",
  className,
  size = "md",
  color,
  onClick
}: AnimatedIconProps) {
  // Size classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  // Color style
  const colorStyle = color ? { color } : {};

  // Animation variants
  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const rotateVariants: Variants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  const bounceVariants: Variants = {
    animate: {
      y: ["0%", "-20%", "0%"],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const shakeVariants: Variants = {
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  };
  
  const pingPongVariants: Variants = {
    animate: {
      x: [-5, 5],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Hover and tap animations common to all styles
  const hoverAndTapProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }
  };

  // Select appropriate variant based on animation style
  const getVariants = () => {
    switch (animationStyle) {
      case "pulse": return pulseVariants;
      case "rotate": return rotateVariants;
      case "bounce": return bounceVariants;
      case "shake": return shakeVariants;
      case "pingPong": return pingPongVariants;
      case "none":
      default: return {};
    }
  };

  return (
    <motion.div
      className={cn(sizeClasses[size], "inline-flex", className)}
      style={colorStyle}
      variants={animationStyle !== "none" ? getVariants() : undefined}
      animate={animationStyle !== "none" ? "animate" : undefined}
      {...(onClick ? hoverAndTapProps : {})}
      onClick={onClick}
    >
      {icon}
    </motion.div>
  );
}