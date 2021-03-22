using System;
using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }  // default for DbContext to recognize as primary key
        // [Required]
        public string Title { get; set; }
        public DateTime Date  { get; set; }
        public string Description { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}