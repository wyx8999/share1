import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, Link, Tag, FileText, Sparkles } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [type, setType] = useState<'image' | 'video'>('image');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  const addItem = useMediaStore((state) => state.addItem);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('请输入图床链接');
      return;
    }

    if (!title.trim()) {
      setError('请输入标题');
      return;
    }

    const tags = tagsInput
      .split(/[,，\s]+/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    addItem({
      type,
      url: url.trim(),
      title: title.trim(),
      description: description.trim() || undefined,
      tags
    });

    // Reset form
    setUrl('');
    setTitle('');
    setDescription('');
    setTagsInput('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4"
          >
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-semibold text-white">添加新媒体</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Type Selection */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setType('image')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      type === 'image'
                        ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <Image className="w-5 h-5" />
                    <span className="font-medium">图片</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('video')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      type === 'video'
                        ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    <span className="font-medium">视频</span>
                  </button>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Link className="w-4 h-4" />
                    图床链接 *
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-image-host.com/image.jpg"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                  />
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <FileText className="w-4 h-4" />
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="给你的作品起个名字"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <FileText className="w-4 h-4" />
                    描述
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="添加一些描述..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                  />
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Tag className="w-4 h-4" />
                    标签
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="用逗号或空格分隔标签，如：风景, 旅行, 自然"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 transition-all"
                >
                  添加媒体
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
