namespace Application.Common.Interfaces
{
    public interface IBookHubService
    {
        Task AddBook (Guid id, CancellationToken cancellationToken);
    }
}
