using Domain.Common;
using Domain.Enums;
using Domain.Identity;

namespace Domain.Entities;

public class Book : EntityBase<Guid>
{
    public string Title { get; set; }
    public string Author { get; set; }
    public string ImageUrl { get; set; }
    public BookGenre Genre { get; set; }
    public bool IsAvailable { get; set; }
    public virtual ICollection<Loan> Loans { get; set; }
}
