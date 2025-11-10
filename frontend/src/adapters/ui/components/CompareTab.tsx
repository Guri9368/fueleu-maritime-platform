import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { RouteComparison } from '../../../core/domain/types';
import { Table } from './common/Table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';

export const CompareTab: React.FC = () => {
  const { apiClient } = useApp();
  const [comparison, setComparison] = useState<RouteComparison | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const data = await apiClient.compareRoutes();
      setComparison(data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium text-lg animate-pulse">Loading comparison data...</p>
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-xl text-center animate-fade-in border border-yellow-200">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Baseline Set</h3>
        <p className="text-gray-600 text-lg">Please set a baseline route first in the Routes tab.</p>
      </div>
    );
  }

  const columns = [
    { header: 'Route ID', accessor: (row: any) => row.route.routeId },
    {
      header: 'Baseline Intensity',
      accessor: (row: any) => `${row.baselineIntensity.toFixed(2)} gCO₂e/MJ`,
    },
    {
      header: 'Comparison Intensity',
      accessor: (row: any) => `${row.comparisonIntensity.toFixed(2)} gCO₂e/MJ`,
    },
    {
      header: '% Difference',
      accessor: (row: any) => `${row.percentDiff.toFixed(2)}%`,
      className: 'font-medium',
    },
    {
      header: 'Compliant',
      accessor: (row: any) => (row.compliant ? '✅' : '❌'),
    },
  ];

  const chartData = comparison.comparisons.map((c) => ({
    routeId: c.route.routeId,
    baseline: c.baselineIntensity,
    comparison: c.comparisonIntensity,
    target: comparison.targetIntensity,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Route Comparison
          </h2>
        </div>

        {/* Baseline Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span className="font-semibold text-gray-700">Baseline Route</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{comparison.baseline.routeId}</p>
            <p className="text-sm text-gray-600 mt-1">
              {comparison.baseline.vesselType}, {comparison.baseline.fuelType}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
              <span className="font-semibold text-gray-700">Target Intensity</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {comparison.targetIntensity.toFixed(4)} gCO₂e/MJ
            </p>
            <p className="text-sm text-gray-600 mt-1">FuelEU Maritime Standard</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg animate-slide-up">
          <Table data={comparison.comparisons} columns={columns} />
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-slide-up">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Intensity Comparison Chart
          </h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="colorComparison" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="routeId" stroke="#6b7280" style={{ fontSize: '14px', fontWeight: '500' }} />
              <YAxis 
                label={{ value: 'gCO₂e/MJ', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#6b7280' } }} 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar dataKey="baseline" fill="url(#colorBaseline)" name="Baseline" radius={[8, 8, 0, 0]} />
              <Bar dataKey="comparison" fill="url(#colorComparison)" name="Comparison" radius={[8, 8, 0, 0]} />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#ef4444"
                strokeWidth={3}
                name="Target"
                dot={{ fill: '#ef4444', r: 6 }}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
