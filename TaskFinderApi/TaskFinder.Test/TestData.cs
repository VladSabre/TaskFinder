using System;
using System.Collections.Generic;
using TaskFinder.DataAccess;
using TaskFinder.DataAccess.Models;

namespace TaskFinder.Test
{
    public static class TestData
    {
        public static Task Task1 { get; set; }

        public static Task Task2 { get; set; }

        public static Task Task3 { get; set; }

        public static Task Task4 { get; set; }

        public static Task Task5 { get; set; }

        public static List<Example> Task3Examples { get; set; }

        public static void AddTasks(TaskFinderDbContext context)
        {
            Task3Examples = new List<Example>
            {
                new Example { Index = 0, InputText = "Input text", OutputText = "Output text" }
            };
            
            Task1 = new Task { Name = "Task1", Description = "Description1", DateAdded = new DateTime(2010, 10, 10) };
            Task2 = new Task { Name = "Task2", Description = "Description2", DateAdded = new DateTime(2012, 10, 10) };
            Task3 = new Task { Name = "Task3", Description = "Description3", DateAdded = new DateTime(2011, 10, 10), Examples = Task3Examples };
            Task4 = new Task { Name = "Perfect Task4", Description = "Description4", DateAdded = new DateTime(2010, 09, 10) };
            Task5 = new Task { Name = "Task5", Description = "Perfect Description5", DateAdded = new DateTime(2013, 10, 10) };

            context.AddRange(Task1, Task2, Task3, Task4, Task5);
        }
    }
}
