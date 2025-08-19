import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryWithModalProps {
  images: GalleryImage[];
}

export default function GalleryWithModal({ images }: GalleryWithModalProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {images.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
      
      <ImageModal
        src={selectedImage?.src || ''}
        alt={selectedImage?.alt || ''}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}