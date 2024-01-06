using fast_sync_core.abstraction.data;
using fast_sync_core.implementation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace exemple.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SyncController : ControllerBase
    {

        private readonly ILogger<SyncController> _logger;

        public SyncController(ILogger<SyncController> logger)
        {
            _logger = logger;
        }

        [HttpPost("/push")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> pushAsync([FromBody] SyncPayload syncPayload)
        {
            try
            {
                ISyncManager syncManager = FastSync.GetSyncManager();
                //await syncManager.ProcessPush(syncPayload);

               // return this.success(res, { "result":"push was done with success"});
            }
            catch (Exception exception)
            {
                ModelState.AddModelError("key1", "Something went wrong call the push api");
                ModelState.AddModelError("key2", exception.Message);
                ModelState.AddModelError("key3", exception.StackTrace);
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }
    }
}
