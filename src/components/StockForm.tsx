import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Stock } from '../types';

interface StockFormProps {
  onSubmit: (stock: Omit<Stock, 'id' | 'currentPrice'>) => void;
}

export function StockForm({ onSubmit }: StockFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    quantity: 0,
    buyPrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', ticker: '', quantity: 0, buyPrice: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="w-6 h-6" />
        Add New Stock
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ticker Symbol
          </label>
          <input
            type="text"
            required
            value={formData.ticker}
            onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buy Price
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.buyPrice}
            onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Stock
      </button>
    </form>
  );
}