import { Example } from './Example';

export default interface Task {
    Id?: number;
    Name: string;
    Description: string;
    Examples: Example[];
    Code: string;
}