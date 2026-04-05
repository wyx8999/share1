import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MediaItem, Album } from '../types';

interface MediaStore {
  items: MediaItem[];
  albums: Album[];
  addItem: (item: Omit<MediaItem, 'id' | 'createdAt' | 'likes'>) => void;
  removeItem: (id: string) => void;
  likeItem: (id: string) => void;
  addAlbum: (name: string) => void;
  addToAlbum: (albumId: string, itemId: string) => void;
  removeFromAlbum: (albumId: string, itemId: string) => void;
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set) => ({
      items: [
        {
          id: '1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          title: '山间日出',
          description: '清晨的阳光洒在山峰上',
          createdAt: new Date('2024-01-15'),
          likes: 42,
          tags: ['风景', '山', '日出']
        },
        {
          id: '2',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
          title: '森林小径',
          description: '通往未知的神秘道路',
          createdAt: new Date('2024-01-20'),
          likes: 38,
          tags: ['森林', '自然', '道路']
        },
        {
          id: '3',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
          title: '海边落日',
          description: '金色的夕阳映照在海面',
          createdAt: new Date('2024-02-01'),
          likes: 56,
          tags: ['海洋', '日落', '风景']
        },
        {
          id: '4',
          type: 'video',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          title: '可爱动画',
          description: '有趣的动画短片',
          createdAt: new Date('2024-02-10'),
          likes: 28,
          tags: ['动画', '有趣']
        }
      ],
      albums: [
        {
          id: 'album-1',
          name: '我的收藏',
          cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          items: [],
          createdAt: new Date('2024-01-01')
        }
      ],
      addItem: (item) => set((state) => ({
        items: [{
          ...item,
          id: Date.now().toString(),
          createdAt: new Date(),
          likes: 0
        }, ...state.items]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      likeItem: (id) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, likes: item.likes + 1 } : item
        )
      })),
      addAlbum: (name) => set((state) => ({
        albums: [...state.albums, {
          id: Date.now().toString(),
          name,
          items: [],
          createdAt: new Date()
        }]
      })),
      addToAlbum: (albumId, itemId) => set((state) => {
        const item = state.items.find(i => i.id === itemId);
        if (!item) return state;
        return {
          albums: state.albums.map(album =>
            album.id === albumId
              ? { ...album, items: [...album.items, item], cover: album.cover || item.url }
              : album
          )
        };
      }),
      removeFromAlbum: (albumId, itemId) => set((state) => ({
        albums: state.albums.map(album =>
          album.id === albumId
            ? { ...album, items: album.items.filter(i => i.id !== itemId) }
            : album
        )
      }))
    }),
    {
      name: 'media-storage',
      partialize: (state) => ({
        items: state.items.map(item => ({
          ...item,
          createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt
        })),
        albums: state.albums.map(album => ({
          ...album,
          createdAt: album.createdAt instanceof Date ? album.createdAt.toISOString() : album.createdAt,
          items: album.items.map(item => ({
            ...item,
            createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt
          }))
        }))
      })
    }
  )
);
