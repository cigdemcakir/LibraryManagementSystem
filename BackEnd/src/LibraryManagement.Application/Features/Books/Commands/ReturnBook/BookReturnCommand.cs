using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Books.Commands.AddBook
{
    public class BookReturnCommand : IRequest<Response<Guid>>
    {
        public Guid BookId { get; set; }
    }
}