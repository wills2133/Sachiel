using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command); // save to db

            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceivedComment", comment.Value); //send to grouped clents
        }

        public override async Task OnConnectedAsync()
        {
            var httpContet = Context.GetHttpContext();
            var activityId = httpContet.Request.Query["activityId"];
            System.Diagnostics.Debug.WriteLine($"---------------{activityId}");
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}