using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Username = username}));
        }
        [HttpGet("{userName}/activities")]
        public async Task<IActionResult> GetUserActivities([FromQuery]UserActivityParams urlParams, string userName)
        {
            return HandleResult(await Mediator.Send(new List.Query{Params = urlParams, Username = userName}));
        }

    }
}