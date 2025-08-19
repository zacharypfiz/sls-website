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
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="group">
              <div className="relative bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-black tracking-wide">
                    {image.title.toUpperCase()}
                  </h4>
                </div>
                
                <div 
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full aspect-square object-cover transition-all duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
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