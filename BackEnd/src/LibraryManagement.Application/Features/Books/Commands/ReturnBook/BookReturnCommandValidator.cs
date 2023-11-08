using Application.Common.Interfaces;
using Application.Features.Books.Commands.AddBook;
using FluentValidation;

namespace Application.Features.Books.Commands.ReturnBook;

public class BookReturnCommandValidator : AbstractValidator<BookReturnCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public BookReturnCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(x => x.BookId).NotEmpty().WithMessage("Book ID must be provided.");
    }
}