using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Constants
{
    public class RegexConstants
    {
        public const string AlphaNumericAndSpecialChars = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[-.!@#$%^&*()_=+/\\'])([a-zA-Z0-9-.!@#$%^&*()_=+/\\']+)$";
    }
}
