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
        return Promise.resolve(35);
    }

    public async getTasks(filter: Filter): Promise<TaskLite[] | null> {
        // const params = new URLSearchParams({
        //     take: filter.take.toString(),
        //     skip: filter.skip.toString()
        // });
        //return await this.apiService.getAsync<TaskLite[]>(PathService.getTasks, params) || null;

        await new Promise(resolve => setTimeout(resolve, 3000));

        if (filter.skip > 0) {
            return Promise.resolve([
                { Id: 20, Name: 'Task20', Description: 'Description 0' },
                { Id: 21, Name: 'Task21', Description: 'Description 1' },
                { Id: 22, Name: 'Task22', Description: 'Description 2' },
                { Id: 23, Name: 'Task23', Description: 'Description 3' },
                { Id: 24, Name: 'Task24', Description: 'Description 4' },
                { Id: 25, Name: 'Task25', Description: 'Description 5' },
                { Id: 26, Name: 'Task26', Description: 'Description 6' },
                { Id: 27, Name: 'Task27', Description: 'Description 7' },
                { Id: 28, Name: 'Task28', Description: 'Description 8' },
                { Id: 29, Name: 'Task29', Description: 'Description 9' },
                { Id: 30, Name: 'Task30', Description: 'Description 10' },
                { Id: 31, Name: 'Task31', Description: 'Description 11' },
                { Id: 32, Name: 'Task32', Description: 'Description 12' },
                { Id: 33, Name: 'Task33', Description: 'Description 13' },
                { Id: 34, Name: 'Task34', Description: 'Description 14' },
            ]);
        }

        const description = 'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\n'
            + 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\n'
            + 'Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.';

        return Promise.resolve([
            { Id: 0, Name: 'Task0', Description: description },
            { Id: 1, Name: 'Task1', Description: 'Description 1' },
            { Id: 2, Name: 'Task2', Description: 'Description 2' },
            { Id: 3, Name: 'Task3', Description: 'Description 3' },
            { Id: 4, Name: 'Task4', Description: 'Description 4' },
            { Id: 5, Name: 'Task5', Description: 'Description 5' },
            { Id: 6, Name: 'Task6', Description: 'Description 6' },
            { Id: 7, Name: 'Task7', Description: 'Description 7' },
            { Id: 8, Name: 'Task8', Description: 'Description 8' },
            { Id: 9, Name: 'Task9', Description: 'Description 9' },
            { Id: 10, Name: 'Task10', Description: 'Description 10' },
            { Id: 11, Name: 'Task11', Description: 'Description 11' },
            { Id: 12, Name: 'Task12', Description: 'Description 12' },
            { Id: 13, Name: 'Task13', Description: 'Description 13' },
            { Id: 14, Name: 'Task14', Description: 'Description 14' },
            { Id: 15, Name: 'Task15', Description: 'Description 15' },
            { Id: 16, Name: 'Task16', Description: 'Description 16' },
            { Id: 17, Name: 'Task17', Description: 'Description 17' },
            { Id: 18, Name: 'Task18', Description: 'Description 18' },
            { Id: 19, Name: 'Task19', Description: 'Description 19' },
        ]);
    }

    public async getTask(taskId: number): Promise<Task | null> {
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
            Id: 5,
            Name: 'Task 1',
            Description: description,
            Examples: [{
                Id: 1,
                Index: 1,
                InputText: 'nums1 = [1,3], nums2 = [2]',
                OutputText: '2.00000',
                Explanation: 'merged array = [1,2,3] and median is 2.'
            },
            {
                Id: 2,
                Index: 2,
                InputText: 'nums1 = [1,2], nums2 = [3,4]',
                OutputText: '2.50000',
                Explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
            }],
            Code: code
        });

        const params = new URLSearchParams({ taskId: taskId.toString() });
        return await this.apiService.getAsync<Task>(PathService.getTask, params) || null;
    }

    public async addTasks(data: Task): Promise<TaskCreationResult | null> {
        return await this.apiService.postAsync<Task, TaskCreationResult>(PathService.addTasks, data) || null;
    }
}