interface ModalImage {
  src: string;
  alt: string;
}

class SharedImageModal {
  private selectedImage: ModalImage | null = null;
  private modalInstance: HTMLElement | null = null;
  private imageCache = new Map<string, Promise<HTMLImageElement>>();
  private modalContainer: HTMLElement;

  constructor() {
    this.modalContainer = document.createElement('div');
    document.body.appendChild(this.modalContainer);
    this.setupKeyboardHandler();
  }

  private setupKeyboardHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalInstance) {
        this.close();
      }
    });
  }

  private preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }
    
    const img = new Image();
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
    img.src = src;
    this.imageCache.set(src, promise);
    return promise;
  }

  public preloadOnHover(src: string) {
    this.preloadImage(src);
  }

  public open(src: string, alt: string) {
    this.selectedImage = { src, alt };
    if (this.modalInstance) {
      this.modalInstance.remove();
    }
    
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm';
    backdrop.onclick = () => this.close();
    
    const modalContent = document.createElement('div');
    modalContent.className = 'relative max-w-full max-h-full p-4';
    modalContent.onclick = (e) => e.stopPropagation();
    
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all';
    closeButton.setAttribute('aria-label', 'Close modal');
    closeButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
    closeButton.onclick = () => this.close();
    
    // Create loading placeholder
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'flex items-center justify-center min-h-[300px] text-white';
    loadingDiv.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>';
    
    const img = document.createElement('img');
    img.alt = alt;
    img.className = 'max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl opacity-0 transition-opacity duration-300';
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(loadingDiv);
    modalContent.appendChild(img);
    backdrop.appendChild(modalContent);
    this.modalContainer.appendChild(backdrop);
    
    this.modalInstance = backdrop;
    document.body.style.overflow = 'hidden';
    
    // Load image (from cache if available)
    this.preloadImage(src).then((cachedImg) => {
      img.src = src;
      // If image is already loaded (cached), show immediately
      if (cachedImg.complete) {
        loadingDiv.style.display = 'none';
        img.classList.remove('opacity-0');
        img.style.transition = 'none'; // No animation for cached images
      } else {
        // Show loading state and animate in when loaded
        img.onload = () => {
          loadingDiv.style.display = 'none';
          img.classList.remove('opacity-0');
        };
      }
    }).catch(() => {
      loadingDiv.innerHTML = '<div class="text-red-400">Failed to load image</div>';
    });
  }

  public close() {
    if (this.modalInstance) {
      this.modalInstance.remove();
      this.modalInstance = null;
    }
    document.body.style.overflow = 'unset';
  }

  public attachToElements(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        // Preload on hover for instant modal opening
        element.addEventListener('mouseenter', () => {
          const src = element.dataset.imageSrc;
          if (src) {
            this.preloadOnHover(src);
          }
        });
        
        element.addEventListener('click', () => {
          const src = element.dataset.imageSrc;
          const alt = element.dataset.imageAlt;
          if (src && alt) {
            this.open(src, alt);
          }
        });
      }
    });
  }
}

// Global instance
declare global {
  interface Window {
    sharedImageModal: SharedImageModal;
  }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  window.sharedImageModal = new SharedImageModal();
}

export default SharedImageModal;