import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { readers } from '../data/readers';
import { UserCircle } from 'lucide-react';

const ReaderSelection = () => {
  const navigate = useNavigate();
  const setCurrentReader = useAppStore((state) => state.setCurrentReader);

  const handleReaderSelect = (readerId: string) => {
    const reader = readers.find((r) => r.id === readerId);
    if (reader) {
      setCurrentReader(reader);
      navigate('/library');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
        Who's Reading Today?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {readers.map((reader) => (
          <button
            key={reader.id}
            onClick={() => handleReaderSelect(reader.id)}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
          >
            <UserCircle className="w-20 h-20 text-purple-600" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{reader.name}</h2>
              <p className="text-gray-600">{reader.age} years old</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReaderSelection;