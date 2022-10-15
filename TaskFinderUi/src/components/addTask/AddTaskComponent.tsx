import React from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import { Example, NewExample } from '../../models/Example';
import Task from '../../models/Task';
import { TaskCreationResult } from '../../models/TaskCreationResult';
import ExamplesControl from '../controls/ExamplesControlComponent';
import TextFormGroup from '../controls/TextFormGroupComponent';

interface AddTaskProps {
    isShown: boolean;
    onCloseDialog: () => void;
    onAddTask: (task: Task) => Promise<TaskCreationResult | null>;
}

interface AddTaskState {
    task: Task;
    isNameNotValid: boolean;
    isDescriptionNotValid: boolean;
    areExamplesNotValid: boolean;
    isCodeNotValid: boolean;
    isLoading: boolean;
    validationMessages: string[];
}

export default class AddTask extends React.Component<AddTaskProps, AddTaskState> {
    public constructor(props: AddTaskProps) {
        super(props);

        this.state = {
            task: {
                name: '',
                description: '',
                examples: [],
                code: ''
            },
            isNameNotValid: false,
            isDescriptionNotValid: false,
            areExamplesNotValid: false,
            isCodeNotValid: false,
            isLoading: false,
            validationMessages: []
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onExamplesChanged = this.onExamplesChanged.bind(this);
        this.onCodeChanged = this.onCodeChanged.bind(this);
        this.onTaskSaved = this.onTaskSaved.bind(this);
    }

    private async onTaskSaved(): Promise<void> {
        const task = this.state.task;

        const isNameNotValid = task.name.trim() === '';
        const isDescriptionNotValid = task.description.trim() === '';
        const isCodeNotValid = task.code.trim() === '';
        const areExamplesNotValid = task.examples.length === 0 ||
            task.examples.some(x => x.inputText.trim() === '' || x.outputText.trim() === '');

        const isNotValid = (): boolean => {
            return isNameNotValid
                || isDescriptionNotValid
                || areExamplesNotValid
                || isCodeNotValid;
        };

        this.setState({
            isNameNotValid,
            isDescriptionNotValid,
            areExamplesNotValid,
            isCodeNotValid
        });

        if (isNotValid())
            return;

        this.setState({
            isLoading: true
        });

        const result = await this.props.onAddTask(task);
        this.setState({ isLoading: false });

        if (result === null)
            return;

        if (result.validationResult && result.validationResult?.size > 0) {
            this.setState({
                validationMessages: Array.from(result.validationResult.values())
            });
        }
        else
            this.props.onCloseDialog();
    }

    private onNameChanged(name: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                name: name
            }
        }));
    }

    private onDescriptionChanged(description: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                description: description
            }
        }));
    }

    private onExamplesChanged(examples: NewExample[]): void {
        const mapped: Example[] = examples.map((x, index) => {
            return { ...x, index: index };
        });

        this.setState(state => ({
            task: {
                ...state.task,
                examples: mapped
            }
        }));
    }

    private onCodeChanged(code: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                code: code
            }
        }));
    }

    private renderFormGroup(
        label: string,
        value: string,
        isValid: boolean,
        onChange: (value: string) => void,
        isTextArea = false
    ): JSX.Element {
        return (
            <TextFormGroup
                label={label}
                value={value}
                useTextArea={isTextArea}
                isValid={isValid}
                onChange={onChange}
            />
        );
    }

    private renderExamplesControls(): JSX.Element {
        const examples = this.state.task.examples as NewExample[];

        if (examples.length === 0)
            examples.push({
                inputText: '',
                outputText: ''
            });

        return (
            <ExamplesControl
                values={examples}
                isValid={this.state.areExamplesNotValid}
                onChange={this.onExamplesChanged}
            />
        );
    }

    private renderContent(): JSX.Element {
        if (this.state.isLoading)
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{LocalizationService.loading}</span>
                </Spinner>
            );

        return (
            <Form>
                {this.renderFormGroup(LocalizationService.nameField,
                    this.state.task.name,
                    !this.state.isNameNotValid,
                    this.onNameChanged)}
                {this.renderFormGroup(LocalizationService.description,
                    this.state.task.description,
                    !this.state.isDescriptionNotValid,
                    this.onDescriptionChanged,
                    true)}
                {this.renderExamplesControls()}
                {this.renderFormGroup(LocalizationService.code,
                    this.state.task.code,
                    !this.state.isCodeNotValid,
                    this.onCodeChanged,
                    true)}
            </Form>
        );
    }

    public render(): JSX.Element {
        return (
            <Modal show={this.props.isShown} onHide={this.props.onCloseDialog} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{LocalizationService.addTask}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onCloseDialog}>
                        {LocalizationService.close}
                    </Button>
                    <Button variant="primary" onClick={this.onTaskSaved}>
                        {LocalizationService.add}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}