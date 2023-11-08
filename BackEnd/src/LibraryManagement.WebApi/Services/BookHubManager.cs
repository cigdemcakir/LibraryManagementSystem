using Application.Common.Interfaces;
using Microsoft.AspNetCore.SignalR;
using WebApi.Hubs;

namespace WebApi.Services
{
    public class BookHubManager:IBookHubService
    {
        private readonly IHubContext<BookHub> _hubContext;

        public BookHubManager(IHubContext<BookHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public Task AddBook(Guid id, CancellationToken cancellationToken)
        {
            return  _hubContext.Clients.All.SendAsync("AddBook", id, cancellationToken);
        }
    }
}
