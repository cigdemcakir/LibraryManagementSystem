using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Books.Commands.CheckoutBook
{
    public class BookCheckoutCommand : IRequest<Response<Guid>>
    {
        public Guid BookId { get; set; }
        
        public string LoanedOutTo { get; set; }
        
        public DateTimeOffset DueDate { get; set; }
    }
}