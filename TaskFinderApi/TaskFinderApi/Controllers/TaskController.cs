using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;

namespace TaskFinder.Api.Controllers
{
    public class TaskController : Controller
    {
        private readonly ITaskService _service;
        private readonly IMapper _mapper;

        public TaskController(ITaskService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public ActionResult<List<TaskLite>> GetTasks(Filter filter)
        {
            var tasks = _service.GetTasks(_mapper.Map<Filter>(filter));

            return Ok(_mapper.Map<List<TaskLite>>(tasks));
        }

        public ActionResult<Task> GetTask(int id)
        {
            var task = _service.GetTask(id);

            return Ok(_mapper.Map<Task>(task));
        }

        public ActionResult<int> AddTask(Task task)
        {
            return Ok(_service.AddTask(_mapper.Map<Task>(task)));
        }
    }
}
