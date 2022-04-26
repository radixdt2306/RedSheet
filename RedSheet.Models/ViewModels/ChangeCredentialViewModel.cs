using System;

namespace RedSheet.ViewModels.Models
{
    public class ChangeCredentialViewModel
    {
        public string UserName { get; set; }
        public string VerificationCode { get; set; }
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
