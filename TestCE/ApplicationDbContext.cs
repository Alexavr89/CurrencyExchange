using Microsoft.EntityFrameworkCore;
using TestCE.Entities;

namespace TestCE
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ExchangeRates> Rates { get; set; }
    }
}
