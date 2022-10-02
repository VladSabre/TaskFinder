import { AddTrailingSlash } from '../helpers/urlHelper';
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

    public get<T>(action: string, success: (result: T) => void, params?: URLSearchParams, fail: () => void = this.defaultFail): void {
        const url = this.baseUrl + AddTrailingSlash(action) + (params ?? '');
        fetch(url)
            .then(res => res.json())
            .then(
                (result: T) => success(result),
                (error) => {
                    console.error(error);
                    fail();
                }
            );
    }

    public async getAsync<T>(action: string, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | T> {
        const url = this.baseUrl + AddTrailingSlash(action) + (params ?? '');
        return fetch(url)
            .then(res => res.json())
            .then(
                (result: T) => result,
                (error) => {
                    console.error(error);
                    fail();
                }
            );
    }

    public async postAsync<TRequest, TResponse>(action: string, data: TRequest, params?: URLSearchParams, fail: () => void = this.defaultFail): Promise<void | TResponse> {
        const url = this.baseUrl + AddTrailingSlash(action) + (params ?? '');
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
}