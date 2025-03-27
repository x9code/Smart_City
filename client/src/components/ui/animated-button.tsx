import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  animationStyle?: "scale" | "pulse" | "bounce" | "rotate" | "slide";
}

export function AnimatedButton({
  children,
  animationStyle = "scale",
  className,
  ...props
}: AnimatedButtonProps) {
  // Preparing animation variants based on style
  const getAnimationProps = () => {
    switch (animationStyle) {
      case "pulse":
        return {
          whileHover: { scale: [1, 1.05, 1], transition: { duration: 0.3, repeat: 1 } }
        };
      case "bounce":
        return {
          whileHover: { y: [-3, 0, -3], transition: { duration: 0.5, repeat: Infinity } }
        };
      case "rotate":
        return {
          whileHover: { rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }
        };
      case "slide":
        return {
          whileHover: { x: [0, 5, 0], transition: { duration: 0.5 } }
        };
      case "scale":
      default:
        return {
          whileHover: { scale: 1.05 }
        };
    }
  };

  return (
    <motion.div
      {...getAnimationProps()}
      whileTap={{ scale: 0.95 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}