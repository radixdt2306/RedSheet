using Rx.Core.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Models
{
    public partial class Role :IDefaultData
    {
        public void ApplyDefault()
        {
            //this.Status = Enums.Status.Active;
        }
    }
}
