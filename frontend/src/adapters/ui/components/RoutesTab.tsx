import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Route } from '../../../core/domain/models/Route';
import { Table } from './common/Table';
import { Button } from './common/Button';
import { Input } from './common/Input';

export const RoutesTab: React.FC = () => {
  const { apiClient } = useApp();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [vesselTypeFilter, setVesselTypeFilter] = useState('');
  const [fuelTypeFilter, setFuelTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (vesselTypeFilter) filters.vesselType = vesselTypeFilter;
      if (fuelTypeFilter) filters.fuelType = fuelTypeFilter;
      if (yearFilter) filters.year = parseInt(yearFilter);

      const data = await apiClient.getRoutes(filters);
      setRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSetBaseline = async (routeId: string) => {
    try {
      await apiClient.setBaseline(routeId);
      await fetchRoutes();
    } catch (error) {
      console.error('Error setting baseline:', error);
    }
  };

  const columns = [
    { header: 'Route ID', accessor: 'routeId' as keyof Route },
    { header: 'Vessel Type', accessor: 'vesselType' as keyof Route },
    { header: 'Fuel Type', accessor: 'fuelType' as keyof Route },
    { header: 'Year', accessor: 'year' as keyof Route },
    {
      header: 'GHG Intensity',
      accessor: (row: Route) => `${row.ghgIntensity} gCO₂e/MJ`,
    },
    {
      header: 'Fuel Consumption',
      accessor: (row: Route) => `${row.fuelConsumption} tons`,
    },
    { header: 'Distance', accessor: (row: Route) => `${row.distanceKm} km` },
    {
      header: 'Baseline',
      accessor: (row: Route) => (row.isBaseline ? '✅' : ''),
    },
    {
      header: 'Actions',
      accessor: (row: Route) => (
        <Button
          onClick={() => handleSetBaseline(row.routeId)}
          variant="secondary"
          disabled={row.isBaseline}
        >
          Set Baseline
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
        {/* Header with Icon */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Routes Management
          </h2>
        </div>

        {/* Filters Section with Enhanced Design */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
            </svg>
            Filter Routes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Input
                label="Vessel Type"
                value={vesselTypeFilter}
                onChange={setVesselTypeFilter}
                placeholder="Filter by vessel type"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Input
                label="Fuel Type"
                value={fuelTypeFilter}
                onChange={setFuelTypeFilter}
                placeholder="Filter by fuel type"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Input
                label="Year"
                type="number"
                value={yearFilter}
                onChange={setYearFilter}
                placeholder="Filter by year"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={fetchRoutes}>
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
                  </svg>
                  <span>Apply Filters</span>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State with Animation */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading routes...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg animate-slide-up">
            <Table data={routes} columns={columns} />
          </div>
        )}
      </div>
    </div>
  );
};
