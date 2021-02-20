using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var rates = new ExchangeRates();
            var exchange = rates.FromAmount;
            Assert.True(exchange == null);
        }
    }
}
