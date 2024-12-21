namespace StockPortfolio.Models
{
    public class Stock
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Ticker { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal BuyPrice { get; set; }
        public decimal? CurrentPrice { get; set; }
    }
}