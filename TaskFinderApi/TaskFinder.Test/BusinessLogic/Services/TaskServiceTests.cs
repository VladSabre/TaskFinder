using AutoMapper;
using NUnit.Framework;
using System.Collections.Generic;
using TaskFinder.BusinessLogic.Mappings;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services;
using TaskFinder.DataAccess;

namespace TaskFinder.Test.BusinessLogic.Services
{
    [TestFixture]
    public class TaskServiceTests : BaseFixture
    {
        private TaskService _service;

        [SetUp]
        public void SetUp()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ApplicationMappings());
            });

            var mapper = mockMapper.CreateMapper();
            var context = new TaskFinderDbContext(Options);

            _service = new TaskService(context, mapper);
        }

        [Test]
        public void GetTasks_Success()
        {
            // Arrange
            var filter = new Filter
            {
                Take = 2,
                Skip = 2
            };

            // Act
            var result = _service.GetTasks(filter);

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(TestData.Task3.Id, result[0].Id);
            Assert.AreEqual(TestData.Task1.Id, result[1].Id);
        }

        [Test]
        public void GetTasks_UnexpectedFilters_NoTasksReturned()
        {
            // Arrange
            var filter = new Filter
            {
                Take = 2,
                Skip = 10
            };

            // Act
            var result = _service.GetTasks(filter);

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        [Test]
        public void GetTasks_FilterIsNull_AllTasksReturned()
        {
            // Arrange & Act
            var result = _service.GetTasks(null);

            // Assert
            Assert.AreEqual(5, result.Count);
        }

        [Test]
        public void GetTasks_TakeSkipAreZero_AllTasksReturned()
        {
            // Arrange
            var filter = new Filter
            {
                Take = 0,
                Skip = 0
            };

            // Act
            var result = _service.GetTasks(filter);

            // Assert
            Assert.AreEqual(5, result.Count);
        }

        [Test]
        public void GetTask_ExpectedId_Success()
        {
            // Act
            var result = _service.GetTask(TestData.Task3.Id);

            // Assert
            Assert.AreEqual(TestData.Task3.Id, result.Id);
            Assert.AreEqual(TestData.Task3.Name, result.Name);
        }

        [Test]
        public void GetTask_UnexpectedId_Null()
        {
            // Act
            var result = _service.GetTask(100);

            // Assert
            Assert.IsNull(result);
        }

        [Test, Order(1)]
        public void AddTask_Success()
        {
            // Arrange
            var task = new Task
            {
                Name = "Name1",
                Description = "Description1",
                Examples = new List<Example> 
                {
                    new Example { Index = 0, InputText = "Input", OutputText = "Output" }
                },
                Code = "Console.Write(\"Hello World\")"
            };
            
            // Act
            var result = _service.AddTask(task);

            // Assert
            Assert.AreEqual(TestData.Task5.Id + 1, result.Id);
        }

        [Test, Order(2)]
        public void RemoveTask_Success()
        {
            // Act 
            var result = _service.RemoveTask(TestData.Task5.Id + 1);

            // Assert
            Assert.IsTrue(result);
        }
    }
}
