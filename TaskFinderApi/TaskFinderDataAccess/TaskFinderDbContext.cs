using Microsoft.EntityFrameworkCore;
using TaskFinder.DataAccess.Models;
using TaskFinder.DataAccess.Models.ExampleDetails;

namespace TaskFinder.DataAccess
{
    public class TaskFinderDbContext: DbContext
    {
        public TaskFinderDbContext(): base() { }

        public TaskFinderDbContext(DbContextOptions options): base(options) { }

        public virtual DbSet<Task> Tasks { get; set; }

        public virtual DbSet<Example> Examples { get; set; }

        //public virtual DbSet<Parameter> Parameters { get; set; }
    }
}
