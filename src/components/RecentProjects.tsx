import React from 'react';
import { Clock, X } from 'lucide-react';

interface RecentProjectsProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ isOpen, onClose }) => {
  const projects = [
    'E-commerce API',
    'Blog Platform',
    'Microservice Gateway',
    'Chat Application',
    'Task Manager API',
    'Analytics Dashboard'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-8 top-24 w-80 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-30">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-gray-400" />
          <h3 className="font-semibold text-white">Recent Projects</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-800 cursor-pointer transition-all duration-200"
            >
              <div className="font-medium text-white">{project}</div>
              <div className="text-xs text-gray-400 mt-1">
                Last accessed {Math.floor(Math.random() * 30) + 1} days ago
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            Showing {projects.length} projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;