
using Application.Features.Books.Commands.AddBook;
using Application.Features.Books.Commands.CheckoutBook;
using Application.Features.Books.Queries.GetAll;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using WebApi.Filters;
using WebApi.Hubs;

namespace WebApi.Controllers
{
    public class BooksController : ApiControllerBase
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;
        private readonly IHubContext<BookHub> _bookHubContext;
        public BooksController(ILogger<GlobalExceptionFilter> logger, IHubContext<BookHub> bookHubContext)
        {
            _logger = logger;
            _bookHubContext = bookHubContext;
        }
        // POST /books
        [HttpPost]
        public async Task<IActionResult> AddBookAsync([FromBody] BookAddCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllBooksAsync()
        {
            var query = new BookGetAllQuery();
            return Ok(await Mediator.Send(query));
        }
        
        // PUT /books/{id}/return
        [HttpPut("{id}/return")]
        public async Task<IActionResult> Return(BookReturnCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        // PUT /books/{id}/checkout
        [HttpPut("{id}/checkout")]
        public async Task<IActionResult> Checkout(Guid id, BookCheckoutCommand command)
        {
            try
            {
                var result = await Mediator.Send(command);

                await _bookHubContext.Clients.All.SendAsync("BookCheckedOut", command.BookId, command.LoanedOutTo, command.DueDate);
        
                return Ok(result); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Book checkout failed for book ID: {BookId}", command.BookId);

                return BadRequest($"Error during book checkout: {ex.Message}");
            }
        }
    }
}
