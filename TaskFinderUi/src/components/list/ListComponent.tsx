import React from 'react';
import { ListGroup } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import Filter from '../../models/Filter';
import TaskLite from '../../models/TaskLite';
import TaskService from '../../services/taskService';
import DetailedTask from '../detailedTask/DetailedTaskComponent';
import Loader from '../loader/LoaderComponent';

import './ListComponent.scss';

interface ListState {
    page: number;
    tasks: TaskLite[];
    openedTask: TaskLite | null;
    taskCount: number;
    isLoading: boolean;
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
            tasks: [],
            openedTask: null,
            taskCount: 0,
            isLoading: true
        };

        this.taskService = new TaskService();

        this.onScrolled = this.onScrolled.bind(this);
        this.onTaskOpened = this.onTaskOpened.bind(this);
        this.onTaskClosed = this.onTaskClosed.bind(this);
    }

    private getFilter(): Filter {
        return {
            take: this.pageSize,
            skip: this.state.page * this.pageSize
        };
    }

    private renderListElement(task: TaskLite): JSX.Element {
        return (
            <ListGroup.Item action
                key={task.id}
                className="list-item"
                onClick={() => this.onTaskOpened(task)}>
                <p className="h3">{task.name}</p>
                <p className="list-item__description">{task.description}</p>
            </ListGroup.Item>
        );
    }

    private onScrolled(): void {
        const offSet = 100;
        const isNotAtTheBottom = window.innerHeight + document.documentElement.scrollTop + offSet
            < document.documentElement.offsetHeight;

        if (isNotAtTheBottom || this.state.isLoading || this.state.tasks.length === this.state.taskCount)
            return;

        this.setState(state => ({
            isLoading: true,
            page: state.page + 1
        }));
    }

    private onTaskOpened(task: TaskLite): void {
        this.setState({ openedTask: task });
    }

    private onTaskClosed(): void {
        this.setState({ openedTask: null });
    }

    private renderDetailsDialog(): JSX.Element | null {
        if (this.state.openedTask === null)
            return null;

        return (
            <DetailedTask
                task={this.state.openedTask}
                onCloseDialog={this.onTaskClosed}
            />
        );
    }

    private renderLoader(): JSX.Element | null {
        if (!this.state.isLoading)
            return null;

        return (
            <ListGroup.Item key={-1} className="list-item">
                <Loader />
            </ListGroup.Item>
        );
    }

    public async componentDidMount(): Promise<void> {
        const count = await this.taskService.getTaskCount();

        const tasks = count ?? 0 > 0 ? await this.taskService.getTasks(this.getFilter()) : [];

        if (count == null || !tasks) {
            this.props.fireNotification(false, LocalizationService.loadingError);
            this.setState({ isLoading: false });
            return;
        }

        this.setState({
            tasks,
            taskCount: count,
            isLoading: false
        });

        window.addEventListener('scroll', this.onScrolled);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('scroll', this.onScrolled);
    }

    public async componentDidUpdate(_: ListProps, oldState: ListState): Promise<void> {
        if (this.state.page === oldState.page)
            return;

        const tasks = await this.taskService.getTasks(this.getFilter());

        if (!tasks) {
            this.props.fireNotification(false, LocalizationService.loadingError);
            this.setState({ isLoading: false });
            return;
        }

        this.setState({
            tasks: oldState.tasks.concat(tasks),
            isLoading: false
        });
    }

    public render(): JSX.Element {
        const list = this.props.addedTasks.concat(this.state.tasks).map(x => this.renderListElement(x));
        const loader = this.renderLoader();
        if (loader)
            list.push(loader);

        return (<>
            {this.renderDetailsDialog()}
            <ListGroup>
                {list}
            </ListGroup>
        </>);
    }
}