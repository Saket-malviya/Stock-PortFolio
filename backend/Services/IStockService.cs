using StockPortfolio.Models;

namespace StockPortfolio.Services
{
    public interface IStockService
    {
        Task<IEnumerable<Stock>> GetAllStocksAsync();
        Task<Stock?> GetStockByIdAsync(string id);
        Task<Stock> AddStockAsync(Stock stock);
        Task<Stock?> UpdateStockAsync(string id, Stock stock);
        Task<bool> DeleteStockAsync(string id);
    }
}