using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Domain.Core.ModuleMasters
{
    public class ModuleMasterDomain : IModuleMasterDomain
    {
        public ModuleMasterDomain(IMasterUow masterUow, IApplicationUtility applicationUtility)
        {
            MasterUow = masterUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }
        public ModuleMaster Add(ModuleMaster moduleMaster)
        {
            this.MasterUow.RegisterNew<ModuleMaster>(moduleMaster);
            this.MasterUow.Commit();
            return moduleMaster;
        }

        public HashSet<string> AddValidation(ModuleMaster moduleMaster)
        {
            var moduleMasterObject = MasterUow.Repository<ModuleMaster>().SingleOrDefault(t => t.ModuleMasterName == moduleMaster.ModuleMasterName);
            if (moduleMasterObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var moduleMaster = MasterUow.Repository<ModuleMaster>().FindByKey(id);
            MasterUow.RegisterDeleted<ModuleMaster>(moduleMaster);
            MasterUow.Commit();
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<ModuleMaster>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public ModuleMaster Update(ModuleMaster moduleMaster)
        {
            this.MasterUow.RegisterDirty<ModuleMaster>(moduleMaster);
            this.MasterUow.Commit();
            return moduleMaster;
        }

        public HashSet<string> UpdateValidation(ModuleMaster moduleMaster)
        {
            var moduleMasterObject = MasterUow.Repository<ModuleMaster>().SingleOrDefault(t => t.ModuleMasterName == moduleMaster.ModuleMasterName && t.ModuleMasterId!= moduleMaster.ModuleMasterId);
            if (moduleMasterObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IMasterUow MasterUow { get; set; }

    }

    public interface IModuleMasterDomain
    {
        HashSet<string> AddValidation(ModuleMaster moduleMaster);
        HashSet<string> UpdateValidation(ModuleMaster moduleMaster);
        HashSet<string> DeleteValidation(int id);
        ModuleMaster Add(ModuleMaster moduleMaster);
        ModuleMaster Update(ModuleMaster moduleMaster);
        void Delete(int id);
    }
}
