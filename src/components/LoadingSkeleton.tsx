import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
}

// Base skeleton component with shimmer animation
export const Skeleton = ({ className = '' }: SkeletonProps) => (
    <motion.div
        className={`bg-muted rounded-md ${className}`}
        animate={{
            opacity: [0.5, 1, 0.5],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    />
);

// Card skeleton
export const CardSkeleton = () => (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-5 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="pt-3 border-t border-border flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    </div>
);

// Product grid skeleton
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
    <div className="hero-gradient py-12 lg:py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
            </div>
        </div>
    </div>
);

// Stats section skeleton
export const StatsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center p-6 bg-card rounded-xl border border-border">
                <Skeleton className="h-10 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
            </div>
        ))}
    </div>
);

// Testimonial skeleton
export const TestimonialSkeleton = () => (
    <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
    </div>
);

// Page loader
export const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-muted-foreground">Loading...</p>
        </motion.div>
    </div>
);

// Inline loader
export const InlineLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <motion.div
            className={`${sizes[size]} border-2 border-primary border-t-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    );
};

// Button loader
export const ButtonLoader = () => (
    <motion.div
        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
);
