using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;

namespace TaskFinder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _service;
        private readonly IMapper _mapper;

        public SearchController(ISearchService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet("{query}")]
        public ActionResult<List<TaskLite>> GetTasks(string query)
        {
            var tasks = _service.Search(query);

            return Ok(_mapper.Map<List<TaskLite>>(tasks));
        }
    }
}
