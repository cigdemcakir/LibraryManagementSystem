using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Books.Queries.GetAll
{
    public class BookGetAllQueryHandler : IRequestHandler<BookGetAllQuery, List<BookGetAllDto>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public BookGetAllQueryHandler(IApplicationDbContext dbContext)
        {
            _applicationDbContext = dbContext;
        }

        public async Task<List<BookGetAllDto>> Handle(BookGetAllQuery request, CancellationToken cancellationToken)
        {
            var books = await _applicationDbContext.Books
                .Select(book => new BookGetAllDto
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    ImageUrl = book.ImageUrl,
                    Genre = book.Genre,
                    IsAvailable = book.Loans.All(l => l.ReturnedDate != null),
                    LoanedOutTo = book.Loans.Where(loan => loan.ReturnedDate == null).Select(l => l.LoanedOutTo).FirstOrDefault(),
                    DueDate = book.Loans.Where(loan => loan.ReturnedDate == null).Select(l => l.DueDate).FirstOrDefault()
                })
                .OrderBy(b => b.Title)
                .ToListAsync(cancellationToken);


            return books;
        }
    }

}


