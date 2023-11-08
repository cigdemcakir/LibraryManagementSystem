using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Book> Books { get; set; }
        
        DbSet<Loan> Loans { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
        int SaveChanges();

    }
}
