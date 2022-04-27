using Newtonsoft.Json;
using RedSheet.Domain.MemberShipService;
using RedSheet.Models.ViewModels.ServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Domain.ClientServiceModule
{
    public class ClientServiceContext : MembershipClient
    {
        public ClientServiceContext(BasicHttpBinding basicBinding, EndpointAddress endPointAddress) : base(basicBinding, endPointAddress)
        {

            
        }

        public List<WorkflowTemplate> GetProjectTemplates(Guid applicationId, Guid productId)
        {
            var projectTemplates = new List<WorkflowTemplate>();
            //Uri uri = new Uri(string.Format("http://PPWebRESTServices.positivedev.co.uk/api/Workflow_ApplicationTemplates?applicationId={0}&productId={1}", applicationId, productId));
            //var handler = new HttpClientHandler();
            //using (HttpClient client = new HttpClient(handler))
            //{
            //    var result = client.GetAsync(uri.ToString()).Result;
            //    if (result.IsSuccessStatusCode)
            //    {
            //        var jsonResult = result.Content.ReadAsStringAsync().Result;
            //        projectTemplates = JsonConvert.DeserializeObject<List<ProjectTemplate>>(jsonResult);
            //    }
            //}            

            projectTemplates = this.Workflow_GetTemplates(Convert.ToString(applicationId), Convert.ToString(productId)).ToList();
            return projectTemplates;
        }
    }
}
