import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="h-20 px-4">
        <div className="float-left pt-6">
          <h1 className="text-3xl font-bold tracking-wide">DevFlow AI</h1>
        </div>
        
        <div className="float-right pt-4">
          <button
            onClick={onProfileClick}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-lg font-medium">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;