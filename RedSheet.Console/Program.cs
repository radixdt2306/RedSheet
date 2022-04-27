using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            // need to check connection string exist, if no then manage in exception log
            using (SqlConnection sqlConnection = new SqlConnection(ConfigurationSettings.AppSettings["RedSheetDbConnection"].ToString()))
            {
                sqlConnection.Open();
                SqlCommand EmailCommand = new SqlCommand("spScheduleEmails", sqlConnection);
                EmailCommand.CommandType = CommandType.StoredProcedure;
                
                EmailCommand.ExecuteNonQuery();
                sqlConnection.Close();

            }
        }
    }
}
