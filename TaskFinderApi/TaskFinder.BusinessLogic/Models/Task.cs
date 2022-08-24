using System.Collections.Generic;

namespace TaskFinder.BusinessLogic.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Example> Examples { get; set; }

        public string Code { get; set; }
    }
}
