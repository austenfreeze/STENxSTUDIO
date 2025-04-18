// components/image-gallery.tsx
'use client';

import { useState } from 'react';
import SanityImage from './sanity-image';

export default function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="space-y-4">
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <SanityImage 
          image={images[activeImage]} 
          alt={images[activeImage].alt || ''} 
          width={1200} 
          height={675} 
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button 
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square w-20 rounded-md overflow-hidden ${
              index === activeImage ? 'ring-2 ring-primary' : ''
            }`}
          >
            <SanityImage 
              image={image} 
              alt={image.alt || ''} 
              width={80} 
              height={80} 
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
