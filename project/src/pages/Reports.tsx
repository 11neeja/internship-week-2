import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  Eye,
  Trash2,
  Share,
  BarChart3,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Report {
  id: string;
  title: string;
  type: 'classification' | 'summary' | 'analysis';
  date: string;
  status: 'completed' | 'processing' | 'failed';
  size: string;
  thumbnail: string;
  category: string;
  hazardLevel: 'low' | 'medium' | 'high';
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const reports: Report[] = [
    {
      id: '1',
      title: 'Smartphone Battery Classification',
      type: 'classification',
      date: '2024-01-15',
      status: 'completed',
      size: '2.4 MB',
      thumbnail: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'Mobile Device Battery',
      hazardLevel: 'high'
    },
    {
      id: '2',
      title: 'LED Monitor Analysis',
      type: 'analysis',
      date: '2024-01-14',
      status: 'completed',
      size: '1.8 MB',
      thumbnail: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'Display Device',
      hazardLevel: 'medium'
    },
    {
      id: '3',
      title: 'Weekly E-Waste Summary',
      type: 'summary',
      date: '2024-01-13',
      status: 'completed',
      size: '3.2 MB',
      thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'Multiple Categories',
      hazardLevel: 'low'
    },
    {
      id: '4',
      title: 'USB Cable Classification',
      type: 'classification',
      date: '2024-01-12',
      status: 'processing',
      size: '1.2 MB',
      thumbnail: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'Electronic Accessory',
      hazardLevel: 'low'
    },
    {
      id: '5',
      title: 'Laptop Component Analysis',
      type: 'analysis',
      date: '2024-01-11',
      status: 'completed',
      size: '4.1 MB',
      thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'Computer Hardware',
      hazardLevel: 'medium'
    },
    {
      id: '6',
      title: 'Monthly Impact Report',
      type: 'summary',
      date: '2024-01-10',
      status: 'failed',
      size: '0 MB',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      category: 'System Report',
      hazardLevel: 'low'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'eco';
      case 'processing': return 'coral';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const getHazardColor = (level: string) => {
    switch (level) {
      case 'low': return 'eco';
      case 'medium': return 'coral';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'classification': return <FileText className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'summary': return <PieChart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleDownload = (reportId: string, title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  const handleView = (reportId: string) => {
    toast.success('Opening report preview...');
  };

  const handleShare = (reportId: string) => {
    toast.success('Report link copied to clipboard!');
  };

  const handleDelete = (reportId: string) => {
    toast.success('Report deleted successfully');
  };

  const generateReport = (type: string) => {
    toast.success(`Generating ${type} report...`);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Classification <span className="bg-gradient-to-r from-eco-600 to-purple-600 bg-clip-text text-transparent">Reports</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                View, download, and manage your e-waste classification reports
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => generateReport('PDF')}
                className="px-4 py-2 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-lg hover:from-coral-600 hover:to-coral-700 transition-all duration-200 flex items-center shadow-lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate PDF
              </button>
              <button
                onClick={() => generateReport('Excel')}
                className="px-4 py-2 bg-gradient-to-r from-eco-500 to-eco-600 text-white rounded-lg hover:from-eco-600 hover:to-eco-700 transition-all duration-200 flex items-center shadow-lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Export Excel
              </button>
              <button
                onClick={() => generateReport('PowerPoint')}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center shadow-lg"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Create PPT
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-eco-500 focus:outline-none transition-all"
              />
            </div>

            {/* Filter by Type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-eco-500 focus:outline-none appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Types</option>
                <option value="classification">Classification</option>
                <option value="analysis">Analysis</option>
                <option value="summary">Summary</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-eco-500 focus:outline-none appearance-none cursor-pointer min-w-[120px]"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={report.thumbnail}
                  alt={report.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(report.status)}-100 text-${getStatusColor(report.status)}-800 backdrop-blur-sm`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  {getTypeIcon(report.type)}
                </div>

                {/* Hazard Level */}
                <div className={`absolute bottom-4 left-4 px-2 py-1 rounded-full text-xs font-medium bg-${getHazardColor(report.hazardLevel)}-500 text-white`}>
                  {report.hazardLevel.toUpperCase()} RISK
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {report.category}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                  <span>{report.size}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleView(report.id)}
                      className="p-2 bg-eco-100 text-eco-600 rounded-lg hover:bg-eco-200 transition-colors"
                      title="View Report"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(report.id)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                      title="Share Report"
                    >
                      <Share className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(report.id)}
                      className="p-2 bg-coral-100 text-coral-600 rounded-lg hover:bg-coral-200 transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {report.status === 'completed' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(report.id, report.title)}
                      className="px-4 py-2 bg-gradient-to-r from-eco-500 to-teal-500 text-white rounded-lg hover:from-eco-600 hover:to-teal-600 transition-all duration-200 flex items-center text-sm font-medium shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Reports Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start classifying e-waste to generate your first report.'
              }
            </p>
            {!searchTerm && filterType === 'all' && (
              <button
                onClick={() => window.location.href = '/classify'}
                className="px-6 py-3 bg-gradient-to-r from-eco-500 to-teal-500 text-white rounded-lg hover:from-eco-600 hover:to-teal-600 transition-all duration-200 font-medium shadow-lg"
              >
                Start Classifying
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reports;