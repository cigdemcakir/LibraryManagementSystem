using Application.Common.Interfaces;
using Application.Features.Books.Commands.AddBook;
using Domain.Common;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Books.Commands.ReturnBook;

public class BookReturnCommandHandler : IRequestHandler<BookReturnCommand, Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public BookReturnCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
        
    public async Task<Response<Guid>> Handle(BookReturnCommand request, CancellationToken cancellationToken)
    {
        var loan = await _applicationDbContext.Loans
            .Where(l => l.BookId == request.BookId && !l.ReturnedDate.HasValue)
            .SingleOrDefaultAsync(cancellationToken);

        if (loan == null)
        {
            throw new Exception("Loan record not found.");
        }

        loan.ReturnedDate = DateTimeOffset.Now;
        
        var book = await _applicationDbContext.Books
            .FirstOrDefaultAsync(b => b.Id == request.BookId, cancellationToken);

        if (book == null)
        {
            throw new Exception("Kitap kaydı bulunamadı.");
        }

        book.IsAvailable = true;

        await _applicationDbContext.SaveChangesAsync(cancellationToken);

        return new Response<Guid>("Book returned successfully!");
    }
}