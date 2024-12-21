import type { Stock, PortfolioMetrics } from '../types';

export function calculateMetrics(stocks: Stock[]): PortfolioMetrics {
  if (!stocks.length) {
    return {
      totalValue: 0,
      topPerformer: null,
      distribution: {},
    };
  }

  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.quantity * (stock.currentPrice ?? stock.buyPrice),
    0
  );

  const topPerformer = stocks.reduce((top, current) => {
    const currentReturn =
      ((current.currentPrice ?? current.buyPrice) - current.buyPrice) / current.buyPrice;
    const topReturn =
      top ? ((top.currentPrice ?? top.buyPrice) - top.buyPrice) / top.buyPrice : -Infinity;
    return currentReturn > topReturn ? current : top;
  }, null as Stock | null);

  const distribution = stocks.reduce((dist, stock) => {
    const stockValue = stock.quantity * (stock.currentPrice ?? stock.buyPrice);
    dist[stock.ticker] = stockValue / totalValue;
    return dist;
  }, {} as { [key: string]: number });

  return {
    totalValue,
    topPerformer,
    distribution,
  };
}