using System;
using System.ComponentModel.DataAnnotations;

namespace TestCE.Entities
{
    public class ExchangeRates : IDisposable
    {
        public void Dispose() { }
        public int Id { get; set; }
        [Display(Name = "From Currency")]
        public string FromCurrency { get; set; }
        [Required]
        [Display(Name = "From Amount")]
        public double FromAmount { get; set; }
        [Display(Name = "To Currency")]
        public string ToCurrency { get; set; }
        [Required]
        [Display(Name = "To Amount")]
        public double ToAmount { get; set; }
        public DateTime Date { get; set; }
    }
}
