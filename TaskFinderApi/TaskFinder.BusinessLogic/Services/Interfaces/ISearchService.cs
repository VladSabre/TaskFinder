using System.Collections.Generic;
using TaskFinder.BusinessLogic.Models;

namespace TaskFinder.BusinessLogic.Services.Interfaces
{
    public interface ISearchService
    {
        List<TaskLite> Search(string query);
    }
}
