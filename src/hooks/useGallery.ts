import { useState, useEffect, useCallback, useRef } from 'react';
import { GalleryImage } from '../types';

const STORAGE_KEY = 'artstone_gallery_images';

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const imagesRef = useRef<GalleryImage[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Load images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setImages(parsed);
        imagesRef.current = parsed;
        console.log('Loaded images from storage:', parsed.length);
      } catch (e) {
        console.error('Error loading images:', e);
      }
    }
  }, []);

  // Save to localStorage whenever images change
  useEffect(() => {
    if (images.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        console.log('Saved images to storage:', images.length);
      } catch (e) {
        console.error('Error saving images:', e);
        // Check if it's a quota exceeded error
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          alert('Hapësira e ruajtjes është plot! Fshini disa imazhe.');
        }
      }
    }
  }, [images]);

  const addImage = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Skedari nuk është imazh'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Imazhi është më i madh se 5MB. Ju lutem kompresoni imazhin.'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Compress image if it's too large
        const img = new Image();
        img.onload = () => {
          let finalData = result;
          
          // If image data is larger than 500KB, compress it
          if (result.length > 500 * 1024) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions (max 1200px)
            let { width, height } = img;
            const maxSize = 1200;
            
            if (width > maxSize || height > maxSize) {
              if (width > height) {
                height = (height / width) * maxSize;
                width = maxSize;
              } else {
                width = (width / height) * maxSize;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            // Compress to JPEG with 0.7 quality
            finalData = canvas.toDataURL('image/jpeg', 0.7);
            console.log('Image compressed:', result.length, '->', finalData.length);
          }
          
          const newImage: GalleryImage = {
            id: Date.now() + Math.random(),
            name: file.name,
            data: finalData,
            size: file.size,
            date: new Date().toISOString(),
            featured: imagesRef.current.length < 3,
          };
          
          setImages(prevImages => {
            const updated = [...prevImages, newImage];
            imagesRef.current = updated;
            return updated;
          });
          
          console.log('Image added:', file.name);
          resolve();
        };
        
        img.onerror = () => {
          reject(new Error('Gabim gjatë procesimit të imazhit'));
        };
        
        img.src = result;
      };
      
      reader.onerror = () => {
        reject(new Error('Gabim gjatë leximit të skedarit'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const deleteImage = useCallback((id: number) => {
    setImages(prevImages => {
      const updated = prevImages.filter((img) => img.id !== id);
      imagesRef.current = updated;
      console.log('Image deleted. Remaining:', updated.length);
      return updated;
    });
  }, []);

  const toggleFeatured = useCallback((id: number) => {
    setImages(prevImages => {
      const updated = prevImages.map((img) =>
        img.id === id ? { ...img, featured: !img.featured } : img
      );
      imagesRef.current = updated;
      return updated;
    });
  }, []);

  const featuredImages = images.filter((img) => img.featured).slice(0, 6);

  return {
    images,
    featuredImages,
    addImage,
    deleteImage,
    toggleFeatured,
  };
}
