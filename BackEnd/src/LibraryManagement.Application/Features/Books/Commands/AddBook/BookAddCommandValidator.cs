using Application.Common.Interfaces;
using Application.Features.Books.Commands.AddBook;
using FluentValidation;

namespace Application.Features.Books.Commands.AddBook;

public class BookAddCommandValidator : AbstractValidator<BookAddCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public BookAddCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Book title is required.")
            .MaximumLength(250).WithMessage("Book title must not exceed 250 characters.");

        RuleFor(x => x.Author)
            .NotEmpty().WithMessage("Author name is required.")
            .MaximumLength(200).WithMessage("Author name must not exceed 200 characters.");

        RuleFor(x => x.ImageUrl)
            .NotEmpty().WithMessage("Image URL is required.")
            .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out var _))
            .WithMessage("Invalid URL format.");

    }
}