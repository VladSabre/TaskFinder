using AutoMapper;
using TaskFinder.BusinessLogic.Models;

namespace TaskFinder.BusinessLogic.Mappings
{
    public class ApplicationMappings : Profile
    {
        public ApplicationMappings()
        {
            CreateMap<DataAccess.Models.Example, Example>();
            CreateMap<DataAccess.Models.Task, TaskLite>();
            CreateMap<DataAccess.Models.Task, Task>();
            CreateMap<Task, DataAccess.Models.Task>();
        }
    }
}
