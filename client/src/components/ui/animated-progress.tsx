import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface AnimatedProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  valueFormat?: (value: number) => string;
  variant?: "default" | "gradient" | "pulse" | "striped";
  className?: string;
  barClassName?: string;
  animate?: boolean;
}

export function AnimatedProgress({
  value,
  max = 100,
  size = "md",
  showValue = false,
  label,
  valueFormat = (v) => `${Math.round(v)}%`,
  variant = "default",
  className,
  barClassName,
  animate = true,
}: AnimatedProgressProps) {
  const percentage = (value / max) * 100;
  
  // Size classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };

  // Gradient variant
  const gradientBar = (
    <div 
      className={cn(
        "h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        barClassName
      )}
      style={{ width: `${percentage}%` }}
    />
  );
  
  // Pulse variant
  const pulseBar = (
    <motion.div
      className={cn("h-full rounded-full bg-primary", barClassName)}
      style={{ width: `${percentage}%` }}
      animate={animate ? {
        opacity: [0.7, 1, 0.7],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
  
  // Striped variant
  const stripedBar = (
    <div 
      className={cn(
        "h-full rounded-full bg-primary relative overflow-hidden",
        barClassName
      )}
      style={{ width: `${percentage}%` }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)',
          backgroundSize: '20px 20px',
        }}
        animate={animate ? { x: ["-20px", "0px"] } : {}}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  );

  // Select the proper bar based on variant
  const renderProgressBar = () => {
    switch (variant) {
      case "gradient":
        return gradientBar;
      case "pulse":
        return pulseBar;
      case "striped":
        return stripedBar;
      default:
        return (
          <motion.div
            className={cn("h-full rounded-full bg-primary", barClassName)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: animate ? 0.8 : 0, ease: "easeOut" }}
          />
        );
    }
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {valueFormat(percentage)}
            </span>
          )}
        </div>
      )}
      <div className={cn(
        "w-full bg-secondary rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        {renderProgressBar()}
      </div>
    </div>
  );
}