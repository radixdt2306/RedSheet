using Rx.Core.Security;

namespace RedSheet.DbEntities.Models
{
    public partial class User : IDefaultData
    {
        public void ApplyDefault()
        {
            //this.StatusId = Enums.Status.Active;
            //this.LoginBlocked = !this.LoginBlocked ? false : this.LoginBlocked;
        }
    }
}
