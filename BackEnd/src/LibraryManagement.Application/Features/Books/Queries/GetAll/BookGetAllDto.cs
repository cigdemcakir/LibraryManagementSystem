using Domain.Entities;
using Domain.Enums;

namespace Application.Features.Books.Queries.GetAll
{
    public class BookGetAllDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ImageUrl { get; set; }
        public BookGenre Genre { get; set; }
        public bool IsAvailable { get; set; }
        public string? LoanedOutTo { get; set; }
        public DateTimeOffset? DueDate { get; set; }
        
    }
}
