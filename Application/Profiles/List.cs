using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<PageList<UserActivityDto>>>
        {
            public string Username { get; set; }
            public UserActivityParams Params {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<PageList<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PageList<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    .Where(o => o.Attendees.Any(a => a.AppUser.UserName == request.Username))
                    .OrderBy(d => d.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                
                if (request.Params.StartDate != DateTime.MinValue)
                {
                    query = query.Where(d => d.Date > request.Params.StartDate);
                }
                if (request.Params.EndDate != DateTime.MinValue)
                {
                    query = query.Where(d => d.Date < request.Params.EndDate);
                }

                return Result<PageList<UserActivityDto>>.Success(
                    await PageList<UserActivityDto>.CreateAsync(
                        query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}