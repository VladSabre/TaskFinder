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

        public TaskCreationResult AddTask(Task task)
        {
            var mappedTask = _mapper.Map<DataAccess.Models.Task>(task);

            var result = new TaskCreationResult(ValidateTask(task));

            if (result.ValidationResult.Any())
                return result;

            _context.Tasks.Add(mappedTask);
            _context.SaveChanges();

            return new TaskCreationResult(mappedTask.Id);
        }

        public bool RemoveTask(int id)
        {
            var task = _context.Tasks.Find(id);

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return true;
        }

        private Dictionary<ValidationCode, string> ValidateTask(Task task)
        {
            var messages = new Dictionary<ValidationCode, string>();

            if (task == null)
                messages.Add(ValidationCode.TaskIsEmpty, ValidationMessages.TaskIsEmpty);
            else if (string.IsNullOrWhiteSpace(task.Name))
                messages.Add(ValidationCode.NameIsEmpty, ValidationMessages.NameIsEmpty);
            else if (_context.Tasks.Any(x => x.Name == task.Name))
                messages.Add(ValidationCode.NameAlreadyExists, ValidationMessages.NameAlreadyExists);
            if (string.IsNullOrWhiteSpace(task.Description))
                messages.Add(ValidationCode.DescriptionIsEmpty, ValidationMessages.DescriptionIsEmpty);
            if (task.Examples == null || !task.Examples.Any())
                messages.Add(ValidationCode.NoExamples, ValidationMessages.NoExamples);
            else if (task.Examples.Any(x => string.IsNullOrWhiteSpace(x.InputText) || string.IsNullOrWhiteSpace(x.OutputText)))
                messages.Add(ValidationCode.NotValidExample, ValidationMessages.NotValidExample);
            if (string.IsNullOrWhiteSpace(task.Code))
                messages.Add(ValidationCode.CodeIsEmpty, ValidationMessages.CodeIsEmpty);

            return messages;
        }
    }
}
