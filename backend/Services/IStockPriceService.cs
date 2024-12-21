namespace StockPortfolio.Services
{
    public interface IStockPriceService
    {
        Task<decimal?> GetCurrentPrice(string ticker);
    }
}