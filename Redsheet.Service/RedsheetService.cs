using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Redsheet.Service
{
    public partial class RedsheetService : ServiceBase
    {                                        
        public RedsheetService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {

            System.Diagnostics.Debugger.Launch();
            base.OnStart(args);
            //if (DateTime.Now.TimeOfDay == System.TimeSpan.Parse("00:00:00"))
            //{
            SendEmail();
            //}
        }

        private void SendEmail()
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(ConfigurationSettings.AppSettings["RedSheetDbConnection"].ToString()))
                {
                    sqlConnection.Open();
                    SqlCommand EmailCommand = new SqlCommand("spScheduleEmails", sqlConnection);
                    EmailCommand.CommandType = CommandType.StoredProcedure;

                    var rdr = EmailCommand.ExecuteReader();
                    var data = new List<ScheduleEmails>();

                   
                    while (rdr.Read())
                    {
                        var nowDate = DateTime.Now;
                        int diff = nowDate.Subtract(Convert.ToDateTime(rdr["RequestedDateTime"])).Days;
                        if (rdr["EmailTemplateName"].ToString() == ConfigurationSettings.AppSettings["ModuleInactivityEmail"].ToString() && diff > Convert.ToInt32(rdr["InactivityDays"]))
                        {
                            var row = new ScheduleEmails();

                            row.ScheduleEmailId = Convert.ToInt32(rdr["ScheduleEmailId"]);
                            row.IsSentScheduleEmail = Convert.ToInt32(rdr["IsSentScheduleEmail"]);
                            row.ProjectName = rdr["ProjectName"].ToString();
                            row.ModuleName = rdr["ModuleName"].ToString();
                            row.EmailTemplateName = rdr["EmailTemplateName"].ToString();
                            row.EmailTo = rdr["EmailTo"].ToString();
                            row.EmailFrom = rdr["EmailFrom"].ToString();
                            row.RequestedDateTime = Convert.ToDateTime(rdr["RequestedDateTime"]);
                            row.InactivityDays = Convert.ToInt32(rdr["InactivityDays"]);
                            row.Subject = rdr["Subject"].ToString();
                            row.OwnerName = rdr["OwnerName"].ToString();
                            row.UserName = rdr["UserName"].ToString();
                            row.ProjectId = Convert.ToInt32(rdr["ProjectId"]);
                            row.ProjectModuleId = rdr["ProjectModuleId"].ToString();
                            data.Add(row);
                        }
                        else
                        {
                            var row = new ScheduleEmails();

                            row.ScheduleEmailId = Convert.ToInt32(rdr["ScheduleEmailId"]);
                            row.IsSentScheduleEmail = Convert.ToInt32(rdr["IsSentScheduleEmail"]);
                            row.ProjectName = rdr["ProjectName"].ToString();
                            row.ModuleName = rdr["ModuleName"].ToString();
                            row.EmailTemplateName = rdr["EmailTemplateName"].ToString();
                            row.EmailTo = rdr["EmailTo"].ToString();
                            row.EmailFrom = rdr["EmailFrom"].ToString();
                            row.RequestedDateTime = Convert.ToDateTime(rdr["RequestedDateTime"]);
                            row.InactivityDays = Convert.ToInt32(rdr["InactivityDays"]);
                            row.Subject = rdr["Subject"].ToString();
                            row.OwnerName = rdr["OwnerName"].ToString();
                            row.UserName = rdr["UserName"].ToString();
                            row.ProjectId = Convert.ToInt32(rdr["ProjectId"]);
                            row.ProjectModuleId = rdr["ProjectModuleId"].ToString();
                            data.Add(row);
                        }
                    }
                    string HTMLcontent = string.Empty;
                    string test;

                    //System.IO.StreamReader file = new System.IO.StreamReader(@"..\EmailTemplates\ModuleInactivityEmail.html");

                    //var filePath = Directory.GetCurrentDirectory() + @"\EmailTemplates\ModuleInactivityEmail.html";
                    System.IO.Directory.SetCurrentDirectory(System.AppDomain.CurrentDomain.BaseDirectory);
                    foreach (var item in data)
                    {
                        //var filePath = @"D:\TrushaRadadiya\SVN Projects\redsheetwebapplication\Source\RedSheet-CR\Redsheet.Service\EmailTemplates\EmailTemplateName.html";
                        //var path = filePath.Replace("EmailTemplateName", item.EmailTemplateName);
                        var filePath = @"..\Debug\EmailTemplates\EmailTemplateName.html";
                        var path = filePath.Replace("EmailTemplateName", item.EmailTemplateName);
                        System.IO.StreamReader file = new System.IO.StreamReader(path);
                        while ((test = file.ReadLine()) != null)
                        {
                            HTMLcontent += test;
                        }
                        file.Close();

                        HTMLcontent = HTMLcontent.Replace("##ForeName", item.UserName);
                        HTMLcontent = HTMLcontent.Replace("##ProjectName", item.ProjectName);
                        HTMLcontent = HTMLcontent.Replace("##ModuleName", item.ModuleName);
                        HTMLcontent = HTMLcontent.Replace("##OwnerName", item.OwnerName);
                        MailMessage mail = new MailMessage();
                        SmtpClient SmtpServer = new SmtpClient(ConfigurationSettings.AppSettings["MailServer"].ToString());

                        
                        /*Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "redsheet-logo.png");*/

                        HTMLcontent = HTMLcontent + "<img src='" + ConfigurationSettings.AppSettings["ImagePath"].ToString() + "'>";

                        //SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;


                        mail.From = new MailAddress(item.EmailFrom);
                        mail.To.Add(item.EmailTo);
                        mail.Subject = item.Subject;
                        mail.IsBodyHtml = true;
                        mail.Body = HTMLcontent;
                        //Attachment attachment = new Attachment(filename);
                        //mail.Attachments.Add(attachment);

                        SmtpServer.Port = Convert.ToInt32(Convert.ToString(ConfigurationSettings.AppSettings["Port"]));
                        var credential = new System.Net.NetworkCredential();
                        credential.UserName = ConfigurationSettings.AppSettings["UserName"].ToString();
                        credential.Password = ConfigurationSettings.AppSettings["PassWord"].ToString();
                        SmtpServer.Credentials = credential;
                        SmtpServer.EnableSsl = true;

                        SmtpServer.Send(mail);
                        SqlCommand cmd = new SqlCommand("spEmailSentUpdate", sqlConnection);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@ScheduleEmailId", SqlDbType.Int).Value = item.ScheduleEmailId;
                        var result = cmd.ExecuteReader();
                        HTMLcontent = string.Empty;
                    }
                    sqlConnection.Close();

                }
            }
            catch (Exception ex)
            {
                //string path = Directory.GetCurrentDirectory() +@"\EmailLogs\MyTest.txt";
                //string path = @"D:\TrushaRadadiya\SVN Projects\redsheetwebapplication\Source\RedSheet-CR\Redsheet.Service\EmailLogs\ErrorLogs.txt";
                string path = @"..\Debug\EmailLogs\ErrorLogs.txt";

                File.AppendAllText(path, ex.Message + Environment.NewLine);
            }
        }

        protected override void OnStop()
        {
        }


        public class ScheduleEmails
        {
            public int ScheduleEmailId { get; set; }
            public int IsSentScheduleEmail { get; set; }
            public string ProjectName { get; set; }
            public string ModuleName { get; set; }
            public string EmailTemplateName { get; set; }
            public string EmailTo { get; set; }
            public string EmailFrom { get; set; }
            public DateTime RequestedDateTime { get; set; }
            public int InactivityDays { get; set; }
            public string Subject { get; set; }
            public string OwnerName { get; set; }
            public string UserName { get; set; }
            public int ProjectId { get; set; }
            public string ProjectModuleId { get; set; }
        }

    }
}
