export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description?: string;
  createdAt: Date;
  likes: number;
  tags: string[];
}

export interface Album {
  id: string;
  name: string;
  cover?: string;
  items: MediaItem[];
  createdAt: Date;
}
