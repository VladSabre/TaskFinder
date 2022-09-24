import React from 'react';
import { Container } from 'react-bootstrap';
import Task from '../../models/Task';
import TaskLite from '../../models/TaskLite';
import TaskService from '../../services/taskService';
import AddTask from '../addTask/AddTaskComponent';
import Header from '../header/HeaderComponent';
import { List } from '../list/ListComponent';

import './AppComponent.scss';

interface AppState {
    addedTasks: TaskLite[];
    isAddTaskDialogShown: boolean;
}

class App extends React.Component<{}, AppState> {
    private taskService: TaskService;

    public constructor() {
        super({} as never);

        this.state = {
            addedTasks: [],
            isAddTaskDialogShown: false
        };

        this.taskService = new TaskService();

        this.fireNotification = this.fireNotification.bind(this);
        this.onSearchPerformed = this.onSearchPerformed.bind(this);
        this.onAddClicked = this.onAddClicked.bind(this);
        this.onTaskAdded = this.onTaskAdded.bind(this);
        this.onAddTaskDialogClosed = this.onAddTaskDialogClosed.bind(this);
    }

    private fireNotification(isSuccessful: boolean, message: string): void {
        if (isSuccessful)
            console.log(message);
        else
            console.error(message);
    }

    private onSearchPerformed(query: string): void {
        console.log('searched: ' + query);
    }

    private onAddClicked(): void {
        this.setState({ isAddTaskDialogShown: true });
    }

    private async onTaskAdded(task: Task): Promise<void> {
        this.setState(state => ({
            addedTasks: [task as TaskLite].concat(state.addedTasks)
        }));

        await this.taskService.addTasks(task);
    }

    private onAddTaskDialogClosed(): void {
        this.setState({ isAddTaskDialogShown: false });
    }

    private renderAddTaskDialog(): JSX.Element {
        return (
            <AddTask isShown={this.state.isAddTaskDialogShown}
                onCloseDialog={this.onAddTaskDialogClosed}
                onAddTask={this.onTaskAdded}
            />
        );
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Header onSearchPerformed={this.onSearchPerformed} onAddClicked={this.onAddClicked} />
                {this.renderAddTaskDialog()}
                <List addedTasks={this.state.addedTasks} fireNotification={this.fireNotification} />
            </Container>
        );
    }
}

export default App;
