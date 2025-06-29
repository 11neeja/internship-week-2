import React from 'react';
import { motion } from 'framer-motion';
import { Award, BarChart3, Camera, Trophy, Star, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const achievements = [
    { 
      id: 'newbie', 
      name: 'Eco Newbie', 
      description: 'Classify your first item', 
      icon: <Star className="w-6 h-6" />,
      unlocked: true,
      color: 'eco'
    },
    { 
      id: 'warrior', 
      name: 'Eco Warrior', 
      description: 'Classify 10 items', 
      icon: <Award className="w-6 h-6" />,
      unlocked: false,
      color: 'purple'
    },
    { 
      id: 'hero', 
      name: 'Eco Hero', 
      description: 'Classify 25+ items', 
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      color: 'coral'
    }
  ];

  const stats = [
    { label: 'Items Classified', value: '12', icon: <Camera className="w-6 h-6" />, color: 'eco' },
    { label: 'Hazards Detected', value: '3', icon: <Target className="w-6 h-6" />, color: 'coral' },
    { label: 'Reports Generated', value: '8', icon: <BarChart3 className="w-6 h-6" />, color: 'purple' },
    { label: 'Achievement Score', value: '250', icon: <Trophy className="w-6 h-6" />, color: 'primary' },
  ];

  const recentClassifications = [
    { 
      id: 1, 
      item: 'Smartphone Battery', 
      category: 'Mobile Device Battery',
      date: '2024-01-15',
      risk: 'high',
      hazards: ['Lithium', 'Cobalt']
    },
    { 
      id: 2, 
      item: 'LED Monitor', 
      category: 'Display Device',
      date: '2024-01-14',
      risk: 'medium',
      hazards: ['Mercury (trace)', 'Lead']
    },
    { 
      id: 3, 
      item: 'USB Cable', 
      category: 'Electronic Accessory',
      date: '2024-01-13',
      risk: 'low',
      hazards: []
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'eco';
      case 'medium': return 'coral';
      case 'high': return 'red';
      default: return 'gray';
    }
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-eco-600 to-purple-600 bg-clip-text text-transparent">{user?.name}!</span>
          </h1>
          <p className="text-lg text-gray-600">
            Track your environmental impact and achievements
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 mb-4`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-eco-600" />
              Achievements
            </h2>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? `border-${achievement.color}-200 bg-${achievement.color}-50`
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      achievement.unlocked
                        ? `bg-${achievement.color}-100 text-${achievement.color}-600`
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="ml-auto">
                        <div className="w-8 h-8 bg-eco-500 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress to next achievement */}
            <div className="mt-6 p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-900 mb-2">Next Achievement</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-700">Eco Warrior Progress</span>
                <span className="text-sm font-medium text-purple-900">12/10</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-xs text-purple-600 mt-1">Achievement unlocked! 🎉</p>
            </div>
          </motion.div>

          {/* Recent Classifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
              Recent Classifications
            </h2>
            
            <div className="space-y-4">
              {recentClassifications.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.item}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${getRiskColor(item.risk)}-100 text-${getRiskColor(item.risk)}-800`}>
                      {item.risk} risk
                    </div>
                  </div>
                  
                  {item.hazards.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {item.hazards.map((hazard, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {hazard}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full bg-gradient-to-r from-eco-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-eco-600 hover:to-purple-600 transition-all duration-200">
                View All Classifications
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;