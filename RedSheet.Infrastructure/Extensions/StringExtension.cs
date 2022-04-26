using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Infrastructure.Extensions
{
    public static class StringExtension
    {
        public static string ToCamelCase(this string value)
        {
            var camelCase = value.Remove(1, value.Length - 1).ToLower() + value.Remove(0, 1);
            return camelCase;
        }

        public static string GetOperationType(this string value) {
            if (value == "Full")
                return "F";
            return value;
        }
    }
}
