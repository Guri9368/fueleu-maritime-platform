import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PoolMemberInput, PoolResult } from '../../../core/domain/models/Pool';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Table } from './common/Table';

export const PoolingTab: React.FC = () => {
  const { apiClient } = useApp();
  const [year, setYear] = useState('2024');
  const [members, setMembers] = useState<PoolMemberInput[]>([
    { shipId: 'SHIP001', cbBefore: 1000 },
    { shipId: 'SHIP002', cbBefore: -500 },
  ]);
  const [poolResult, setPoolResult] = useState<PoolResult | null>(null);
  const [loading, setLoading] = useState(false);

  const addMember = () => {
    setMembers([...members, { shipId: '', cbBefore: 0 }]);
  };

  const updateMember = (index: number, field: keyof PoolMemberInput, value: any) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleCreatePool = async () => {
    setLoading(true);
    try {
      const result = await apiClient.createPool(parseInt(year), members);
      setPoolResult(result);
    } catch (error) {
      console.error('Error creating pool:', error);
      alert('Error creating pool. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const totalBefore = members.reduce((sum, m) => sum + m.cbBefore, 0);
  const isValid = totalBefore >= 0;

  const resultColumns = [
    { header: 'Ship ID', accessor: 'shipId' as keyof any },
    {
      header: 'CB Before',
      accessor: (row: any) => `${row.cbBefore.toFixed(2)} gCO₂e`,
    },
    {
      header: 'CB After',
      accessor: (row: any) => `${row.cbAfter.toFixed(2)} gCO₂e`,
      className: 'font-bold',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl shadow-lg animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Pooling Management
          </h2>
        </div>

        {/* Year Selection */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl mb-6 border border-orange-100">
          <div className="max-w-xs transform hover:scale-105 transition-transform duration-200">
            <Input label="Pool Year" type="number" value={year} onChange={setYear} />
          </div>
        </div>

        {/* Pool Members Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <svg className="w-6 h-6 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
            Pool Members
          </h3>

          <div className="space-y-3">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 transform hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <Input
                    label={`Ship ID #${idx + 1}`}
                    value={member.shipId}
                    onChange={(value) => updateMember(idx, 'shipId', value)}
                    placeholder="Enter ship ID"
                  />
                  <Input
                    label="CB Before"
                    type="number"
                    value={member.cbBefore.toString()}
                    onChange={(value) => updateMember(idx, 'cbBefore', parseFloat(value) || 0)}
                    placeholder="Enter CB"
                  />
                  <Button onClick={() => removeMember(idx)} variant="danger">
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>Remove</span>
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={addMember} variant="secondary">
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              <span>Add Member</span>
            </span>
          </Button>
        </div>

        {/* Pool Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
              </svg>
              <span className="font-semibold text-gray-700">Total CB Before</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">
              {totalBefore.toFixed(2)} gCO₂e
            </p>
          </div>

          <div className={`p-6 rounded-xl border-2 shadow-lg transform hover:scale-105 transition-transform duration-300 ${
            isValid 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
              : 'bg-gradient-to-br from-red-50 to-pink-100 border-red-200'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              <svg className={`w-6 h-6 ${isValid ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="font-semibold text-gray-700">Pool Validity</span>
            </div>
            <p className={`text-3xl font-bold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
              {isValid ? '✅ Valid' : '❌ Invalid'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {isValid ? 'Pool can be created' : 'Total CB must be non-negative'}
            </p>
          </div>
        </div>

        {/* Create Pool Button */}
        <Button
          onClick={handleCreatePool}
          disabled={!isValid || loading || members.some((m) => !m.shipId)}
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
              </svg>
              <span>Creating Pool...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
              </svg>
              <span>Create Pool</span>
            </span>
          )}
        </Button>
      </div>

      {/* Pool Result */}
      {poolResult && (
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 animate-slide-up">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Pool Result
            </h3>
          </div>

          {/* Result Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Pool ID</p>
              <p className="text-2xl font-bold text-purple-700">{poolResult.poolId}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Year</p>
              <p className="text-2xl font-bold text-blue-700">{poolResult.year}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
              <p className="text-sm text-gray-600 mb-1">Total CB Before</p>
              <p className="text-2xl font-bold text-orange-700">{poolResult.totalCbBefore.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total CB After</p>
              <p className="text-2xl font-bold text-green-700">{poolResult.totalCbAfter.toFixed(2)}</p>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Table data={poolResult.members} columns={resultColumns} />
          </div>
        </div>
      )}
    </div>
  );
};
