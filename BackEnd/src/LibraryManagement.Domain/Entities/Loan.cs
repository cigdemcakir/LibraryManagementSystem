using Domain.Common;

namespace Domain.Entities;

public class Loan : EntityBase<Guid>
{
    public Guid BookId { get; set; }
    public string? LoanedOutTo { get; set; }
    public DateTimeOffset? LoanDate { get; set; }
    public DateTimeOffset? DueDate { get; set; }
    public DateTimeOffset? ReturnedDate { get; set; }
    public virtual Book Book { get; set; }
}
