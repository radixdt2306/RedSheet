namespace RedSheet.Infrastructure.Security
{
    public class PasswordResult
    {
        public byte[] Signature { get; set; }

        public byte[] Salt { get; set; }
    }
}
