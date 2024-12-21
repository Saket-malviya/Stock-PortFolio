using StockPortfolio.Models;

namespace StockPortfolio.DTOs
{
    public class PortfolioMetrics
    {
        public decimal TotalValue { get; set; }
        public Stock? TopPerformer { get; set; }
        public Dictionary<string, decimal> Distribution { get; set; } = new();
    }
}