using Application.Common.Interfaces;
using FluentValidation;

namespace Application.Features.Books.Commands.CheckoutBook;

public class BookCheckoutCommandValidator : AbstractValidator<BookCheckoutCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public BookCheckoutCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(x => x.BookId).NotEmpty().WithMessage("Book ID must be provided.");

        RuleFor(x => x.LoanedOutTo)
            .NotEmpty().WithMessage("The name of the person borrowing the book must be provided.")
            .MaximumLength(200).WithMessage("The name of the person borrowing the book must be less than 200 characters.");

        RuleFor(x => x.DueDate)
            .NotEmpty().WithMessage("A due date for the return of the book must be provided.")
            .GreaterThan(DateTimeOffset.Now).WithMessage("Due date must be in the future.");
    }
}