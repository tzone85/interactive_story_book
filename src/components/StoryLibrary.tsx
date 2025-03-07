import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Book } from 'lucide-react';
import { stories } from '../data/stories';

const StoryLibrary = () => {
  const navigate = useNavigate();
  const currentReader = useAppStore((state) => state.currentReader);

  if (!currentReader) {
    navigate('/');
    return null;
  }

  const recommendedStories = stories.filter(
    story => 
      currentReader.age >= story.ageRange.min && 
      currentReader.age <= story.ageRange.max
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
        Welcome, {currentReader.name}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedStories.map((story) => (
          <button
            key={story.id}
            onClick={() => navigate(`/story/${story.id}`)}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <Book className="w-8 h-8 text-purple-600 mb-2" />
            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
            <p className="text-gray-600">{story.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StoryLibrary;