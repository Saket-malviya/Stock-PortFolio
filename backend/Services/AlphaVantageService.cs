using System.Net.Http.Json;

namespace StockPortfolio.Services
{
    public class AlphaVantageService : IStockPriceService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AlphaVantageService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["AlphaVantage:ApiKey"] ?? throw new ArgumentNullException("AlphaVantage API key is required");
        }

        public async Task<decimal?> GetCurrentPrice(string ticker)
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<dynamic>(
                    $"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={_apiKey}"
                );

                if (response?."Global Quote"?."05. price" != null)
                {
                    return decimal.Parse(response["Global Quote"]["05. price"].ToString());
                }

                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}