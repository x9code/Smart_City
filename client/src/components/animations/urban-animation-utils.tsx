import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A floating element that animates in from the bottom
 * Useful for creating dynamic call-to-action elements
 */
export const FloatingActionButton = ({ 
  children, 
  onClick,
  className,
  delay = 0,
  position = 'bottom-right' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  delay?: number;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const positionClasses = {
    'bottom-right': 'right-4 bottom-4',
    'bottom-left': 'left-4 bottom-4',
    'bottom-center': 'left-1/2 -translate-x-1/2 bottom-4',
    'top-right': 'right-4 top-4',
    'top-left': 'left-4 top-4'
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={onClick}
          className={cn(
            "fixed z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg",
            positionClasses[position],
            className
          )}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/**
 * A component that reveals content when it enters the viewport
 */
export const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.5,
  className
}: { 
  children: React.ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const directionVariants = {
    up: { 
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    down: { 
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    left: { 
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    right: { 
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    }
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={directionVariants[direction]}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered animation for list items or grid layouts
 */
export const StaggeredContainer = ({ 
  children,
  className,
  duration = 0.5,
  staggerChildren = 0.1,
  delayChildren = 0.1
}: { 
  children: React.ReactNode;
  className?: string;
  duration?: number;
  staggerChildren?: number;
  delayChildren?: number;
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delayChildren,
        staggerChildren
      }
    }
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Child item for StaggeredContainer
 */
export const StaggeredItem = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
};

/**
 * An animated progress indicator
 */
export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2,
  className,
  formatter = (value: number) => value.toFixed(0)
}: { 
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}) {
  const [value, setValue] = useState(from);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setValue(from + Math.floor(progress * (to - from)));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);
  
  return (
    <div className={className}>
      {formatter(value)}
    </div>
  );
}

/**
 * Animated badge for discoveries, achievements, etc.
 */
export function AchievementBadge({
  label,
  icon,
  color = "bg-blue-500",
  isNew = false,
  onClick,
  className
}: {
  label: string;
  icon: React.ReactNode;
  color?: string;
  isNew?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center p-2 rounded-full cursor-pointer",
        color,
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={isNew ? { scale: 0.8, opacity: 0 } : undefined}
      animate={isNew ? { 
        scale: [0.8, 1.2, 1],
        opacity: 1
      } : undefined}
      transition={isNew ? { 
        duration: 0.6,
        times: [0, 0.7, 1]
      } : undefined}
    >
      {icon}
      
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold"
        initial={isNew ? { scale: 0 } : { scale: 0 }}
        animate={isNew ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.3 }}
      >
        !
      </motion.div>
      
      <motion.span
        className="absolute top-full mt-1 text-xs font-medium whitespace-nowrap bg-black/80 text-white px-2 py-1 rounded"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

/**
 * Animated text that types out character by character
 */
export function TypewriterText({
  text,
  speed = 50,
  className,
  onComplete
}: {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);
  
  return (
    <div className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
      />
    </div>
  );
}