import { Example } from './Example';

export default interface Task {
    id?: number;
    name: string;
    description: string;
    examples: Example[];
    code: string;
}