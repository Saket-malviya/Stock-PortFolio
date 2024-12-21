using StockPortfolio.Data;
using StockPortfolio.Models;
using Microsoft.EntityFrameworkCore;

namespace StockPortfolio.Services
{
    public class StockService : IStockService
    {
        private readonly AppDbContext _context;
        private readonly IStockPriceService _priceService;

        public StockService(AppDbContext context, IStockPriceService priceService)
        {
            _context = context;
            _priceService = priceService;
        }

        public async Task<IEnumerable<Stock>> GetAllStocksAsync()
        {
            var stocks = await _context.Stocks.ToListAsync();
            foreach (var stock in stocks)
            {
                stock.CurrentPrice = await _priceService.GetCurrentPrice(stock.Ticker);
            }
            return stocks;
        }

        public async Task<Stock?> GetStockByIdAsync(string id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock != null)
            {
                stock.CurrentPrice = await _priceService.GetCurrentPrice(stock.Ticker);
            }
            return stock;
        }

        public async Task<Stock> AddStockAsync(Stock stock)
        {
            stock.Id = Guid.NewGuid().ToString();
            _context.Stocks.Add(stock);
            await _context.SaveChangesAsync();
            stock.CurrentPrice = await _priceService.GetCurrentPrice(stock.Ticker);
            return stock;
        }

        public async Task<Stock?> UpdateStockAsync(string id, Stock stock)
        {
            if (id != stock.Id) return null;

            _context.Entry(stock).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                stock.CurrentPrice = await _priceService.GetCurrentPrice(stock.Ticker);
                return stock;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await StockExistsAsync(id))
                {
                    return null;
                }
                throw;
            }
        }

        public async Task<bool> DeleteStockAsync(string id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null) return false;

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<bool> StockExistsAsync(string id)
        {
            return await _context.Stocks.AnyAsync(e => e.Id == id);
        }
    }
}