using System.Collections.Generic;
using TaskFinder.BusinessLogic.Models;

namespace TaskFinder.BusinessLogic.Services.Interfaces
{
    public interface ITaskService
    {
        List<TaskLite> GetTasks(Filter filter);

        Task GetTask(int id);

        TaskCreationResult AddTask(Task task);

        bool RemoveTask(int id);
    }
}
