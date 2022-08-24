using System.Collections.Generic;

namespace TaskFinder.DataAccess.Models.ExampleDetails
{
    public class MapValue<T> : Value
    {
        public List<List<T>> Value { get; set; }
    }
}
