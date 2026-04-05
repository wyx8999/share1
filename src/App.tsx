import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MediaGrid } from './components/MediaGrid';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-900">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <MediaGrid searchQuery={searchQuery} />
    </div>
  );
}

export default App;
