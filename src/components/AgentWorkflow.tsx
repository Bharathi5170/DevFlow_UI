import React from 'react';
import { ArrowLeft, Settings, Code, Plus, Briefcase, TestTube, Rocket, Monitor, ArrowRight } from 'lucide-react';
import AgentDrawer from './AgentDrawer';

interface AgentWorkflowProps {
  selectedAgents: string[];
  onBackToFilters: () => void;
  onNavigateToReview: () => void;
  onNavigateToEditor: () => void;
}

const AgentWorkflow: React.FC<AgentWorkflowProps> = ({ selectedAgents, onBackToFilters, onNavigateToReview, onNavigateToEditor }) => {
  const [selectedAgent, setSelectedAgent] = React.useState<string | null>(null);
  const [agentStatuses, setAgentStatuses] = React.useState<{[key: string]: 'pending' | 'running' | 'completed' | 'failed'}>({});
  const [currentActiveAgent, setCurrentActiveAgent] = React.useState<string | null>(null);
  const [agentData, setAgentData] = React.useState<{[key: string]: any}>({});

  React.useEffect(() => {
    // Initialize all agents as pending
    const initialStatuses: {[key: string]: 'pending' | 'running' | 'completed' | 'failed'} = {};
    selectedAgents.forEach(agent => {
      initialStatuses[agent] = 'pending';
    });
    setAgentStatuses(initialStatuses);
    
    // Set first agent as active with white glow
    if (selectedAgents.length > 0) {
      setCurrentActiveAgent(selectedAgents[0]);
    }
  }, [selectedAgents]);

  // Define SDLC sequence
  const sdlcSequence = [
    'Requirement Agent',
    'Design Agent', 
    'Dev Agent',
    'Test Agent',
    'Deploy Agent',
    'Monitor Agent'
  ];

  // Sort selected agents according to SDLC sequence
  const sortedAgents = selectedAgents.sort((a, b) => {
    return sdlcSequence.indexOf(a) - sdlcSequence.indexOf(b);
  });

  const getAgentColor = (agentName: string) => {
    switch (agentName) {
      case 'Requirement Agent':
        return 'bg-blue-600';
      case 'Design Agent':
        return 'bg-purple-600';
      case 'Dev Agent':
        return 'bg-green-600';
      case 'Test Agent':
        return 'bg-yellow-600';
      case 'Deploy Agent':
        return 'bg-red-600';
      case 'Monitor Agent':
        return 'bg-indigo-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getAgentIcon = (agentName: string) => {
    switch (agentName) {
      case 'Requirement Agent':
        return <Settings size={24} className="text-white" />;
      case 'Design Agent':
        return <Code size={24} className="text-white" />;
      case 'Dev Agent':
        return <Briefcase size={24} className="text-white" />;
      case 'Test Agent':
        return <TestTube size={24} className="text-white" />;
      case 'Deploy Agent':
        return <Rocket size={24} className="text-white" />;
      case 'Monitor Agent':
        return <Monitor size={24} className="text-white" />;
      default:
        return <Settings size={24} className="text-white" />;
    }
  };

  const getGlowClass = (agentName: string) => {
    const status = agentStatuses[agentName];
    const isActive = currentActiveAgent === agentName;
    
    // Return underline color classes instead of glow
    if (status === 'completed') {
      return 'border-green-500';
    } else if (status === 'running') {
      return 'border-yellow-500';
    } else if (status === 'failed') {
      return 'border-red-500';
    } else if (isActive) {
      return 'border-white';
    }
    return 'border-transparent';
  };

  const handleAgentClick = (agentName: string) => {
    setSelectedAgent(agentName);
  };

  const handleCloseModal = () => {
    setSelectedAgent(null);
  };

  const handleAgentStatusChange = (agentName: string, status: 'running' | 'completed' | 'failed') => {
    setAgentStatuses(prev => ({
      ...prev,
      [agentName]: status
    }));
    
    // If completed, move to next agent automatically
    if (status === 'completed') {
      const currentIndex = sortedAgents.indexOf(agentName);
      if (currentIndex < sortedAgents.length - 1) {
        const nextAgent = sortedAgents[currentIndex + 1];
        setCurrentActiveAgent(nextAgent);
        
        // Auto-open next agent drawer with data from previous step
        setTimeout(() => {
          setSelectedAgent(nextAgent);
        }, 1000);
      } else {
        setCurrentActiveAgent(null); // All completed
      }
    }
  };

  const handleDataUpdate = (agentName: string, data: any) => {
    setAgentData(prev => ({
      ...prev,
      [agentName]: data
    }));
  };

  const getPreviousAgent = (currentAgent: string): string | null => {
    const currentIndex = sortedAgents.indexOf(currentAgent);
    return currentIndex > 0 ? sortedAgents[currentIndex - 1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
        <div className="h-20 px-4">
          <div className="float-left pt-4">
            <button
              onClick={onBackToFilters}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="text-lg font-medium">Back to Filters</span>
            </button>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 pt-6">
            <h1 className="text-3xl font-bold tracking-wide">Agent Workflow</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)] flex items-center justify-center relative">
        <div className="w-full max-w-6xl">
          <div className="hidden md:flex justify-center items-center gap-8">
            {sortedAgents.map((agentName, index) => (
              <React.Fragment key={index}>
                {/* Agent Card */}
                <div className="relative flex flex-col items-center">
                  {/* Agent Card with Underline */}
                  <div className="relative">
                    {/* Agent Card */}
                    <div 
                      onClick={() => handleAgentClick(agentName)}
                      className={`${getAgentColor(agentName)} rounded-lg p-3 w-24 h-24 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer border-b-4 ${getGlowClass(agentName)}`}
                    >
                      
                      {/* Agent Icon */}
                      <div className="mb-1">
                        {getAgentIcon(agentName)}
                      </div>
                      
                      {/* Agent Name */}
                      <h3 className="text-white text-xs font-bold text-center leading-tight">
                        {agentName.replace(' Agent', '')}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Simple Connection Line */}
                {index < sortedAgents.length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-400"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Vertical Connection Layout for smaller screens */}
          <div className="md:hidden flex flex-col items-center gap-4">
            {sortedAgents.map((agentName, index) => (
              <React.Fragment key={index}>
                {/* Agent Card */}
                <div className="relative flex flex-col items-center">
                  {/* Agent Card with Underline */}
                  <div className="relative">
                    {/* Agent Card */}
                    <div 
                      onClick={() => handleAgentClick(agentName)}
                      className={`${getAgentColor(agentName)} rounded-lg p-3 w-24 h-24 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer border-b-4 ${getGlowClass(agentName)}`}
                    >
                      
                      {/* Agent Icon */}
                      <div className="mb-1">
                        {getAgentIcon(agentName)}
                      </div>
                      
                      {/* Agent Name */}
                      <h3 className="text-white text-xs font-bold text-center leading-tight">
                      {agentName.replace(' Agent', '')}
                    </h3>
                    </div>
                  </div>
                </div>
                
                {/* Vertical Connection Line */}
                {index < sortedAgents.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-400"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-lg">
              Selected {selectedAgents.length} agent{selectedAgents.length !== 1 ? 's' : ''} for your SDLC workflow
            </p>
            <div className="flex justify-center items-center space-x-4 mt-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-1 bg-white"></div>
                <span className="text-gray-400">Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-1 bg-yellow-500"></div>
                <span className="text-gray-400">Running</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-1 bg-green-500"></div>
                <span className="text-gray-400">Completed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-1 bg-red-500"></div>
                <span className="text-gray-400">Failed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Agent Drawer */}
      <AgentDrawer
        isOpen={selectedAgent !== null}
        onClose={handleCloseModal}
        agentName={selectedAgent || ''}
        agentColor={selectedAgent ? getAgentColor(selectedAgent) : ''}
        onNavigateToReview={onNavigateToReview}
        onNavigateToEditor={onNavigateToEditor}
        onStatusChange={handleAgentStatusChange}
        onDataUpdate={handleDataUpdate}
        previousAgentData={selectedAgent ? agentData[getPreviousAgent(selectedAgent)] : null}
      />
    </div>
  );
};

export default AgentWorkflow;