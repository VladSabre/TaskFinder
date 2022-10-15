import ApiService from './apiService';
import PathService from '../helpers/pathService';
import TaskLite from '../models/TaskLite';
import Task from '../models/Task';
import Filter from '../models/Filter';
import { TaskCreationResult } from '../models/TaskCreationResult';

export default class TaskService {
    private apiService: ApiService;

    public constructor() {
        this.apiService = new ApiService(PathService.taskController);
    }

    public async getTaskCount(): Promise<number | null> {
        const count = await this.apiService.getAsync<number>(PathService.getTaskCount) || 0;

        return Promise.resolve(35 + count);
    }

    public async getTasks(filter: Filter): Promise<TaskLite[] | null> {
        const params = new URLSearchParams({
            take: filter.take.toString(),
            skip: filter.skip.toString()
        });

        return await this.apiService.getAsync<TaskLite[]>(PathService.getTasks, params) || [];
    }

    public async getTask(id: number): Promise<Task | null> {
        const params = new URLSearchParams({ id: id.toString() });
        return await this.apiService.getAsync<Task>(PathService.getTask, params) || null;
    }

    public async addTasks(data: Task): Promise<TaskCreationResult | null> {
        return await this.apiService.postAsync<Task, TaskCreationResult>(PathService.addTasks, data) || null;
    }
}