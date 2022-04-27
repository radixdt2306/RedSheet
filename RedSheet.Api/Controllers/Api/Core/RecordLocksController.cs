using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Cache;
using Rx.Core.Security;
using Rx.Core.Settings;
using System;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class RecordLocksController : Controller
    {
        private ILockRecordUow LockRecordUow { get; set; }
        private IApplicationCache ApplicationCache { get; set; }
        private ServerSetting ServerSetting { get; set; }
        public RecordLocksController(ILockRecordUow lockRecordUow, IApplicationCache applicationCache, ServerSetting serverSetting)
        {
            LockRecordUow = lockRecordUow;
            ApplicationCache = applicationCache;
            ServerSetting = serverSetting;
        }

        [HttpPost]
        public IActionResult Post([FromBody]RecordLockModel recordLock)
        {
            var lockRecord = new LockRecord();         
            if (string.IsNullOrEmpty(recordLock.ChildModuleName))
                lockRecord = LockRecordUow.Repository<LockRecord>().SingleOrDefault(t => t.ApplicationModuleId == recordLock.ApplicationModuleId && t.RecordId == recordLock.MainRecordId);
            else
            {
                    lockRecord = LockRecordUow.Repository<LockRecord>().SingleOrDefault(t => t.ApplicationModuleId == recordLock.ApplicationModuleId && t.ChildModuleName == recordLock.ChildModuleName && t.RecordId == recordLock.MainRecordId);
            }
            if (lockRecord == null)
            {
                var expireMinutes = ServerSetting.Get<int>("recordLock.expireMinutes");
                lockRecord = new LockRecord
                {
                    UserName = UserClaim.Email,
                    RecordId = recordLock.MainRecordId,
                    ApplicationModuleId = recordLock.ApplicationModuleId,
                    ChildModuleName = recordLock.ChildModuleName,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(expireMinutes),
                };
                LockRecordUow.RegisterNew<LockRecord>(lockRecord);
                LockRecordUow.Commit();
                return Ok(lockRecord.LockRecordId);
            }
            else {
                var expireMinutes = ServerSetting.Get<int>("recordLock.expireMinutes");
                if (lockRecord.UserName.ToLower() == UserClaim.Email.ToLower()) {
                    if (DateTime.UtcNow > lockRecord.ExpiresAt)
                    {
                        
                        lockRecord.ExpiresAt = DateTime.UtcNow.AddMinutes(expireMinutes);
                        LockRecordUow.RegisterDirty<LockRecord>(lockRecord);
                        LockRecordUow.Commit();
                    }
                    return Ok(lockRecord.LockRecordId);
                } else {
                    if (DateTime.UtcNow > lockRecord.ExpiresAt) {
                        lockRecord.UserName = UserClaim.Email;
                        lockRecord.ExpiresAt = DateTime.UtcNow.AddMinutes(expireMinutes);
                        LockRecordUow.RegisterDirty<LockRecord>(lockRecord);
                        LockRecordUow.Commit();
                    }
                }
            }
                return BadRequest(lockRecord.UserName);
        }

        [HttpDelete("{lockRecordId}")]
        public IActionResult Delete(int lockRecordId)
        {
            var lockRecord = LockRecordUow.Repository<LockRecord>().FindByKey(lockRecordId);
            if (lockRecord != null)
            {
                LockRecordUow.RegisterDeleted<LockRecord>(lockRecord);
                LockRecordUow.Commit();
            }
            return Ok();
        }
    }
}
