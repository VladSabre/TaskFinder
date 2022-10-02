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
        Examples: [],
        Code: ''
    };

    const [task, setTask] = React.useState(defaultTask);

    React.useEffect(() => {
        const fetchTask = async () => {
            setTask(await service.getTask(props.task.Id) ?? task);
        };

        fetchTask();

    }, [props.task.Id]);

    const onEdit = React.useCallback(() => { console.log('on edit'); }, []);

    return (
        <Modal show={true} onHide={props.onCloseDialog} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{props.task.Name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <p>{props.task.Description}</p>
                            <Examples data={task.Examples} />
                        </Col>
                        <Col>
                            <code>
                                {task.Code}
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
