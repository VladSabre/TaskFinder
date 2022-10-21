using AutoMapper;
using NUnit.Framework;
using TaskFinder.BusinessLogic.Mappings;

namespace TaskFinder.Test.BusinessLogic.Mappings
{
    public class ApplicationMappingsTests
    {
        [Test]
        public void ApplicationMappingsProfile_Valid()
        {
            // Arrange
            var configuration = new MapperConfiguration(c => {
                c.AddProfile<ApplicationMappings>();
            });

            // Act & Assert
            configuration.AssertConfigurationIsValid();
        }
    }
}
