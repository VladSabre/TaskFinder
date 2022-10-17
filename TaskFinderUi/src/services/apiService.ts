import { AddTrailingSlash, RemoveTrailingSlash } from '../helpers/urlHelper';
import LocalizationService from '../helpers/localizationService';

export default class ApiService {
    private baseUrl: string;

    public constructor(controller: string) {
        if (!process.env.REACT_APP_API_URL)
            throw new Error('API Url is not set');

        this.baseUrl = AddTrailingSlash(process.env.REACT_APP_API_URL) + AddTrailingSlash(controller);
    }

    private defaultFail(): void {
        console.error(LocalizationService.loadingError);
    }

    public async get<T>(action: string, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | T> {
        return this.getAsyncInternal<T>((res: Response) => res.json(), action, params, fail);
    }

    public async getResponsless(action: string, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | boolean> {
        return this.getAsyncInternal<boolean>((res: Response) => res.ok, action, params, fail);
    }

    public async post<TRequest, TResponse>(action: string, data: TRequest, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | TResponse> {
        const url = this.baseUrl + RemoveTrailingSlash(action) + (params !== undefined ? `?${params}` : '');
        const request = {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
        };
        return fetch(url, request)
            .then(res => res.ok ? res.json() : {} as TResponse)
            .then(
                (result: TResponse) => result,
                (error) => {
                    console.error(error);
                    fail();
                }
            );
    }

    private async getAsyncInternal<T>(responseCallback: (res: Response) => any, action: string, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | T> {
        const url = this.baseUrl + RemoveTrailingSlash(action) + (params !== undefined ? `?${params}` : '');
        return fetch(url)
            .then(res => responseCallback(res))
            .then(
                (result: T) => result,
                (error) => {
                    console.error(error);
                    fail();
                }
            );
    }
}