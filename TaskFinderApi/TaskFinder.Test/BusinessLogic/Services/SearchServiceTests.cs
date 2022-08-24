using AutoMapper;
using NUnit.Framework;
using TaskFinder.BusinessLogic.Mappings;
using TaskFinder.BusinessLogic.Services;
using TaskFinder.DataAccess;

namespace TaskFinder.Test.BusinessLogic.Services
{
    [TestFixture]
    public class SearchServiceTests : BaseFixture
    {
        private SearchService _service;

        [SetUp]
        public void SetUp()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ApplicationMappings());
            });

            var mapper = mockMapper.CreateMapper();
            var context = new TaskFinderDbContext(Options);

            _service = new SearchService(context, mapper);
        }

        [TestCase("Task1", 1)]
        [TestCase("Task", 5)]
        [TestCase("Description2", 1)]
        [TestCase("Description", 5)]
        [TestCase("Perfect", 2)]
        public void Search_Success(string query, int expectedResult)
        {
            // Act
            var results = _service.Search(query);

            // Assert
            Assert.AreEqual(expectedResult, results.Count);
        }
    }
}
