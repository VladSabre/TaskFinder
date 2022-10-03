import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';
import Task from '../../models/Task';
import TaskLite from '../../models/TaskLite';
import TaskService from '../../services/taskService';
import Examples from './ExamplesComponent';

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

    return (
        <Modal show={true} onHide={props.onCloseDialog} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{props.task.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <p>{props.task.description}</p>
                            <Examples data={task.examples} />
                        </Col>
                        <Col>
                            <code>
                                {task.code}
                            </code>
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
