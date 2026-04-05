import { useState } from 'react'
import './index.css'

function App() {
  // 👇 这里放你图床里的图片链接，可无限加
  const myImages = [
    "https://by.yx520.love/file/1775127986786_1-Macchiato_-澳门ootd｜回头率超高的复古穿搭_海边-20260211172655.jpg",
    "https://by.yx520.love/file/1774950295555_1-话梅糖-没认识几天就说喜欢我_你很肤浅_但你有品-20260302182544.jpg",
    "https://by.yx520.love/file/1774886839997_剧透两张.webp",
    "https://by.yx520.love/file/1774950299853_1-话梅糖-那么_今年晚安啦_身高170__涞觅不止-20260302182334.jpg",
    "https://by.yx520.love/file/1774950301838_1-话梅糖-你不明白吗_你只需要做一个忠诚的狗狗就够-20260302182455.jpg",
    "https://by.yx520.love/file/1774886824970_剧透两张__1_.webp",
  ]

  // 点击放大查看
  const [currentPreview, setCurrentPreview] = useState<string | null>(null)

  return (
    <div className="page-container">
      {/* 背景图（来自你的图床） */}
      <div className="bg-wrap"
        style={{ backgroundImage: `url(https://by.yx520.love/file/eat/1775007789809__变身就得来个与众不同正经不过三秒.webp)` }}
      />

      <div className="content">
        {/* 头像（来自你的图床） */}
        <img
          src="https://by.yx520.love/file/1775133527913_DM_20250711194030_001.JPEG"
          alt="avatar"
          className="avatar"
        />

        <h1>我的个人主页</h1>
        <p className="bio">图片全部来自我的图床：by.yx520.love</p>

        <div className="links">
          <a href="https://by.yx520.love/" target="_blank" rel="noreferrer">
            🔗 进入图床
          </a>
          <a href="https://github.com/wyx8999" target="_blank" rel="noreferrer">
            🐙 GitHub
          </a>
        </div>

        {/* 相册墙 */}
        <div className="gallery-title">我的相册</div>
        <div className="gallery">
          {myImages.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`img-${idx}`}
              className="gallery-img"
              onClick={() => setCurrentPreview(url)}
            />
          ))}
        </div>
      </div>

      {/* 点击放大预览 */}
      {currentPreview && (
        <div className="preview" onClick={() => setCurrentPreview(null)}>
          <img src={currentPreview} alt="preview" />
        </div>
      )}
    </div>
  )
}

export default App
