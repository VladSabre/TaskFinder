using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TaskFinder.BusinessLogic.Models;
using TaskFinder.BusinessLogic.Services.Interfaces;
using TaskFinder.DataAccess;

namespace TaskFinder.BusinessLogic.Services
{
    public class SearchService : ISearchService
    {
        private readonly TaskFinderDbContext _context;
        private readonly IMapper _mapper;

        public SearchService(TaskFinderDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<TaskLite> Search(string query)
        {
            var ids = _context.Tasks
                .Where(x => x.Name.Contains(query) || x.Description.Contains(query))
                .Select(x => x.Id)
                .ToList();

            var tasks = _context.Tasks
                .Where(x => ids.Contains(x.Id))
                .OrderByDescending(x => x.DateAdded);
            
            return _mapper.ProjectTo<TaskLite>(tasks).ToList();
        }
    }
}
