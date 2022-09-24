import React from 'react';
import { ListGroup } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import Filter from '../../models/Filter';
import TaskLite from '../../models/TaskLite';
import TaskService from '../../services/taskService';

interface ListState {
    page: number;
    tasks: TaskLite[];
}

interface ListProps {
    addedTasks: TaskLite[];
    fireNotification: (isSuccessful: boolean, message: string) => void
}

export class List extends React.Component<ListProps, ListState> {
    private taskService: TaskService;
    private pageSize = 20;

    constructor(props: ListProps) {
        super(props);

        this.state = {
            page: 0,
            tasks: []
        };

        this.taskService = new TaskService();
    }

    private getFilter(): Filter {
        return {
            take: this.pageSize,
            skip: this.state.page * this.pageSize
        };
    }

    private renderListElement(task: TaskLite): JSX.Element {
        return (
            <ListGroup.Item key={task.Id}>
                <p className="h3">{task.Name}</p>
                <p>{task.Description}</p>
            </ListGroup.Item>
        );
    }

    public async componentDidMount(): Promise<void> {
        const tasks = await this.taskService.getTasks(this.getFilter());

        if (!tasks) {
            this.props.fireNotification(false, LocalizationService.loadingError);
            return;
        }

        this.setState({
            tasks
        });
    }

    public async componentDidUpdate(_: ListProps, oldState: ListState): Promise<void> {
        if (this.state.page === oldState.page)
            return;

        const tasks = await this.taskService.getTasks(this.getFilter());

        if (!tasks) {
            this.props.fireNotification(false, LocalizationService.loadingError);
            return;
        }

        this.setState({
            tasks
        });
    }

    public render(): JSX.Element {
        return (<>
            <ListGroup>
                {this.state.tasks.map(x => this.renderListElement(x))}
            </ListGroup>
        </>);
    }
}