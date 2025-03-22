
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverable = false
}) => {
  return (
    <div 
      className={cn(
        "glass-card p-6",
        hoverable && "hover:shadow-xl hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
