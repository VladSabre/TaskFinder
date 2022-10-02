import { ValidationCode } from './ValidationCode';

export interface TaskCreationResult {
    Id?: number;
    ValidationResult?: Map<ValidationCode, string>;
}