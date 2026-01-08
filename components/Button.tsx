import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    fullWidth = false, 
    icon,
    className = '',
    ...props 
}) => {
    const baseStyles = "relative font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 select-none";
    
    const variants = {
        primary: "bg-primary text-[#23220f] shadow-[0_4px_0_#d4d105] hover:brightness-105 active:shadow-none active:translate-y-[4px]",
        secondary: "bg-white dark:bg-surface-dark text-[#23220f] dark:text-white border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-opacity-80",
        danger: "bg-red-500 text-white shadow-[0_4px_0_#b91c1c] hover:bg-red-400 active:shadow-none active:translate-y-[4px]",
        ghost: "bg-transparent text-[#23220f] dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
    };

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {icon && <span className="text-xl">{icon}</span>}
            {children}
        </button>
    );
};