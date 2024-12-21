using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockPortfolio.Data;
using StockPortfolio.Models;
using StockPortfolio.Services;

namespace StockPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StocksController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IStockPriceService _stockPriceService;

        public StocksController(AppDbContext context, IStockPriceService stockPriceService)
        {
            _context = context;
            _stockPriceService = stockPriceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            var stocks = await _context.Stocks.ToListAsync();
            foreach (var stock in stocks)
            {
                stock.CurrentPrice = await _stockPriceService.GetCurrentPrice(stock.Ticker);
            }
            return stocks;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock(string id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            stock.CurrentPrice = await _stockPriceService.GetCurrentPrice(stock.Ticker);
            return stock;
        }

        [HttpPost]
        public async Task<ActionResult<Stock>> CreateStock(Stock stock)
        {
            _context.Stocks.Add(stock);
            await _context.SaveChangesAsync();

            stock.CurrentPrice = await _stockPriceService.GetCurrentPrice(stock.Ticker);
            return CreatedAtAction(nameof(GetStock), new { id = stock.Id }, stock);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStock(string id, Stock stock)
        {
            if (id != stock.Id)
            {
                return BadRequest();
            }

            _context.Entry(stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            stock.CurrentPrice = await _stockPriceService.GetCurrentPrice(stock.Ticker);
            return Ok(stock);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(string id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockExists(string id)
        {
            return _context.Stocks.Any(e => e.Id == id);
        }
    }
}