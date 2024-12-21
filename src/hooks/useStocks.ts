import { useState, useEffect } from 'react';
import type { Stock } from '../types';
import * as api from '../services/api';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStocks();
  }, []);

  async function loadStocks() {
    try {
      const data = await api.fetchStocks();
      setStocks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load stocks');
    } finally {
      setLoading(false);
    }
  }

  async function addStock(newStock: Omit<Stock, 'id' | 'currentPrice'>) {
    try {
      const added = await api.addStock(newStock);
      setStocks(prev => [...prev, added]);
      return added;
    } catch (err) {
      setError('Failed to add stock');
      throw err;
    }
  }

  async function updateStock(stock: Stock) {
    try {
      const updated = await api.updateStock(stock);
      setStocks(prev => prev.map(s => s.id === updated.id ? updated : s));
      return updated;
    } catch (err) {
      setError('Failed to update stock');
      throw err;
    }
  }

  async function deleteStock(id: string) {
    try {
      await api.deleteStock(id);
      setStocks(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError('Failed to delete stock');
      throw err;
    }
  }

  return {
    stocks,
    loading,
    error,
    addStock,
    updateStock,
    deleteStock,
  };
}