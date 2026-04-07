import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({ src, alt, className, ...props }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};
