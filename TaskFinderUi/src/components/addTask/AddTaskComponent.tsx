import React from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import { Example, NewExample } from '../../models/Example';
import Task from '../../models/Task';
import { TaskCreationResult } from '../../models/TaskCreationResult';
import ExamplesControl from '../controls/ExamplesControlComponent';
import TextFormGroup from '../controls/TextFormGroupComponent';

import './AddTaskComponent.scss';

interface AddTaskProps {
    isShown: boolean;
    onCloseDialog: () => void;
    onAddTask: (task: Task) => Promise<TaskCreationResult | null>;
}

interface AddTaskState {
    task: Task;
    isNameNotValid: boolean;
    isDescriptionNotValid: boolean;
    areExamplesNotValid: boolean[];
    isCodeNotValid: boolean;
    isLoading: boolean;
    validationMessages: string[];
}

export default class AddTask extends React.Component<AddTaskProps, AddTaskState> {
    public constructor(props: AddTaskProps) {
        super(props);

        this.state = this.getDefaultState();

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onExamplesChanged = this.onExamplesChanged.bind(this);
        this.onCodeChanged = this.onCodeChanged.bind(this);
        this.onTaskSaved = this.onTaskSaved.bind(this);
        this.discard = this.discard.bind(this);
    }

    private async onTaskSaved(): Promise<void> {
        if (this.isTaskNotValid())
            return;

        this.setState({
            isLoading: true
        });

        const result = await this.props.onAddTask(this.state.task);
        this.setState({ isLoading: false });

        if (result === null)
            return;

        if (result.validationResult && Object.keys(result.validationResult).length > 0) {
            this.setState({
                validationMessages: Array.from(Object.values(result.validationResult))
            });
        }
        else {
            this.discard();
        }
    }

    private mapExamplesValidation(areExamplesNotValid: boolean[]): boolean {
        return areExamplesNotValid.length === 0
            || areExamplesNotValid.some(x => x);
    }

    private isTaskNotValid(): boolean {
        const task = this.state.task;

        const isNameNotValid = this.isNameNotValild(task.name);
        const isDescriptionNotValid = this.isDescriptionNotValild(task.description);
        const isCodeNotValid = this.isCodeNotValild(task.code);
        const areExamplesNotValid = this.areExamplesNotValild(task.examples);

        const isNotValid = (): boolean => {
            return isNameNotValid
                || isDescriptionNotValid
                || this.mapExamplesValidation(areExamplesNotValid)
                || isCodeNotValid;
        };

        this.setState({
            isNameNotValid,
            isDescriptionNotValid,
            areExamplesNotValid,
            isCodeNotValid
        });

        return isNotValid();
    }

    private isNameNotValild(name: string): boolean {
        return name.trim() === '';
    }

    private isDescriptionNotValild(description: string): boolean {
        return description.trim() === '';
    }

    private isCodeNotValild(code: string): boolean {
        return code.trim() === '';
    }

    private areExamplesNotValild(examples: Example[]): boolean[] {
        if (examples.length === 0)
            return [];

        return examples.map(x => x.inputText.trim() === '' || x.outputText.trim() === '');
    }

    private getDefaultState(): AddTaskState {
        return {
            task: {
                name: '',
                description: '',
                examples: [],
                code: ''
            },
            isNameNotValid: false,
            isDescriptionNotValid: false,
            areExamplesNotValid: [false],
            isCodeNotValid: false,
            isLoading: false,
            validationMessages: []
        };
    }

    private onNameChanged(name: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                name: name
            },
            isNameNotValid: this.isNameNotValild(name)
        }));
    }

    private onDescriptionChanged(description: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                description: description
            },
            isDescriptionNotValid: this.isDescriptionNotValild(description)
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
            },
            areExamplesNotValid: this.mapExamplesValidation(state.areExamplesNotValid)
                ? this.areExamplesNotValild(mapped)
                : state.areExamplesNotValid
        }));
    }

    private onCodeChanged(code: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                code: code
            },
            isCodeNotValid: this.isCodeNotValild(code)
        }));
    }

    private discard(): void {
        this.setState({
            ...this.getDefaultState()
        });
        this.props.onCloseDialog();
    }

    private renderFormGroup(
        label: string,
        value: string,
        isInvalid: boolean,
        onChange: (value: string) => void,
        isTextArea = false
    ): JSX.Element {
        return (
            <TextFormGroup
                label={label}
                value={value}
                useTextArea={isTextArea}
                isInvalid={isInvalid}
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
                areExamplesInvalid={this.state.areExamplesNotValid}
                onChange={this.onExamplesChanged}
            />
        );
    }

    private renderValidationErrors(): JSX.Element | null {
        if (this.state.validationMessages.length === 0)
            return null;

        return (
            <Alert variant="danger">
                <ul className="validation-list">
                    {this.state.validationMessages.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
            </Alert>
        );
    }

    private renderContent(): JSX.Element {
        if (this.state.isLoading)
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{LocalizationService.loading}</span>
                </Spinner>
            );

        return (<>
            {this.renderValidationErrors()}
            <Form noValidate>
                {this.renderFormGroup(LocalizationService.nameField,
                    this.state.task.name,
                    this.state.isNameNotValid,
                    this.onNameChanged)}
                {this.renderFormGroup(LocalizationService.description,
                    this.state.task.description,
                    this.state.isDescriptionNotValid,
                    this.onDescriptionChanged,
                    true)}
                {this.renderExamplesControls()}
                {this.renderFormGroup(LocalizationService.code,
                    this.state.task.code,
                    this.state.isCodeNotValid,
                    this.onCodeChanged,
                    true)}
            </Form>
        </>);
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
                    <Button variant="secondary" onClick={this.discard}>
                        {LocalizationService.discardAndClose}
                    </Button>
                    <Button variant="primary" onClick={this.onTaskSaved}>
                        {LocalizationService.add}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}