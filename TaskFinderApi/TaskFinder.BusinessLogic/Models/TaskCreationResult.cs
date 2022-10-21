using System.Collections.Generic;
using TaskFinder.BusinessLogic.Validation;

namespace TaskFinder.BusinessLogic.Models
{
    public class TaskCreationResult
    {
        public int? Id { get; }

        public IDictionary<ValidationCode, string> ValidationResult { get; }

        public TaskCreationResult(int id)
        {
            Id = id;
            ValidationResult = new Dictionary<ValidationCode, string>();
        }

        public TaskCreationResult(IDictionary<ValidationCode, string> validationResult)
        {
            ValidationResult = validationResult;
        }
    }
}
