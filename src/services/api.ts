import { supabase } from './supabase';
import type { Stock } from '../types';

export async function fetchStocks(): Promise<Stock[]> {
  const { data, error } = await supabase
    .from('stocks')
    .select('*');

  if (error) throw new Error('Failed to fetch stocks');
  return data || [];
}

export async function addStock(stock: Omit<Stock, 'id' | 'currentPrice'>): Promise<Stock> {
  const { data, error } = await supabase
    .from('stocks')
    .insert([stock])
    .select()
    .single();

  if (error) throw new Error('Failed to add stock');
  return data;
}

export async function updateStock(stock: Stock): Promise<Stock> {
  const { data, error } = await supabase
    .from('stocks')
    .update(stock)
    .eq('id', stock.id)
    .select()
    .single();

  if (error) throw new Error('Failed to update stock');
  return data;
}

export async function deleteStock(id: string): Promise<void> {
  const { error } = await supabase
    .from('stocks')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete stock');
}