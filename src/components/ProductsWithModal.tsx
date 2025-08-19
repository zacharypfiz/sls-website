import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface ProductImage {
  src: string;
  alt: string;
  title: string;
}

interface ProductsWithModalProps {
  images: ProductImage[];
}

export default function ProductsWithModal({ images }: ProductsWithModalProps) {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);

  return (
    <>
      <div className="relative">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Product Views</h3>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore detailed views of the EcoDenser system. Click on any image to view in full resolution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="group">
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer bg-gray-100"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-[4/3] object-cover transition-all duration-500 hover:scale-110"
                />
                
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-800 tracking-wide">
                      {image.title}
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
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