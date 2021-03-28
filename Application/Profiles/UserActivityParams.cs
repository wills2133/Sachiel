using System;
using Application.Core;

namespace Application.Profiles
{
    public class UserActivityParams : PagingParams
    {
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.MinValue;
        public bool IsHost { get; set; }
    }
}