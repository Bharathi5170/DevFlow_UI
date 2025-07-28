import React, { useState } from 'react';
import { Search, Settings, Code, Briefcase, TestTube, Rocket, Monitor, X, Plus, ChevronRight, Zap, Users, Target } from 'lucide-react';

interface FiltersPanelProps {
  selectedAgents: string[];
  setSelectedAgents: (agents: string[]) => void;
  onSearch: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ selectedAgents, setSelectedAgents, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const agentTypes = [
    { 
      name: 'Requirement Agent', 
      icon: <Settings size={16} />, 
      description: 'Analyze project requirements',
      category: 'Planning',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Design Agent', 
      icon: <Code size={16} />, 
      description: 'Create UI/UX designs',
      category: 'Design',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Dev Agent', 
      icon: <Briefcase size={16} />, 
      description: 'Generate code',
      category: 'Development',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Test Agent', 
      icon: <TestTube size={16} />, 
      description: 'Execute tests',
      category: 'Quality',
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      name: 'Deploy Agent', 
      icon: <Rocket size={16} />, 
      description: 'Handle deployment',
      category: 'Operations',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'Monitor Agent', 
      icon: <Monitor size={16} />, 
      description: 'Monitor performance',
      category: 'Operations',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const availableAgents = agentTypes.filter(agent => !selectedAgents.includes(agent.name));
  const filteredSuggestions = availableAgents.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgentToggle = (agentName: string) => {
    setSelectedAgents([...selectedAgents, agentName]);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeSelectedAgent = (agentName: string) => {
    setSelectedAgents(selectedAgents.filter(name => name !== agentName));
  };

  const getSelectedAgentData = (agentName: string) => {
    return agentTypes.find(agent => agent.name === agentName);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col px-8 py-4 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-6 flex-shrink-0">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Zap size={18} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">AI-Powered SDLC</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Build Your Development Workflow
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Select AI agents to automate your software development lifecycle
          </p>
        </div>

        {/* Main Panel */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl flex flex-col h-[320px]">
          {/* Header */}
          <div className="border-b border-gray-700/50 p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">Agent Selection</h2>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Users size={18} />
                  <span>{selectedAgents.length} Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target size={18} />
                  <span>{availableAgents.length} Available</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute top-0 left-0 pl-4 h-14 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-wrap items-center min-h-[48px] w-full pl-14 pr-4 py-2 bg-gray-800/60 border border-gray-600/50 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all duration-200 relative backdrop-blur-sm">
                {/* Selected Agents Tags */}
                {selectedAgents.map((agent) => {
                  const agentData = getSelectedAgentData(agent);
                  return (
                    <div
                      key={agent}
                      className={`flex items-center space-x-2 bg-gradient-to-r ${agentData?.color || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-lg text-sm mr-2 mb-1 shadow-lg backdrop-blur-sm`}
                    >
                      {agentData?.icon}
                      <span className="font-medium">{agent.replace(' Agent', '')}</span>
                      <button
                        onClick={() => removeSelectedAgent(agent)}
                        className="text-white/70 hover:text-white transition-colors duration-200"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
                
                {/* Search Input */}
                <div className="flex-1 flex items-center min-w-0">
                  <input
                    type="text"
                    placeholder={selectedAgents.length > 0 ? "" : "Search agents..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                  />
                </div>
              </div>
              
              {/* Professional Grid Suggestions - NO SCROLLBAR */}
              {showSuggestions && availableAgents.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-2xl z-[60]">
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Available Agents</h3>
                    {/* Dynamic Grid Layout - Single column for 3 or fewer agents */}
                    <div className={`grid gap-3 ${(searchTerm === '' ? availableAgents : filteredSuggestions).length <= 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {(searchTerm === '' ? availableAgents : filteredSuggestions).map((agent, index) => (
                        <div
                          key={index}
                          onMouseDown={() => handleAgentToggle(agent.name)}
                          className="group flex items-center space-x-3 p-3 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-600/50"
                        >
                          <div className={`w-10 h-10 bg-gradient-to-r ${agent.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                            {agent.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors duration-200 truncate">
                              {agent.name}
                            </h4>
                            <p className="text-gray-400 text-xs truncate">{agent.description}</p>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded text-center whitespace-nowrap">
                            {agent.category}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* No results message */}
                    {searchTerm !== '' && filteredSuggestions.length === 0 && (
                      <div className="text-center py-8">
                        <Search size={24} className="mx-auto mb-3 text-gray-500" />
                        <p className="text-gray-400 text-sm">No agents found matching "{searchTerm}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Agents Preview */}
          {selectedAgents.length > 0 && !showSuggestions && (
            <div className="p-3 border-b border-gray-700/50 flex-shrink-0 bg-gray-800/30">
              <h3 className="text-base font-semibold text-white mb-2">Selected Workflow</h3>
              <div className="flex items-center justify-center space-x-4">
                {selectedAgents.map((agentName, index) => {
                  const agentData = getSelectedAgentData(agentName);
                  return (
                    <React.Fragment key={index}>
                      <div className="mb-1">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-8 h-8 bg-gradient-to-r ${agentData?.color || 'from-gray-500 to-gray-600'} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                          {React.cloneElement(agentData?.icon || <Settings size={14} />, { size: 14 })}
                        </div>
                        <h3 className="text-white text-xs font-bold text-center leading-tight">
                          {agentName.replace(' Agent', '')}
                        </h3>
                      </div>
                      </div>
                      {index < selectedAgents.length - 1 && (
                        <ChevronRight size={12} className="text-gray-500 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="p-3 flex-1 flex flex-col justify-center min-h-0">
            {selectedAgents.length > 0 && !showSuggestions ? (
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={onSearch}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-3"
                >
                  <Zap size={18} />
                  <span>Start AI Workflow</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ) : !showSuggestions ? (
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Plus size={20} className="text-gray-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-300 mb-1">No Agents Selected</h3>
                <p className="text-gray-500 text-xs">
                  Search and select AI agents above to build your workflow
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Search size={20} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-300 mb-1">Select Agents</h3>
                <p className="text-gray-500 text-xs">
                  Choose from the available agents above to continue
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Start Templates */}
        {!showSuggestions && (
        <div className="mt-4 text-center transition-opacity duration-200 flex-shrink-0 relative z-10">
          <p className="text-gray-500 text-sm mb-3">Quick Start Templates</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setSelectedAgents(['Requirement Agent', 'Design Agent', 'Dev Agent'])}
              className="px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 rounded-lg text-xs transition-colors border border-gray-700/50 backdrop-blur-sm"
            >
              Frontend Development
            </button>
            <button 
              onClick={() => setSelectedAgents(['Requirement Agent', 'Dev Agent', 'Test Agent', 'Deploy Agent'])}
              className="px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 rounded-lg text-xs transition-colors border border-gray-700/50 backdrop-blur-sm"
            >
              Full Stack Development
            </button>
            <button 
              onClick={() => setSelectedAgents(agentTypes.map(a => a.name))}
              className="px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 rounded-lg text-xs transition-colors border border-gray-700/50 backdrop-blur-sm"
            >
              Complete SDLC
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default FiltersPanel;