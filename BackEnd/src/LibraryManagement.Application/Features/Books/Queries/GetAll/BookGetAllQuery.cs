using MediatR;

namespace Application.Features.Books.Queries.GetAll
{
    public class BookGetAllQuery : IRequest<List<BookGetAllDto>>
    {
        
    }
}
