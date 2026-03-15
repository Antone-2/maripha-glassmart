import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

// Fade in animation
interface FadeInProps extends MotionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const FadeIn = ({ children, delay = 0, className = '', ...props }: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide in from left
export const SlideInLeft = ({ children, delay = 0, className = '', ...props }: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide in from right
export const SlideInRight = ({ children, delay = 0, className = '', ...props }: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Scale in animation
export const ScaleIn = ({ children, delay = 0, className = '', ...props }: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Stagger container for lists
interface StaggerContainerProps extends MotionProps {
    children: ReactNode;
    className?: string;
}

export const StaggerContainer = ({ children, className = '', ...props }: StaggerContainerProps) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Stagger item for list children
interface StaggerItemProps extends MotionProps {
    children: ReactNode;
    className?: string;
}

export const StaggerItem = ({ children, className = '', ...props }: StaggerItemProps) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Hover scale wrapper
interface HoverScaleProps {
    children: ReactNode;
    className?: string;
    scale?: number;
}

export const HoverScale = ({ children, className = '', scale = 1.05 }: HoverScaleProps) => (
    <motion.div
        whileHover={{ scale }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Animated button wrapper
interface AnimatedButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const AnimatedButton = ({
    children,
    onClick,
    className = '',
    type = 'button',
    disabled = false
}: AnimatedButtonProps) => (
    <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={className}
    >
        {children}
    </motion.button>
);

// Page transition wrapper
interface PageTransitionProps {
    children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);
