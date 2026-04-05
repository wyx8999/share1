import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Trash2, ExternalLink, Copy, Check } from 'lucide-react';
import type { MediaItem } from '../types';
import { useMediaStore } from '../store/mediaStore';

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onSelect: (item: MediaItem) => void;
}

export function MediaCard({ item, index, onSelect }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const { likeItem, removeItem } = useMediaStore();

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeItem(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这个媒体吗？')) {
      removeItem(item.id);
    }
  };

  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(item.url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl overflow-hidden bg-slate-800 cursor-pointer"
    >
      {/* Media Content */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              src={item.url}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:opacity-0 transition-opacity">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="absolute top-3 right-3 flex gap-2"
        >
          <button
            onClick={handleCopyLink}
            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-colors"
            title="复制链接"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleOpenExternal}
            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-colors"
            title="在新窗口打开"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/80 transition-colors"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <h3 className="text-white font-semibold text-lg truncate">{item.title}</h3>
          {item.description && (
            <p className="text-slate-300 text-sm truncate mt-1">{item.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-slate-400 hover:text-pink-500 transition-colors"
          >
            <Heart className={`w-5 h-5 ${item.likes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span className="text-sm font-medium">{item.likes}</span>
          </button>
        </div>
        <span className="text-xs text-slate-500">
          {item.type === 'image' ? '图片' : '视频'}
        </span>
      </div>
    </motion.div>
  );
}
