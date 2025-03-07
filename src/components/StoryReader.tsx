import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft } from 'lucide-react';
import { stories } from '../data/stories';

const StoryReader = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { currentReader, storyProgress, setStoryProgress } = useAppStore();

  if (!currentReader) {
    navigate('/');
    return null;
  }

  if (!storyId) {
    navigate('/library');
    return null;
  }

  const story = stories.find(s => s.id === storyId);
  if (!story) {
    navigate('/library');
    return null;
  }

  const currentSceneId = storyProgress?.storyId === storyId
    ? storyProgress.currentSceneId
    : story.firstSceneId;
    
  const currentScene = story.scenes[currentSceneId];
  
  if (!currentScene) {
    setStoryProgress({
      storyId,
      currentSceneId: story.firstSceneId,
      choices: []
    });
    return null;
  }

  const handleChoice = (nextSceneId: string) => {
    if (!story.scenes[nextSceneId]) {
      console.error(`Invalid scene ID: ${nextSceneId}`);
      return;
    }
    setStoryProgress({
      storyId,
      currentSceneId: nextSceneId,
      choices: storyProgress?.storyId === storyId
        ? [...(storyProgress.choices || []), currentSceneId]
        : [currentSceneId]
    });
  };

  const handleRestart = () => {
    setStoryProgress({
      storyId,
      currentSceneId: story.firstSceneId,
      choices: []
    });
  };

  const handleBackToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={handleBackToLibrary}
        className="flex items-center text-purple-600 mb-6 hover:text-purple-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Library
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{story.title}</h1>
        
        <div className="prose max-w-none text-lg mb-8 text-gray-700">
          {currentScene.content}
        </div>
        
        {currentScene.choices && currentScene.choices.length > 0 ? (
          <div className="mt-8 space-y-4">
            {currentScene.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.nextSceneId)}
                className="w-full p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-gray-800"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="text-xl font-semibold text-purple-800">The End</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Read Again
              </button>
              <button
                onClick={handleBackToLibrary}
                className="px-6 py-2 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
              >
                Find Another Story
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReader;