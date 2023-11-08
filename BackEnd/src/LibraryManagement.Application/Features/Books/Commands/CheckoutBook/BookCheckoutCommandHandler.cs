using Application.Common.Interfaces;
using Application.Features.Books.Commands.CheckoutBook;
using Domain.Common;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Books.Commands.CheckoutBook;

public class BookCheckoutCommandHandler : IRequestHandler<BookCheckoutCommand, Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public BookCheckoutCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
        
    public async Task<Response<Guid>> Handle(BookCheckoutCommand request, CancellationToken cancellationToken)
    {
        var book = await _applicationDbContext.Books.Include(b => b.Loans).FirstOrDefaultAsync(b => b.Id == request.BookId);

        if (book == null)
        {
            throw new InvalidOperationException("Book not found.");
        }

        if (!book.IsAvailable)
        {
            throw new InvalidOperationException("Book is not available for checkout.");
        }

        var loan = new Loan
        {
            BookId = book.Id,
            LoanedOutTo = request.LoanedOutTo,
            LoanDate = DateTimeOffset.Now,
            DueDate = request.DueDate
        };

        book.IsAvailable = false;

        await _applicationDbContext.Loans.AddAsync(loan, cancellationToken);
        
        await _applicationDbContext.SaveChangesAsync(cancellationToken);

        return new Response<Guid>($"Loan {loan.Id} has been added successfully.");
    }

}