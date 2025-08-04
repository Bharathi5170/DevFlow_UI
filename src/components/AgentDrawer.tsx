import React, { useState } from 'react';
import { X, Upload, FileText, Eye, Settings, CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface AgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentColor: string;
  onNavigateToReview: () => void;
  onNavigateToEditor: () => void;
  onStatusChange: (agentName: string, status: 'running' | 'completed' | 'failed') => void;
  onDataUpdate: (agentName: string, data: any) => void;
  previousAgentData: any;
}

interface Operation {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  icon: React.ReactNode;
}

const AgentDrawer: React.FC<AgentDrawerProps> = ({ 
  isOpen, 
  onClose, 
  agentName, 
  agentColor, 
  onNavigateToReview, 
  onNavigateToEditor,
  onStatusChange,
  onDataUpdate,
  previousAgentData
}) => {
  const [projectName, setProjectName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [documentContent, setDocumentContent] = useState('');
  const [isOperationRunning, setIsOperationRunning] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Check if this is the Requirement Agent (first in workflow)
  const isRequirementAgent = agentName === 'Requirement Agent';

  // Auto-populate from previous agent data
  React.useEffect(() => {
    if (previousAgentData && isOpen && !isRequirementAgent) {
      setProjectName(previousAgentData.projectName || '');
      if (previousAgentData.generatedDocument) {
        // Create a virtual file from previous agent's output
        const blob = new Blob([previousAgentData.generatedDocument], { type: 'application/pdf' });
        const file = new File([blob], `${agentName}_input.pdf`, { type: 'application/pdf' });
        setSelectedFile(file);
        setDocumentContent(previousAgentData.generatedDocument);
      }
    }
  }, [previousAgentData, isOpen, agentName, isRequirementAgent]);
  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      // Simulate reading file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setDocumentContent(content || `# ${file.name}

This is a preview of your uploaded document.

## Document Details
- File Name: ${file.name}
- File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
- File Type: ${file.type || 'Unknown'}

## Content Preview
This document contains the business requirements and specifications for your project. The content will be analyzed by the ${agentName} to generate the appropriate outputs for your SDLC workflow.

### Key Sections
1. Project Overview
2. Functional Requirements
3. Non-Functional Requirements
4. Technical Specifications
5. Acceptance Criteria

The document processing will begin once you click the Generate button.`);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('Please upload only PDF or DOCX files.');
    }
  };

  const isValidFileType = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return allowedTypes.includes(file.type) || file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx');
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      // Simulate reading file content (same as above)
      setDocumentContent(`# ${file.name}

This is a preview of your uploaded document.

## Document Details
- File Name: ${file.name}
- File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

## Content Preview
This document contains the business requirements and specifications for your project.`);
    } else if (file) {
      alert('Please upload only PDF or DOCX files.');
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const getOperationsForAgent = (agentName: string): Operation[] => {
    switch (agentName) {
      case 'Requirement Agent':
        return [
          {
            id: '1',
            title: 'Analyze Requirements',
            description: 'Parse and analyze project requirements',
            status: 'pending',
            icon: <FileText size={20} />
          },
          {
            id: '2',
            title: 'Generate User Stories',
            description: 'Create user stories from requirements',
            status: 'pending',
            icon: <Settings size={20} />
          },
          {
            id: '3',
            title: 'Validate Acceptance Criteria',
            description: 'Validate acceptance criteria completeness',
            status: 'pending',
            icon: <CheckCircle size={20} />
          },
          {
            id: '4',
            title: 'Requirements Documentation',
            description: 'Generate comprehensive requirements document',
            status: 'pending',
            icon: <FileText size={20} />
          }
        ];
      case 'Design Agent':
        return [
          {
            id: '1',
            title: 'UI/UX Analysis',
            description: 'Analyze design requirements and user flow',
            status: 'pending',
            icon: <Settings size={20} />
          },
          {
            id: '2',
            title: 'Create Wireframes',
            description: 'Generate wireframes and mockups',
            status: 'pending',
            icon: <FileText size={20} />
          },
          {
            id: '3',
            title: 'Design System',
            description: 'Create design system and components',
            status: 'pending',
            icon: <Settings size={20} />
          }
        ];
      default:
        return [
          {
            id: '1',
            title: 'Initialize Process',
            description: 'Setting up agent workflow',
            status: 'pending',
            icon: <Settings size={20} />
          },
          {
            id: '2',
            title: 'Execute Tasks',
            description: 'Running agent-specific operations',
            status: 'pending',
            icon: <Play size={20} />
          }
        ];
    }
  };

  const handleGenerate = () => {
    if ((isRequirementAgent && projectName.trim() && selectedFile) || (!isRequirementAgent && previousAgentData)) {
      setShowOperations(true);
      setIsOperationRunning(true);
      onStatusChange(agentName, 'running');
      
      const ops = getOperationsForAgent(agentName);
      setOperations(ops);
      
      // Simulate operations running
      const runOperations = async () => {
        for (let i = 0; i < ops.length; i++) {
          // Set current operation to running
          setOperations(prev => prev.map((op, index) => 
            index === i ? { ...op, status: 'running' } : op
          ));
          
          // Wait for random time (1-3 seconds)
          await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
          
          // Set to completed (always success)
          setOperations(prev => prev.map((op, index) => 
            index === i ? { ...op, status: 'completed' } : op
          ));
        }
        
        // All operations completed successfully
        setIsOperationRunning(false);
        onStatusChange(agentName, 'completed');
        // Save agent data for next step
        const agentData = {
          projectName: isRequirementAgent ? projectName : previousAgentData?.projectName,
          originalDocument: isRequirementAgent ? documentContent : previousAgentData?.generatedDocument,
          generatedDocument: `Generated output from ${agentName} for project: ${projectName}`
        };
        onDataUpdate(agentName, agentData);
      };
      
      // Start operations after a short delay
      setTimeout(runOperations, 500);
    }
  };

  const handleTerminate = () => {
    setIsOperationRunning(false);
    setOperations(prev => prev.map(op => 
      op.status === 'running' ? { ...op, status: 'pending' } : op
    ));
    onStatusChange(agentName, 'pending');
    
    // Reset everything the agent has done
    setShowOperations(false);
    setOperations([]);
    setProjectName('');
    setSelectedFile(null);
    setDocumentContent('');
    
    // Clear agent data
    onDataUpdate(agentName, null);
  };
  const handleCloseOperations = () => {
    setShowOperations(false);
    onStatusChange(agentName, 'completed');
    onNavigateToReview();
    // Reset form
    setProjectName('');
    setSelectedFile(null);
    setDocumentContent('');
    setIsOperationRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'running':
        return <Play size={20} className="text-blue-500 animate-pulse" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'running':
        return 'border-blue-500';
      default:
        return 'border-gray-600';
    }
  };

  const isGenerateEnabled = projectName.trim() && selectedFile;
  const allCompleted = operations.length > 0 && operations.every(op => op.status === 'completed');

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {!showOperations ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${agentColor} rounded-lg flex items-center justify-center`}>
                  <FileText size={16} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{agentName}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            {isRequirementAgent ? (
              // Show input form only for Requirement Agent
              <div className="p-6 space-y-6">
                {/* Project Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter your project name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Upload Document
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                        : selectedFile
                        ? 'border-green-500 bg-green-500 bg-opacity-10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {selectedFile ? (
                      <div className="flex flex-col items-center space-y-3">
                        <FileText size={32} className="text-green-500" />
                        <p className="text-green-400 font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-3">
                        <Upload size={32} className="text-gray-400" />
                        <p className="text-gray-300 font-medium">
                          Drop your document here
                        </p>
                        <p className="text-sm text-gray-400">
                          or click to browse (PDF, DOCX only)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Show data from previous agent for other agents
              <div className="p-6 space-y-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-3">Input from Previous Agent</h3>
                  {previousAgentData ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-400">Project Name:</span>
                        <p className="text-white font-medium">{previousAgentData.projectName}</p>
                      </div>
                      {previousAgentData.generatedDocument && (
                        <div>
                          <span className="text-sm text-gray-400">Generated Output:</span>
                          <div className="mt-2 bg-gray-700 rounded p-3 max-h-32 overflow-y-auto">
                            <pre className="text-gray-300 text-xs whitespace-pre-wrap">
                              {previousAgentData.generatedDocument.substring(0, 200)}...
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400">No input data available. Please complete the previous agent first.</p>
                  )}
                </div>
                
                <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">
                    <strong>Note:</strong> This agent will process the output from the previous agent in the workflow.
                  </p>
                </div>
              </div>
            )}
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
              {isRequirementAgent ? (
                <button
                  onClick={handleGenerate}
                  disabled={!isGenerateEnabled}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isGenerateEnabled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Generate
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={!previousAgentData}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    previousAgentData
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Process
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Operations Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Operations</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Operations Content */}
            <div className="p-6">
              {/* Agent Info */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-white">{agentName} Operations</h3>
                </div>
                <p className="text-gray-400 text-sm">Project: {projectName}</p>
              </div>

              {/* Operations List */}
              <div className="space-y-4 mb-6">
                {operations.map((operation, index) => (
                  <div
                    key={operation.id}
                    className={`border-l-4 ${getStatusColor(operation.status)} bg-gray-800 rounded-r-lg p-4 transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-gray-300 mt-1">
                          {operation.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">
                            {operation.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {operation.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-3">
                        {getStatusIcon(operation.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Button */}
              {allCompleted && (
                <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-4 text-center mb-4">
                  <p className="text-green-300 font-medium mb-3">All operations completed successfully!</p>
                  <button
                    onClick={onNavigateToEditor}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                  >
                    <Code size={16} />
                    <span>Open Code Editor</span>
                  </button>
                </div>
              )}

              {/* Terminate Button */}
              {isOperationRunning && (
                <button 
                  onClick={handleTerminate}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
                >
                  Terminate Operation
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[70] p-4"
          onClick={handleClosePreview}
        >
          <div 
            className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Eye size={24} className="text-blue-500" />
                <h2 className="text-xl font-bold text-white">
                  Document Preview - {selectedFile?.name || 'Document'}
                </h2>
              </div>
              <button
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Preview Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-800 rounded-lg p-6">
                {documentContent ? (
                  <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {documentContent}
                  </pre>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No document content available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentDrawer;