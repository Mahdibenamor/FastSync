using fast_sync_core.abstraction.data;
using fast_sync_core.implementation;
using Microsoft.AspNetCore.Mvc;


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
                await syncManager.ProcessPush(syncPayload);
                return Ok(new BaseResult(data: "Successfully created", success: true));

            }
            catch (Exception exception)
            {
                return Ok(new BaseResult(data: exception, success: false));
            }
        }

        [HttpPost("/pull")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<BaseResult>> pullAsync([FromBody] SyncOperationMetadata metadata)
        {
            try
            {
                ISyncManager syncManager = FastSync.GetSyncManager();
                SyncPayload payload = await syncManager.ProcessPull(metadata);
                BaseResult result = new BaseResult(data: payload, success: true);
                return Ok(result);
            }
            catch (Exception exception)
            {
                return Ok(new BaseResult(data:exception, success:false));
            }
        }
    }

    [Serializable]
    public class BaseResult
    {
        public object Data { get; set; }
        public bool Success { get; set; }
        public BaseResult(object data, bool success)
        {
            Data = data;
            Success = success;
        }
    }
}
