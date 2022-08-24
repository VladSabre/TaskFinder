using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;
using TaskFinder.DataAccess;

namespace TaskFinder.BusinessLogic.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskFinderDbContext _context;
        private readonly IMapper _mapper;

        public TaskService(TaskFinderDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<TaskLite> GetTasks(Filter filter)
        {
            var tasks = _context.Tasks
                .OrderByDescending(x => x.DateAdded)
                .Skip(filter.Skip)
                .Take(filter.Take);

            return _mapper.ProjectTo<TaskLite>(tasks).ToList();
        }

        public Task GetTask(int id)
        {
            var task = _context.Tasks.Find(id);

            return _mapper.Map<Task>(task);
        }

        public int AddTask(Task task)
        {
            var mappedTask = _mapper.Map<DataAccess.Models.Task>(task);

            _context.Tasks.Add(mappedTask);
            _context.SaveChanges();

            return mappedTask.Id;
        }
    }
}
