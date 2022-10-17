import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import Task from '../../models/Task';
import TaskLite from '../../models/TaskLite';
import TaskService from '../../services/taskService';
import Examples from './examples/ExamplesComponent';
import Loader from '../loader/LoaderComponent';

import './DetailedTaskComponent.scss';

interface DetailedTaskProps {
    task: TaskLite;
    onCloseDialog: () => void;
}

export default function DetailedTask(props: DetailedTaskProps): JSX.Element {
    const defaultTask: Task = {
        ...props.task,
        examples: [],
        code: ''
    };

    const [task, setTask] = React.useState(defaultTask);

    React.useEffect(() => {
        const fetchTask = async () => {
            setTask(await service.getTask(props.task.id) ?? task);
        };

        fetchTask();

    }, [props.task.id]);

    const onEdit = React.useCallback(() => { console.log('on edit'); }, []);

    const renderCode = React.useCallback(() => {
        if (task.code === '')
            return (<Loader />);
        return (
            <code>
                <pre>
                    {task.code}
                </pre>
            </code>
        );
    }, [task]);

    return (
        <Modal show={true} onHide={props.onCloseDialog} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{props.task.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <pre className="details-description">{props.task.description}</pre>
                            <Examples data={task.examples} />
                        </Col>
                        <Col>
                            {renderCode()}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onEdit}>
                    {LocalizationService.edit}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const service = new TaskService();
