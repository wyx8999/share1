import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Grid, LayoutGrid } from 'lucide-react';
import { MediaCard } from './MediaCard';
import { MediaViewer } from './MediaViewer';
import { useMediaStore } from '../store/mediaStore';
import type { MediaItem } from '../types';

interface MediaGridProps {
  searchQuery: string;
}

export function MediaGrid({ searchQuery }: MediaGridProps) {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const items = useMediaStore((state) => state.items);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesType = filter === 'all' || item.type === filter;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [items, filter, searchQuery]);

  const stats = useMemo(() => ({
    all: items.length,
    images: items.filter(i => i.type === 'image').length,
    videos: items.filter(i => i.type === 'video').length
  }), [items]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              全部
              <span className="px-1.5 py-0.5 bg-white/10 rounded-md text-xs">{stats.all}</span>
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'image'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              图片
              <span className="px-1.5 py-0.5 bg-white/10 rounded-md text-xs">{stats.images}</span>
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'video'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              视频
              <span className="px-1.5 py-0.5 bg-white/10 rounded-md text-xs">{stats.videos}</span>
            </button>
          </div>

          <p className="text-slate-400 text-sm">
            共 <span className="text-violet-400 font-semibold">{filteredItems.length}</span> 个媒体
          </p>
        </motion.div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  index={index}
                  onSelect={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Grid className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">暂无内容</h3>
            <p className="text-slate-500 text-center max-w-md">
              {searchQuery ? '没有找到匹配的媒体，试试其他关键词' : '点击右上角的"添加媒体"按钮，通过图床链接添加你的照片和视频'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Media Viewer Modal */}
      <MediaViewer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        items={filteredItems}
        onNavigate={setSelectedItem}
      />
    </>
  );
}
