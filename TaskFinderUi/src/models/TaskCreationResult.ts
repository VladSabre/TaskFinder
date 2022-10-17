import { ValidationCode } from './ValidationCode';

export interface TaskCreationResult {
    id: number | null;
    validationResult?: { [key: string]: string; }//KeyValuePair<string>[];
}