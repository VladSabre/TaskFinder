import ApiService from './apiService';
import PathService from '../helpers/pathService';
import TaskLite from '../models/TaskLite';
import Task from '../models/Task';
import Filter from '../models/Filter';

export default class TaskService {
    private apiService: ApiService;

    public constructor() {
        this.apiService = new ApiService(PathService.taskController);
    }

    public async getTasks(filter: Filter): Promise<TaskLite[] | null> {
        const params = new URLSearchParams({
            take: filter.take.toString(),
            skip: filter.skip.toString()
        });
        //return await this.apiService.getAsync<TaskLite[]>(PathService.getTasks, params) || null;

        return Promise.resolve([
            { Id: 0, Name: 'Task1', Description: 'Description 1' },
            { Id: 1, Name: 'Task2', Description: 'Description 2' },
            { Id: 2, Name: 'Task3', Description: 'Description 3' },
            { Id: 3, Name: 'Task4', Description: 'Description 4' },
            { Id: 4, Name: 'Task5', Description: 'Description 5' }
        ]);
    }

    public async getTask(taskId: number): Promise<Task | null> {
        const params = new URLSearchParams({ taskId: taskId.toString() });
        return await this.apiService.getAsync<Task>(PathService.getTask, params) || null;
    }

    public async addTasks(data: Task): Promise<number | null> {
        return await this.apiService.postAsync<Task, number>(PathService.addTasks, data) || null;
    }
}