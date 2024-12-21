using Microsoft.EntityFrameworkCore;
using StockPortfolio.Models;

namespace StockPortfolio.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Stock> Stocks { get; set; } = null!;
    }
}