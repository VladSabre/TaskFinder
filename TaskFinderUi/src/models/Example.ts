export interface Example {
    Id?: number;
    Index: number;
    InputText: string;
    OutputText: string;
    Explanation?: string;
    TaskId?: number;
}

export type NewExample = Omit<Example, 'TaskId' | 'Index'>;