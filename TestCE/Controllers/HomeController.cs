using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TestCE.Entities;
using TestCE.Models;

namespace TestCE.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            ExchangeView model = new ExchangeView()
            {
                Rates = _context.Rates.ToList()
            };
            return View(model);
        }
        public string GetLastPost()
        {
            var JsonString = JsonSerializer.Serialize(_context.Rates.OrderByDescending(p => p.Id).FirstOrDefault());
            return JsonString;
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [HttpPost]
        public async Task AddExchange(string FromCurrency, string ToCurrency, double FromAmount)
        {
            try
            {
                if (ModelState.IsValid)
                {
                        ExchangeRates rates = new ExchangeRates();
                        rates.Date = DateTime.Now;
                        rates.FromAmount = FromAmount;
                        rates.FromCurrency = FromCurrency;
                        rates.ToCurrency = ToCurrency;
                        _context.Rates.Add(rates);
                        await _context.SaveChangesAsync();
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Try again later...");
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

