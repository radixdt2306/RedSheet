namespace RedSheet.Infrastructure.RequestContext
{
    public interface IRequestAccessor
    {
        string this[string key] { get; }
    }
}
