using System;
using System.Collections.Generic;

namespace TaskFinder.DataAccess.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Example> Examples { get; set; }

        public string Code { get; set; }

        public DateTime DateAdded { get; set; }
    }
}
