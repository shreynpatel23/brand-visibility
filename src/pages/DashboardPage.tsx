import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  category: string;
  region: string;
  scores: {
    TOFU: number;
    MOFU: number;
    BOFU: number;
    EVFU: number;
  };
  sentiment: {
    trend: 'up' | 'down' | 'neutral';
    percentage: number;
    distribution: {
      positive: number;
      neutral: number;
      negative: number;
      stronglyPositive: number;
    };
  };
}

const DashboardPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Mock data
  const brands: Brand[] = [
    {
      id: '1',
      name: 'TechCorp',
      category: 'Technology',
      region: 'North America',
      scores: { TOFU: 85, MOFU: 72, BOFU: 68, EVFU: 91 },
      sentiment: { trend: 'up', percentage: 12, distribution: { positive: 45, neutral: 35, negative: 15, stronglyPositive: 5 } }
    },
    {
      id: '2',
      name: 'HealthPlus',
      category: 'Healthcare',
      region: 'Europe',
      scores: { TOFU: 78, MOFU: 81, BOFU: 75, EVFU: 83 },
      sentiment: { trend: 'down', percentage: 8, distribution: { positive: 40, neutral: 40, negative: 18, stronglyPositive: 2 } }
    },
    {
      id: '3',
      name: 'EduLearn',
      category: 'Education',
      region: 'Global',
      scores: { TOFU: 92, MOFU: 88, BOFU: 85, EVFU: 79 },
      sentiment: { trend: 'up', percentage: 15, distribution: { positive: 55, neutral: 30, negative: 10, stronglyPositive: 5 } }
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-700 dark:text-green-400';
    if (score >= 60) return 'text-yellow-700 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-700 dark:text-orange-400';
    return 'text-red-700 dark:text-red-400';
  };

  const HeatmapMatrix: React.FC<{ scores: Brand['scores'] }> = ({ scores }) => {
    const stages = ['TOFU', 'MOFU', 'BOFU', 'EVFU'] as const;
    
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Funnel Performance</div>
        <div className="grid grid-cols-4 gap-2">
          {stages.map(stage => (
            <div key={stage} className="text-center">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{stage}</div>
              <div className={`h-12 rounded-md flex items-center justify-center text-white font-semibold ${getScoreColor(scores[stage])}`}>
                {scores[stage]}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SentimentIndicator: React.FC<{ sentiment: Brand['sentiment'] }> = ({ sentiment }) => {
    const getTrendIcon = () => {
      switch (sentiment.trend) {
        case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
        case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
        default: return <Minus className="w-4 h-4 text-gray-500" />;
      }
    };

    const getTrendColor = () => {
      switch (sentiment.trend) {
        case 'up': return 'text-green-600 dark:text-green-400';
        case 'down': return 'text-red-600 dark:text-red-400';
        default: return 'text-gray-600 dark:text-gray-400';
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment</span>
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{sentiment.percentage}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="flex h-2 rounded-full overflow-hidden">
            <div className="bg-green-500" style={{ width: `${sentiment.distribution.stronglyPositive}%` }} />
            <div className="bg-green-400" style={{ width: `${sentiment.distribution.positive}%` }} />
            <div className="bg-gray-400" style={{ width: `${sentiment.distribution.neutral}%` }} />
            <div className="bg-red-400" style={{ width: `${sentiment.distribution.negative}%` }} />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Negative</span>
          <span>Positive</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Monitor your brand visibility across AI models
          </p>
        </div>
        <Link
          to="/app/brands/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Models</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Stages</option>
                <option value="TOFU">TOFU</option>
                <option value="MOFU">MOFU</option>
                <option value="BOFU">BOFU</option>
                <option value="EVFU">EVFU</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Cards */}
      {brands.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{brand.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{brand.category}</span>
                      <span>•</span>
                      <span>{brand.region}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/app/brands/${brand.id}/edit`}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Edit
                </Link>
              </div>

              <div className="space-y-4">
                <HeatmapMatrix scores={brand.scores} />
                <SentimentIndicator sentiment={brand.sentiment} />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <Link
                    to={`/app/prompt-logs?brand=${brand.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    View Logs
                  </Link>
                  <span className="text-gray-500 dark:text-gray-400">
                    Last updated: 2h ago
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No brands</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating your first brand.</p>
          <div className="mt-6">
            <Link
              to="/app/brands/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;