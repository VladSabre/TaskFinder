import { ValidationCode } from './ValidationCode';

export interface TaskCreationResult {
    id?: number;
    validationResult?: Map<ValidationCode, string>;
}