import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";

const stats = [
  { label: "Happy Customers", value: 2500, suffix: "+" },
  { label: "Products Available", value: 500, suffix: "+" },
  { label: "Years in Business", value: 9, suffix: "" },
  { label: "Projects Completed", value: 1200, suffix: "+" },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-accent">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section ref={ref} className="py-16 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} active={isVisible} />
              <p className="text-primary-foreground/80 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
