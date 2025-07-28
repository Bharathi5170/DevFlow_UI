import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';
import Header from './components/Header';
import FiltersPanel from './components/FiltersPanel';
import RecentProjects from './components/RecentProjects';
import AgentWorkflow from './components/AgentWorkflow';
import ReviewPage from './components/ReviewPage';

function App() {
  const [isRecentProjectsOpen, setIsRecentProjectsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'filters' | 'loading' | 'workflow' | 'review'>('filters');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['Requirement Agent', 'Design Agent']);
  const [isLoading, setIsLoading] = useState(false);

  const toggleRecentProjects = () => {
    setIsRecentProjectsOpen(!isRecentProjectsOpen);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setCurrentView('loading');
    
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('workflow');
    }, 3000);
  };

  const handleBackToFilters = () => {
    setCurrentView('filters');
  };

  const handleNavigateToReview = () => {
    setCurrentView('review');
  };

  if (currentView === 'review') {
    return (
      <ReviewPage 
        onBackToWorkflow={() => setCurrentView('workflow')}
        selectedAgents={selectedAgents}
      />
    );
  }

  if (currentView === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">Setting up your workflow...</h2>
          <p className="text-gray-400">Preparing agents for your SDLC process</p>
        </div>
      </div>
    );
  }

  if (currentView === 'workflow') {
    return (
      <AgentWorkflow 
        selectedAgents={selectedAgents}
        onBackToFilters={handleBackToFilters}
        onNavigateToReview={handleNavigateToReview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header onProfileClick={() => console.log('Profile clicked')} />
      
      <main className="px-4 sm:px-6 lg:px-8 py-0">
        <div className="max-w-7xl mx-auto">
          <div className={`min-h-[calc(100vh-80px)] transition-all duration-500 ${
            isRecentProjectsOpen ? 'grid grid-cols-3 gap-6' : 'flex justify-center'
          }`}>
            {/* Filters Panel */}
            <div className={`${
              isRecentProjectsOpen ? 'col-span-2' : 'w-full'
            } transition-all duration-500`}>
                <FiltersPanel 
                  selectedAgents={selectedAgents}
                  setSelectedAgents={setSelectedAgents}
                  onSearch={handleSearch}
                />
            </div>
            
            {/* Recent Projects Panel - Integrated */}
            {isRecentProjectsOpen && (
              <div className="col-span-1">
                <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 h-full overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Clock size={20} className="text-blue-500" />
                      <h3 className="text-xl font-bold text-white">Recent Projects</h3>
                    </div>
                    <button
                      onClick={() => setIsRecentProjectsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-6 h-[calc(100%-80px)] overflow-hidden">
                    <div className="space-y-4">
                      {[
                        { name: 'E-commerce Platform', type: 'Web Application', date: '2 days ago', status: 'completed' },
                        { name: 'Blog CMS System', type: 'Content Management', date: '5 days ago', status: 'completed' },
                        { name: 'Microservice Gateway', type: 'API Gateway', date: '1 week ago', status: 'completed' },
                        { name: 'Real-time Chat App', type: 'Mobile App', date: '1 week ago', status: 'completed' },
                        { name: 'Task Manager Pro', type: 'Productivity Tool', date: '2 weeks ago', status: 'completed' },
                        { name: 'Analytics Dashboard', type: 'Data Visualization', date: '3 weeks ago', status: 'completed' }
                      ].map((project, index) => (
                        <div
                          key={index}
                          className="group p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-800 cursor-pointer transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-white group-hover:text-blue-400 transition-colors duration-200">
                                {project.name}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-400">{project.type}</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-400">{project.date}</span>
                                <div className={`w-2 h-2 rounded-full ${
                                  project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                              </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <button className="w-full text-center text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors duration-200">
                        View All Projects
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Recent Projects Toggle Button */}
          {!isLoading && !isRecentProjectsOpen && (
            <div className="fixed top-32 right-8 z-20">
              <button
                onClick={toggleRecentProjects}
                className="bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
                title="Recent Projects"
              >
                <div className="flex flex-col items-center space-y-2">
                  <Clock size={20} className="text-gray-300 transition-colors duration-200" />
                  <span className="text-xs font-medium text-gray-300 transition-colors duration-200">
                    Recent
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;