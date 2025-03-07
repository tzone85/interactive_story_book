import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ReaderSelection from './components/ReaderSelection';
import StoryLibrary from './components/StoryLibrary';
import StoryReader from './components/StoryReader';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Routes>
          <Route path="/" element={<ReaderSelection />} />
          <Route path="/library" element={<StoryLibrary />} />
          <Route path="/story/:storyId" element={<StoryReader />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;