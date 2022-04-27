using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System.Linq;

namespace RedSheet.Domain.ProjectNegotiationModule
{
    public class ProjectNegotiationDomain : IProjectNegotiationDomain
    {
        public ProjectNegotiationDomain(IProjectNegotiationUow projectNegotiationUow, IApplicationUtility applicationUtility)
        {
            ProjectNegotiationUow = projectNegotiationUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectNegotiation projectNegotiation)
        {
            CommonValidation(projectNegotiation);
            return ValidationMessages;
        }

        public ProjectNegotiation Add(ProjectNegotiation projectNegotiation)
        {
            ProjectNegotiationUow.RegisterNew<ProjectNegotiation>(projectNegotiation);
            ProjectNegotiationUow.Commit();
            return projectNegotiation;
        }
        public HashSet<string> UpdateValidation(ProjectNegotiation projectNegotiation)
        {
			CommonValidation(projectNegotiation);
           return ValidationMessages;
        }

        public ProjectNegotiation Update(ProjectNegotiation projectNegotiation)
        {
            var theirTeamCommunicationModes = ProjectNegotiationUow.Repository<TheirTeamCommunicationMode>().FindBy(t => t.ProjectNegotiationId == projectNegotiation.ProjectNegotiationId).ToList();
            theirTeamCommunicationModes.ForEach(t =>
            {
                ProjectNegotiationUow.RegisterDeleted<TheirTeamCommunicationMode>(t);
            });
            foreach (var theirTeamCommunicationMode in projectNegotiation.TheirTeamCommunicationModes)
            {
                ProjectNegotiationUow.RegisterNew<TheirTeamCommunicationMode>(theirTeamCommunicationMode);
            }
            ProjectNegotiationUow.RegisterDirty<ProjectNegotiation>(projectNegotiation);
            ProjectNegotiationUow.Commit();
            return projectNegotiation;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            //NegotiationdDetailRemove(id);
            var isFailed = ApplicationUtility.CandDelete<ProjectNegotiation>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectNegotiation = ProjectNegotiationUow.Repository<ProjectNegotiation>().FindByKey(id);
            ProjectNegotiationUow.RegisterDeleted<ProjectNegotiation>(projectNegotiation);
            ProjectNegotiationUow.Commit();
        }
 
		private void CommonValidation(ProjectNegotiation projectNegotiation) {
        
		}

        private IProjectNegotiationUow ProjectNegotiationUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }



    }
    public interface IProjectNegotiationDomain
    {
        HashSet<string> AddValidation(ProjectNegotiation projectNegotiation);
        HashSet<string> UpdateValidation(ProjectNegotiation projectNegotiation);
        HashSet<string> DeleteValidation(int id);
        ProjectNegotiation Add(ProjectNegotiation projectNegotiation);
        ProjectNegotiation Update(ProjectNegotiation projectNegotiation);
        void Delete(int id);
    }
}
