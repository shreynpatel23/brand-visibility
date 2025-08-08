import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, MoreHorizontal, Building2, BarChart3 } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  category: string;
  region: string;
  createdAt: string;
  lastUpdated: string;
  status: 'active' | 'paused';
  totalPrompts: number;
  avgScore: number;
}

const BrandManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Mock data
  const brands: Brand[] = [
    {
      id: '1',
      name: 'TechCorp',
      category: 'Technology',
      region: 'North America',
      createdAt: '2024-01-01T00:00:00Z',
      lastUpdated: '2024-01-15T10:30:00Z',
      status: 'active',
      totalPrompts: 127,
      avgScore: 79
    },
    {
      id: '2',
      name: 'HealthPlus',
      category: 'Healthcare',
      region: 'Europe',
      createdAt: '2024-01-05T00:00:00Z',
      lastUpdated: '2024-01-14T15:20:00Z',
      status: 'active',
      totalPrompts: 89,
      avgScore: 82
    },
    {
      id: '3',
      name: 'EduLearn',
      category: 'Education',
      region: 'Global',
      createdAt: '2024-01-10T00:00:00Z',
      lastUpdated: '2024-01-13T09:45:00Z',
      status: 'paused',
      totalPrompts: 45,
      avgScore: 86
    }
  ];

  const categories = ['Technology', 'Healthcare', 'Education', 'Finance', 'Retail'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Global'];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || brand.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const ActionMenu: React.FC<{ brand: Brand }> = ({ brand }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              <Link
                to={`/brands/${brand.id}/edit`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Brand
              </Link>
              <Link
                to={`/prompt-logs?brand=${brand.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Metrics
              </Link>
              <button
                onClick={() => {
                  // Handle delete
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Brand
              </button>
            </div>
          </div>
        )}
        
        {isOpen && (
          <div 
            className="fixed inset-0 z-5" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

  const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
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
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(brand.status)}`}>
            {brand.status}
          </span>
          <ActionMenu brand={brand} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{brand.totalPrompts}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Prompts</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getScoreColor(brand.avgScore)}`}>{brand.avgScore}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Avg Score</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(brand.lastUpdated)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Last Updated</div>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <Link
          to={`/prompt-logs?brand=${brand.id}`}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          View Logs
        </Link>
        <span className="text-gray-500 dark:text-gray-400">
          Created {formatDate(brand.createdAt)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Brand Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage all your brands and their tracking settings
          </p>
        </div>
        <Link
          to="/brands/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Link>
      </div>

      {/* Filters and Search */}
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
                placeholder="Search brands..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewMode === 'card'
                    ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                } transition-colors`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm font-medium border-l border-gray-300 dark:border-gray-600 ${
                  viewMode === 'table'
                    ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                } transition-colors`}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prompts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBrands.map(brand => (
                  <tr key={brand.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-md flex items-center justify-center mr-3">
                          <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{brand.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {brand.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {brand.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(brand.status)}`}>
                        {brand.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {brand.totalPrompts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={getScoreColor(brand.avgScore)}>{brand.avgScore}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(brand.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionMenu brand={brand} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No brands found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || selectedCategory !== 'all' || selectedRegion !== 'all' 
              ? 'Try adjusting your search criteria.'
              : 'Get started by creating your first brand.'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && selectedRegion === 'all' && (
            <div className="mt-6">
              <Link
                to="/brands/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Brand
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandManagementPage;