"use client"
import { ReactNode } from "react"



interface LinkButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;  // Optional className prop
  size?: "big" | "small";
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, onClick, className = '', size }) => {
  const sizeClass = size === 'big' ? 'py-3 px-6 text-lg' : size === 'small' ? 'py-1 px-3 text-sm' : 'py-2 px-4';
  return (
      <button
          onClick={onClick}
          className={`${sizeClass} ${className} bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all`}
      >
          {children}
      </button>
  );
};

export default LinkButton;
