using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Application.Features.Books.Commands.AddBook
{
    public class BookAddCommandHandler : IRequestHandler<BookAddCommand, Response<Guid>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public BookAddCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        
        public async Task<Response<Guid>> Handle(BookAddCommand request, CancellationToken cancellationToken)
        {
            var book = new Book
            {
                Title = request.Title,
                Author = request.Author,
                ImageUrl = request.ImageUrl,
                Genre = request.Genre,
                IsAvailable = true, 
            };

            await _applicationDbContext.Books.AddAsync(book, cancellationToken);
            
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return new Response<Guid>($"Book {book.Id} has been added successfully.", book.Id);
        }

    }

    
}
