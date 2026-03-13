import { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';

const STORAGE_KEY = 'artstone_gallery_images';

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading images:', e);
      }
    }
  }, []);

  const saveImages = useCallback((newImages: GalleryImage[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
      setImages(newImages);
    } catch (e) {
      console.error('Error saving images:', e);
      alert('Ka një problem me ruajtjen e imazheve.');
    }
  }, []);

  const addImage = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Skedari nuk është imazh'));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Imazhi është më i madh se 10MB'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: GalleryImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          data: e.target?.result as string,
          size: file.size,
          date: new Date().toISOString(),
          featured: images.length < 3,
        };
        
        const newImages = [...images, newImage];
        saveImages(newImages);
        resolve();
      };
      reader.onerror = () => reject(new Error('Gabim gjatë leximit të skedarit'));
      reader.readAsDataURL(file);
    });
  }, [images, saveImages]);

  const deleteImage = useCallback((id: number) => {
    const newImages = images.filter((img) => img.id !== id);
    saveImages(newImages);
  }, [images, saveImages]);

  const toggleFeatured = useCallback((id: number) => {
    const newImages = images.map((img) => 
      img.id === id ? { ...img, featured: !img.featured } : img
    );
    saveImages(newImages);
  }, [images, saveImages]);

  const featuredImages = images.filter((img) => img.featured).slice(0, 6);

  return {
    images,
    featuredImages,
    addImage,
    deleteImage,
    toggleFeatured,
  };
}
