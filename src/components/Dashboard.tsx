import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import type { PortfolioMetrics } from '../types';

interface DashboardProps {
  metrics: PortfolioMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          ${metrics.totalValue.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Performer</h3>
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        {metrics.topPerformer ? (
          <div>
            <p className="text-xl font-bold text-gray-900">
              {metrics.topPerformer.name} ({metrics.topPerformer.ticker})
            </p>
            <p className="text-sm text-gray-500">
              Current Price: ${metrics.topPerformer.currentPrice?.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No stocks in portfolio</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Distribution</h3>
          <PieChart className="w-6 h-6 text-purple-600" />
        </div>
        <div className="space-y-2">
          {Object.entries(metrics.distribution).map(([ticker, percentage]) => (
            <div key={ticker} className="flex justify-between items-center">
              <span className="text-gray-600">{ticker}</span>
              <span className="font-medium">{(percentage * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}