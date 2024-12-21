import React from 'react';
import { Dashboard } from './components/Dashboard';
import { StockForm } from './components/StockForm';
import { StockTable } from './components/StockTable';
import { useStocks } from './hooks/useStocks';
import { useAuth } from './hooks/useAuth';
import { calculateMetrics } from './utils/calculations';

export default function App() {
  const { loading: authLoading } = useAuth();
  const { stocks, loading: stocksLoading, error, addStock, updateStock, deleteStock } = useStocks();
  const metrics = calculateMetrics(stocks);

  const loading = authLoading || stocksLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Stock Portfolio Manager
        </h1>
        
        <div className="space-y-8">
          <Dashboard metrics={metrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <StockForm onSubmit={addStock} />
            </div>
            
            <div className="lg:col-span-2">
              <StockTable
                stocks={stocks}
                onEdit={updateStock}
                onDelete={deleteStock}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}