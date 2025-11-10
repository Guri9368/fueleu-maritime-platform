import React, { useState } from 'react';
import { RoutesTab } from '../components/RoutesTab';
import { CompareTab } from '../components/CompareTab';
import { BankingTab } from '../components/BankingTab';
import { PoolingTab } from '../components/PoolingTab';

type TabName = 'routes' | 'compare' | 'banking' | 'pooling';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('routes');

  const tabs = [
    { name: 'routes', label: 'Routes', icon: '🚢' },
    { name: 'compare', label: 'Compare', icon: '📊' },
    { name: 'banking', label: 'Banking', icon: '🏦' },
    { name: 'pooling', label: 'Pooling', icon: '🤝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Header with Gradient */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-white opacity-10 rounded-full animate-blob"></div>
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-white opacity-10 rounded-full animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="animate-bounce-slow">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight animate-fade-in">
              FuelEU Maritime Compliance Platform
            </h1>
          </div>
          <p className="text-blue-100 text-lg animate-fade-in-delay">
            Manage routes, compliance, banking, and pooling with ease
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl mb-8 border border-white/20 animate-slide-up">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-6" aria-label="Tabs">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name as TabName)}
                  className={`
                    group relative py-4 px-6 font-semibold text-sm transition-all duration-300
                    hover:scale-105 transform
                    ${
                      activeTab === tab.name
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-blue-500'
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </div>
                  
                  {/* Animated Underline */}
                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
                      transition-all duration-300 rounded-full
                      ${activeTab === tab.name ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                    `}
                  ></div>
                  
                  {/* Hover Effect */}
                  {activeTab !== tab.name && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content with Fade Animation */}
        <div className="animate-fade-in">
          {activeTab === 'routes' && <RoutesTab />}
          {activeTab === 'compare' && <CompareTab />}
          {activeTab === 'banking' && <BankingTab />}
          {activeTab === 'pooling' && <PoolingTab />}
        </div>
      </div>
    </div>
  );
};
