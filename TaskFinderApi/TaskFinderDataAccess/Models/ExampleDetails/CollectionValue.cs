using System.Collections.Generic;

namespace TaskFinder.DataAccess.Models.ExampleDetails
{
    public class CollectionValue<T> : Value
    {
        public List<T> Value { get; set; }
    }
}
