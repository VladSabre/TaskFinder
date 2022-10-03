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
        const realData = await this.apiService.getAsync<TaskLite[]>(PathService.getTasks, params) || [];

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (filter.skip > 0) {
            return Promise.resolve([
                { id: 20, name: 'Task20', description: 'description 0' },
                { id: 21, name: 'Task21', description: 'description 1' },
                { id: 22, name: 'Task22', description: 'description 2' },
                { id: 23, name: 'Task23', description: 'description 3' },
                { id: 24, name: 'Task24', description: 'description 4' },
                { id: 25, name: 'Task25', description: 'description 5' },
                { id: 26, name: 'Task26', description: 'description 6' },
                { id: 27, name: 'Task27', description: 'description 7' },
                { id: 28, name: 'Task28', description: 'description 8' },
                { id: 29, name: 'Task29', description: 'description 9' },
                { id: 30, name: 'Task30', description: 'description 10' },
                { id: 31, name: 'Task31', description: 'description 11' },
                { id: 32, name: 'Task32', description: 'description 12' },
                { id: 33, name: 'Task33', description: 'description 13' },
                { id: 34, name: 'Task34', description: 'description 14' },
            ]);
        }

        const description = 'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\n'
            + 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\n'
            + 'Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.';

        return Promise.resolve(realData?.concat([
            { id: 0, name: 'Task0', description: description },
            { id: 1, name: 'Task1', description: 'description 1' },
            { id: 2, name: 'Task2', description: 'description 2' },
            { id: 3, name: 'Task3', description: 'description 3' },
            { id: 4, name: 'Task4', description: 'description 4' },
            { id: 5, name: 'Task5', description: 'description 5' },
            { id: 6, name: 'Task6', description: 'description 6' },
            { id: 7, name: 'Task7', description: 'description 7' },
            { id: 8, name: 'Task8', description: 'description 8' },
            { id: 9, name: 'Task9', description: 'description 9' },
            { id: 10, name: 'Task10', description: 'description 10' },
            { id: 11, name: 'Task11', description: 'description 11' },
            { id: 12, name: 'Task12', description: 'description 12' },
            { id: 13, name: 'Task13', description: 'description 13' },
            { id: 14, name: 'Task14', description: 'description 14' },
            { id: 15, name: 'Task15', description: 'description 15' },
            { id: 16, name: 'Task16', description: 'description 16' },
            { id: 17, name: 'Task17', description: 'description 17' },
            { id: 18, name: 'Task18', description: 'description 18' },
            { id: 19, name: 'Task19', description: 'description 19' },
        ]));
    }

    public async getTask(taskid: number): Promise<Task | null> {
        const description = 'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\n'
            + 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\n'
            + 'Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.';

        const code = 'public class Solution {\n'
            + '\tpublic double FindMedianSortedArrays(int[] nums1, int[] nums2) {'
            + '\t\tvar nums1Count = nums1.Count();'
            + '\t\tvar nums2Count = nums2.Count();'
            + '\t\tvar sum1, sum2 = 0;'
            + '\t}'
            + '}';

        return Promise.resolve({
            id: 5,
            name: 'Task 1',
            description: description,
            examples: [{
                id: 1,
                index: 1,
                inputText: 'nums1 = [1,3], nums2 = [2]',
                outputText: '2.00000',
                explanation: 'merged array = [1,2,3] and median is 2.'
            },
            {
                id: 2,
                index: 2,
                inputText: 'nums1 = [1,2], nums2 = [3,4]',
                outputText: '2.50000',
                explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
            }],
            code: code
        });

        const params = new URLSearchParams({ taskid: taskid.toString() });
        return await this.apiService.getAsync<Task>(PathService.getTask, params) || null;
    }

    public async addTasks(data: Task): Promise<TaskCreationResult | null> {
        return await this.apiService.postAsync<Task, TaskCreationResult>(PathService.addTasks, data) || null;
    }
}