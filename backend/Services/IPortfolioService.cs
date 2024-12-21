using StockPortfolio.DTOs;

namespace StockPortfolio.Services
{
    public interface IPortfolioService
    {
        Task<PortfolioMetrics> GetPortfolioMetricsAsync();
    }
}