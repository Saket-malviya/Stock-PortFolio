export interface Stock {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice?: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  topPerformer: Stock | null;
  distribution: { [key: string]: number };
}