import React, { useState } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

interface PromptLog {
  id: string;
  funnelStage: 'TOFU' | 'MOFU' | 'BOFU' | 'EVFU';
  model: 'ChatGPT' | 'Claude' | 'Gemini';
  prompt: string;
  status: 'completed' | 'failed' | 'pending';
  timestamp: string;
  brand: string;
  response?: string;
  executionTime?: number;
}

const PromptLogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLog, setSelectedLog] = useState<PromptLog | null>(null);

  // Mock data
  const logs: PromptLog[] = [
    {
      id: '1',
      funnelStage: 'TOFU',
      model: 'ChatGPT',
      prompt: 'What are the best project management tools for small teams?',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      brand: 'TechCorp',
      response: 'There are several excellent project management tools for small teams...',
      executionTime: 1.2
    },
    {
      id: '2',
      funnelStage: 'MOFU',
      model: 'Claude',
      prompt: 'Compare TechCorp vs competitors for enterprise solutions',
      status: 'completed',
      timestamp: '2024-01-15T09:15:00Z',
      brand: 'TechCorp',
      response: 'When comparing enterprise solutions, TechCorp offers...',
      executionTime: 2.1
    },
    {
      id: '3',
      funnelStage: 'BOFU',
      model: 'Gemini',
      prompt: 'What are TechCorp pricing plans and which one is best for startups?',
      status: 'failed',
      timestamp: '2024-01-15T08:45:00Z',
      brand: 'TechCorp',
      executionTime: 0.8
    },
    {
      id: '4',
      funnelStage: 'EVFU',
      model: 'ChatGPT',
      prompt: 'How to integrate TechCorp with existing workflows?',
      status: 'pending',
      timestamp: '2024-01-15T11:00:00Z',
      brand: 'TechCorp'
    },
    {
      id: '5',
      funnelStage: 'TOFU',
      model: 'Claude',
      prompt: 'What are the benefits of digital health platforms?',
      status: 'completed',
      timestamp: '2024-01-15T07:30:00Z',
      brand: 'HealthPlus',
      response: 'Digital health platforms provide numerous benefits...',
      executionTime: 1.8
    }
  ];

  const getStageColor = (stage: string) => {
    const colors = {
      TOFU: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      MOFU: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      BOFU: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      EVFU: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModel = selectedModel === 'all' || log.model === selectedModel;
    const matchesStage = selectedStage === 'all' || log.funnelStage === selectedStage;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    
    return matchesSearch && matchesModel && matchesStage && matchesStatus;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const DetailModal: React.FC<{ log: PromptLog; onClose: () => void }> = ({ log, onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
        <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prompt Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(log.funnelStage)}`}>
                {log.funnelStage}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{log.model}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                {log.status}
              </span>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt</h4>
              <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                {log.prompt}
              </p>
            </div>
            
            {log.response && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Response</h4>
                <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md max-h-40 overflow-y-auto">
                  {log.response}
                </p>
              </div>
            )}
            
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Brand: {log.brand}</span>
              <span>Executed: {formatTimestamp(log.timestamp)}</span>
              {log.executionTime && <span>Duration: {log.executionTime}s</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prompt Execution Logs</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track and analyze AI model prompt executions across all brands
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search prompts or brands..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Models</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
            </select>

            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Stages</option>
              <option value="TOFU">TOFU</option>
              <option value="MOFU">MOFU</option>
              <option value="BOFU">BOFU</option>
              <option value="EVFU">EVFU</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {filteredLogs.length} {filteredLogs.length === 1 ? 'log' : 'logs'} found
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prompt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(log.funnelStage)}`}>
                      {log.funnelStage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {log.model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-md">
                    <div className="truncate" title={log.prompt}>
                      {log.prompt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {log.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No logs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <DetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
};

export default PromptLogPage;