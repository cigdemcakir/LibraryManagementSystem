
using Application.Features.Books.Commands.AddBook;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs
{
    public class BookHub:Hub
    {
        public Task NotifyClientsAboutCheckout(string bookId, string loanedOutTo, string dueDate)
        {
            return Clients.All.SendAsync("BookCheckedOut", bookId, loanedOutTo, dueDate);
        }
    }
}
