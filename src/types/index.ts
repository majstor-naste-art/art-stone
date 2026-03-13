export interface GalleryImage {
  id: number;
  name: string;
  data: string;
  size: number;
  date: string;
  featured: boolean;
}

export type Page = 'home' | 'gallery' | 'about';
