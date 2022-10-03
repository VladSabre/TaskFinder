export interface Example {
    id?: number;
    index: number;
    inputText: string;
    outputText: string;
    explanation?: string;
    taskId?: number;
}

export type NewExample = Omit<Example, 'taskId' | 'index'>;