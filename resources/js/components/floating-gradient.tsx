import { GradFlow } from 'gradflow';
import { cn } from '@/lib/utils';

interface FloatingGradientProps {
	className?: string;
	isInteractive?: boolean;
}

export default function FloatingGradient({ className, isInteractive = false }: FloatingGradientProps) {
    return (
        <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} aria-hidden="true">
            <GradFlow
                config={{
                    type: 'fold',
                    color1: '#1a90fd',
                    color2: '#06081e',
                    color3: '#F5F5F5',
                    speed: 0.35,
                    scale: 1,
                    noise: 0.12,
                }}
                interactive={isInteractive}
            />	
        </div>
    );
}
