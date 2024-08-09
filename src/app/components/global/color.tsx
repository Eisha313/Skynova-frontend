
export const themeColors = {
    primary: '#2d3748', 
    secondary: '#4299e1', 
  };
  
import React, { ReactNode } from 'react';

interface ThemeBackgroundProps {
  children: ReactNode;
  color: keyof typeof themeColors;
  className?: string;
}

const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ children, color, className = '' }) => {
  return (
    <div
      className={className}
      style={{ backgroundColor: themeColors[color] }} // Apply color as backgroundColor
    >
      {children}
    </div>
  );
};

export default ThemeBackground;
