import ApiService from './apiService';
import PathService from '../helpers/pathService';
import TaskLite from '../models/TaskLite';

export default class SearchService {
    private apiService: ApiService;

    public constructor() {
        this.apiService = new ApiService(PathService.searchController);
    }

    public async getTasks(query: string): Promise<TaskLite[] | null> {
        const params = new URLSearchParams({ query });
        return await this.apiService.get<TaskLite[]>(PathService.getTasks, params) || null;
    }
}