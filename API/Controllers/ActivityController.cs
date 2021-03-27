using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController  // consistent [Endpoint]Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams urlParams)
        {
            return HandlePageResult(await Mediator.Send(new List.Query{Params = urlParams}));
        }

        [HttpGet("{id}")] // BaseUrl/GetActivities/{id} => get id => pass to Id
        public async Task<IActionResult> GetActivities(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> PostActivities([FromBody]Activity activity) // can guess from body though
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivites(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivities(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}