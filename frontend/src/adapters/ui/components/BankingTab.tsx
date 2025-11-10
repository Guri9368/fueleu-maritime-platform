import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ComplianceBalance } from '../../../core/domain/models/Compliance';
import { BankEntry } from '../../../core/domain/models/Banking';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Table } from './common/Table';

export const BankingTab: React.FC = () => {
  const { apiClient } = useApp();
  const [shipId, setShipId] = useState('SHIP001');
  const [year, setYear] = useState('2024');
  const [amount, setAmount] = useState('');
  const [cb, setCb] = useState<ComplianceBalance | null>(null);
  const [bankRecords, setBankRecords] = useState<BankEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCB = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getComplianceBalance(shipId, parseInt(year));
      setCb(data);

      const records = await apiClient.getBankRecords(shipId);
      setBankRecords(records);
    } catch (error) {
      console.error('Error fetching CB:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBank = async () => {
    try {
      await apiClient.bankSurplus(shipId, parseInt(year), parseFloat(amount));
      setAmount('');
      await fetchCB();
    } catch (error) {
      console.error('Error banking surplus:', error);
      alert('Error banking surplus. Check console for details.');
    }
  };

  const handleApply = async () => {
    try {
      await apiClient.applyBanked(shipId, parseInt(year), parseFloat(amount));
      setAmount('');
      await fetchCB();
    } catch (error) {
      console.error('Error applying banked:', error);
      alert('Error applying banked surplus. Check console for details.');
    }
  };

  const totalBanked = bankRecords.reduce((sum, r) => sum + r.amountGco2eq, 0);
  const canBank = cb && cb.complianceBalance > 0;
  const canApply = totalBanked > 0 && parseFloat(amount) <= totalBanked;

  const columns = [
    { header: 'Year', accessor: 'year' as keyof BankEntry },
    {
      header: 'Amount',
      accessor: (row: BankEntry) => `${row.amountGco2eq.toFixed(2)} gCO₂e`,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Banking Management
          </h2>
        </div>

        {/* Input Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            Ship Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Input label="Ship ID" value={shipId} onChange={setShipId} />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Input label="Year" type="number" value={year} onChange={setYear} />
            </div>
            <div className="flex items-end">
              <Button onClick={fetchCB}>
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Fetch CB</span>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-green-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading compliance balance...</p>
          </div>
        ) : cb ? (
          <div className="space-y-6 animate-slide-up">
            {/* CB Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compliance Balance Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                    </svg>
                    Compliance Balance
                  </h3>
                  <span className={`text-3xl font-bold ${cb.complianceBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {cb.complianceBalance >= 0 ? '📈' : '📉'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-blue-700 mb-2">
                  {cb.complianceBalance.toFixed(2)} gCO₂e
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Actual: {cb.actualIntensity.toFixed(2)} gCO₂e/MJ</p>
                  <p>Target: {cb.targetIntensity.toFixed(4)} gCO₂e/MJ</p>
                  <p>Energy: {cb.energyMJ.toFixed(0)} MJ</p>
                </div>
              </div>

              {/* Total Banked Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-green-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    Total Banked
                  </h3>
                  <span className="text-3xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-green-700 mb-2">
                  {totalBanked.toFixed(2)} gCO₂e
                </p>
                <p className="text-sm text-gray-600">Available for future use</p>
              </div>
            </div>

            {/* Actions Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
                Banking Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={setAmount}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleBank} disabled={!canBank || !amount} variant="primary">
                    <span className="flex items-center space-x-2">
                      <span>💾</span>
                      <span>Bank Surplus</span>
                    </span>
                  </Button>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleApply} disabled={!canApply || !amount} variant="secondary">
                    <span className="flex items-center space-x-2">
                      <span>💸</span>
                      <span>Apply Banked</span>
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bank Records */}
            {bankRecords.length > 0 && (
              <div className="animate-slide-up">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                  </svg>
                  Bank Records
                </h3>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                  <Table data={bankRecords} columns={columns} />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
