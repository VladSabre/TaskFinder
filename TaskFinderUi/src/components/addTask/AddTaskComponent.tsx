import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import { Example, NewExample } from '../../models/Example';
import Task from '../../models/Task';
import ExamplesControl from '../controls/ExamplesControlComponent';
import TextFormGroup from '../controls/TextFormGroupComponent';

interface AddTaskProps {
    isShown: boolean;
    onCloseDialog: () => void;
    onAddTask: (task: Task) => void;
}

interface AddTaskState {
    task: Task;
    isNameNotValid: boolean;
    isDescriptionNotValid: boolean;
    areExamplesNotValid: boolean;
    isCodeNotValid: boolean;
}

export default class AddTask extends React.Component<AddTaskProps, AddTaskState> {
    public constructor(props: AddTaskProps) {
        super(props);

        this.state = {
            task: {
                Name: '',
                Description: '',
                Examples: [],
                Code: ''
            },
            isNameNotValid: false,
            isDescriptionNotValid: false,
            areExamplesNotValid: false,
            isCodeNotValid: false
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onExamplesChanged = this.onExamplesChanged.bind(this);
        this.onCodeChanged = this.onCodeChanged.bind(this);
    }

    private addTask(): void {
        const task = this.state.task;

        const isNameNotValid = task.Name.trim() === '';
        const isDescriptionNotValid = task.Description.trim() === '';
        const isCodeNotValid = task.Code.trim() === '';
        const areExamplesNotValid = task.Examples.length === 0 ||
            task.Examples.some(x => x.InputText.trim() === '' || x.OutputText.trim() === '');

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

        if (!isNotValid())
            this.props.onAddTask(task);
    }

    private onNameChanged(name: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                Name: name
            }
        }));
    }

    private onDescriptionChanged(description: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                Description: description
            }
        }));
    }

    private onExamplesChanged(examples: NewExample[]): void {
        const mapped: Example[] = examples.map((x, index) => {
            return { ...x, Index: index };
        });

        this.setState(state => ({
            task: {
                ...state.task,
                Examples: mapped
            }
        }));
    }

    private onCodeChanged(code: string): void {
        this.setState(state => ({
            task: {
                ...state.task,
                Code: code
            }
        }));
    }

    private renderFormGroup(label: string, value: string, onChange: (value: string) => void, isTextArea = false): JSX.Element {
        return (
            <TextFormGroup
                label={label}
                value={value}
                useTextArea={isTextArea}
                onChange={onChange}
            />
        );
    }

    private renderExamplesControls(): JSX.Element {
        const examples = this.state.task.Examples as NewExample[];

        if (examples.length === 0)
            examples.push({
                InputText: '',
                OutputText: ''
            });

        return (
            <ExamplesControl
                values={examples}
                onChange={this.onExamplesChanged}
            />
        );
    }

    public render(): JSX.Element {
        return (
            <Modal show={this.props.isShown} onHide={this.props.onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{LocalizationService.addTask}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {this.renderFormGroup(LocalizationService.nameField,
                            this.state.task.Name, this.onNameChanged)}
                        {this.renderFormGroup(LocalizationService.description,
                            this.state.task.Description, this.onDescriptionChanged)}
                        {this.renderExamplesControls()}
                        {this.renderFormGroup(LocalizationService.code,
                            this.state.task.Code, this.onCodeChanged, true)}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onCloseDialog}>
                        {LocalizationService.close}
                    </Button>
                    <Button variant="primary" onClick={this.addTask}>
                        {LocalizationService.add}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}