import { motion } from 'framer-motion';
import { Sparkles, Image, Video, Share2 } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-600/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            支持图床链接分享
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            分享你的
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {' '}精彩瞬间
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            通过图床链接轻松分享你的照片和视频，打造属于你的媒体收藏库
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
                <Image className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">图片分享</h3>
              <p className="text-slate-400 text-sm">支持各种图床链接</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-3">
                <Video className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">视频分享</h3>
              <p className="text-slate-400 text-sm">支持视频直链播放</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">一键复制</h3>
              <p className="text-slate-400 text-sm">快速分享给朋友</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
