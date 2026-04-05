import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Copy, ExternalLink, Download } from 'lucide-react';
import type { MediaItem } from '../types';
import { useMediaStore } from '../store/mediaStore';

interface MediaViewerProps {
  item: MediaItem | null;
  onClose: () => void;
  items: MediaItem[];
  onNavigate: (item: MediaItem) => void;
}

export function MediaViewer({ item, onClose, items, onNavigate }: MediaViewerProps) {
  const { likeItem } = useMediaStore();

  const currentIndex = item ? items.findIndex(i => i.id === item.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(items[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(items[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, items, onNavigate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [item, handleKeyDown]);

  const handleCopyLink = () => {
    if (item) {
      navigator.clipboard.writeText(item.url);
    }
  };

  const handleDownload = () => {
    if (item) {
      const link = document.createElement('a');
      link.href = item.url;
      link.download = item.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Media Content */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-6xl max-h-[85vh] mx-4 flex flex-col lg:flex-row gap-6"
          >
            {/* Media */}
            <div className="flex-1 flex items-center justify-center">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-w-full max-h-[70vh] lg:max-h-[80vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] lg:max-h-[80vh] rounded-lg"
                />
              )}
            </div>

            {/* Info Panel */}
            <div className="lg:w-80 bg-slate-900/50 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
              {item.description && (
                <p className="text-slate-400 mb-4">{item.description}</p>
              )}

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => likeItem(item.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-xl transition-colors"
                >
                  <Heart className={`w-5 h-5 ${item.likes > 0 ? 'fill-current' : ''}`} />
                  喜欢 ({item.likes})
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  复制链接
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <Download className="w-5 h-5" />
                  下载
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  在新窗口打开
                </a>
              </div>

              {/* Navigation Info */}
              <div className="mt-6 pt-4 border-t border-slate-700/50 text-center text-slate-500 text-sm">
                {currentIndex + 1} / {items.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
