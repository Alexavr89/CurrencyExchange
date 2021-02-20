using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NUnit.Framework;
using System;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net;
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
            var model = CreateExchangeView();
            return View(model);
        }

        private ExchangeView CreateExchangeView()
        {
            return new ExchangeView
            {
                Rates = _context.Rates.ToList(),
                CurrencyRate = UpdateCurrencyAPI()
            };
        }
        public IActionResult Privacy()
        {
            return View();
        }

        public double UpdateCurrencyAPI()
        {
            var json = new WebClient().DownloadString("https://api.exchangeratesapi.io/latest");
            var val = JsonSerializer.Deserialize<Deserialization>(json);
            return val.rates.USD;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddExchange([Bind("Id, Date, FromAmount, TO")] ExchangeRates rates)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    rates.Date = DateTime.Now;
                    rates.ToAmount = double.Parse(Request.Form["convertto"]);
                    rates.FromCurrency = Request.Form["my_select"];
                    rates.ToCurrency = Request.Form["TO"];
                    _context.Rates.Add(rates);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Index", "Home");
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Try again later...");
            }
            return RedirectToAction("Index", "Home");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

