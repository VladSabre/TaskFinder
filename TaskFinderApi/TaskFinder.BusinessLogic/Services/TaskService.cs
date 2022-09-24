using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;
using TaskFinder.BusinessLogic.Validation;
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
                .Skip(filter != null ? filter.Skip : 0);

            if (filter != null && filter.Take > 0)
                tasks = tasks.Take(filter.Take);

            return _mapper.ProjectTo<TaskLite>(tasks).ToList();
        }

        public Task GetTask(int id)
        {
            var task = _context.Tasks.Find(id);

            return _mapper.Map<Task>(task);
        }

        public (int?, Dictionary<string, string>) AddTask(Task task)
        {
            var mappedTask = _mapper.Map<DataAccess.Models.Task>(task);

            var errorMessages = ValidateTask(task);

            if (errorMessages.Any())
                return (null, errorMessages);

            _context.Tasks.Add(mappedTask);
            _context.SaveChanges();

            return (mappedTask.Id, errorMessages);
        }

        private Dictionary<string, string> ValidateTask(Task task)
        {
            var messages = new Dictionary<string, string>();

            if (task == null)
                messages.Add(nameof(ValidationMessages.TaskIsEmpty), ValidationMessages.TaskIsEmpty);
            else if (string.IsNullOrWhiteSpace(task.Name))
                messages.Add(nameof(ValidationMessages.NameIsEmpty), ValidationMessages.NameIsEmpty);
            else if (_context.Tasks.Any(x => x.Name == task.Name))
                messages.Add(nameof(ValidationMessages.NameAlreadyExists), ValidationMessages.NameAlreadyExists);
            if (string.IsNullOrWhiteSpace(task.Description))
                messages.Add(nameof(ValidationMessages.DescriptionIsEmpty), ValidationMessages.DescriptionIsEmpty);
            if (task.Examples.Count == 0)
                messages.Add(nameof(ValidationMessages.NoExamples), ValidationMessages.NoExamples);
            else if (task.Examples.Any(x => string.IsNullOrWhiteSpace(x.InputText) || string.IsNullOrWhiteSpace(x.OutputText)))
                messages.Add(nameof(ValidationMessages.NotValidExample), ValidationMessages.NotValidExample);
            if (string.IsNullOrWhiteSpace(task.Code))
                messages.Add(nameof(ValidationMessages.CodeIsEmpty), ValidationMessages.CodeIsEmpty);

            return messages;
        }
    }
}
