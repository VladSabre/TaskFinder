namespace TaskFinder.BusinessLogic.Validation
{
    public static class ValidationMessages
    {
        public static readonly string TaskIsEmpty = "A task wasn't provided";
        public static readonly string NameIsEmpty = "Name wasn't specified";
        public static readonly string NameAlreadyExists = "A task with the specified name was already added";
        public static readonly string DescriptionIsEmpty = "Description wasn't specified";
        public static readonly string NoExamples = "At least one example should be added";
        public static readonly string NotValidExample = "An example was added either without input or without output";
        public static readonly string CodeIsEmpty = "Code wasn't provided";
    }
}
