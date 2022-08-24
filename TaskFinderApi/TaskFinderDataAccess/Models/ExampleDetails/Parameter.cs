namespace TaskFinder.DataAccess.Models.ExampleDetails
{
    public class Parameter
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public Value Value { get; set; }

        public virtual Example Example { get; set; }
    }
}
