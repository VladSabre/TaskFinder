using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TaskFinder.DataAccess;

namespace TaskFinder.Test
{
    [SetUpFixture]
    public class BaseFixture
    {
        public DbContextOptions<TaskFinderDbContext> Options { get; set; }

        private SqliteConnection _connection;

        [OneTimeSetUp]
        public void Init()
        {
            _connection = new SqliteConnection("Filename=:memory:");
            _connection.Open();

            Options = new DbContextOptionsBuilder<TaskFinderDbContext>()
                .UseSqlite(_connection)
                .Options;

            using var context = new TaskFinderDbContext(Options);

            if (context.Database.EnsureCreated())
            {
                TestData.AddTasks(context);
                context.SaveChanges();
            }
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            _connection.Dispose();
        }
    }
}
