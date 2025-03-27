import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  animationStyle?: "hover" | "continuous" | "entrance" | "none";
  delay?: number;
}

export function AnimatedCard({
  header,
  footer,
  children,
  animationStyle = "hover",
  className,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  // Animation variants
  const entranceAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay
      }
    }
  };

  const hoverAnimation = {
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const continuousAnimation = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Select animation based on style
  const getAnimationProps = () => {
    switch (animationStyle) {
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover",
          variants: hoverAnimation
        };
      case "continuous":
        return {
          animate: "animate",
          variants: continuousAnimation
        };
      case "entrance":
        return {
          initial: "hidden",
          animate: "visible",
          variants: entranceAnimation
        };
      case "none":
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn("", className)}
      {...getAnimationProps()}
      {...props}
    >
      <Card className="h-full">
        {header && <CardHeader>{header}</CardHeader>}
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  );
}