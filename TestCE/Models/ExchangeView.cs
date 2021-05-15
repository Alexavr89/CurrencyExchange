using System.Collections.Generic;
using TestCE.Entities;

namespace TestCE.Models
{
    public class ExchangeView : ExchangeRates
    {
        public virtual IEnumerable<ExchangeRates> Rates { get; set; }
    }
}
