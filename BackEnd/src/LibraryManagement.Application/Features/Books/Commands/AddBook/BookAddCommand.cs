using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Books.Commands.AddBook
{
    public class BookAddCommand : IRequest<Response<Guid>>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ImageUrl { get; set; }
        public BookGenre Genre { get; set; } 
        
        public bool IsAvailable { get; set; }
    }
}