using System.Collections.Generic;
using TaskFinder.DataAccess.Models.ExampleDetails;

namespace TaskFinder.DataAccess.Models
{
    public class Example
    {
        public int Id { get; set; }

        public byte Index { get; set; }

        public string InputText { get; set; }

        public string OutputText { get; set; }

        //public List<Parameter> Parameters { get; set; }

        //public Value Result { get; set; }

        public int TaskId { get; set; }

        public virtual Task Task { get; set; }
    }
}
