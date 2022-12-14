using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;

namespace TaskFinder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _service;
        private readonly IMapper _mapper;

        public TaskController(ITaskService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<TaskLite>> GetTasks(Filter filter)
        {
            var tasks = _service.GetTasks(_mapper.Map<Filter>(filter));

            return Ok(_mapper.Map<List<TaskLite>>(tasks));
        }

        [HttpGet]
        public ActionResult<Task> GetTask(int id)
        {
            var task = _service.GetTask(id);

            return Ok(_mapper.Map<Task>(task));
        }

        [HttpPost]
        public ActionResult<int> AddTask(Task task)
        {
            var result = _service.AddTask(_mapper.Map<Task>(task));

            if (result.Item1 == null)
            {
                var modelState = new ModelStateDictionary();

                foreach(var error in result.Item2)
                {
                    modelState.AddModelError(error.Key, error.Value);
                }

                return BadRequest(modelState);
            }

            return Ok(result.Item1);
        }
    }
}
