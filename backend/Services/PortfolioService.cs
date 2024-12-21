using StockPortfolio.Models;
using StockPortfolio.DTOs;

namespace StockPortfolio.Services
{
    public class PortfolioService : IPortfolioService
    {
        private readonly IStockService _stockService;

        public PortfolioService(IStockService stockService)
        {
            _stockService = stockService;
        }

        public async Task<PortfolioMetrics> GetPortfolioMetricsAsync()
        {
            var stocks = await _stockService.GetAllStocksAsync();
            var stocksList = stocks.ToList();

            return new PortfolioMetrics
            {
                TotalValue = CalculateTotalValue(stocksList),
                TopPerformer = FindTopPerformer(stocksList),
                Distribution = CalculateDistribution(stocksList)
            };
        }

        private decimal CalculateTotalValue(List<Stock> stocks)
        {
            return stocks.Sum(s => s.Quantity * (s.CurrentPrice ?? s.BuyPrice));
        }

        private Stock? FindTopPerformer(List<Stock> stocks)
        {
            return stocks.OrderByDescending(s => 
                ((s.CurrentPrice ?? s.BuyPrice) - s.BuyPrice) / s.BuyPrice)
                .FirstOrDefault();
        }

        private Dictionary<string, decimal> CalculateDistribution(List<Stock> stocks)
        {
            var totalValue = CalculateTotalValue(stocks);
            if (totalValue == 0) return new Dictionary<string, decimal>();

            return stocks.ToDictionary(
                s => s.Ticker,
                s => (s.Quantity * (s.CurrentPrice ?? s.BuyPrice)) / totalValue
            );
        }
    }
}