import React from 'react';
import { Form, Nav, Button, Navbar, Container } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';

import './HeaderComponent.scss';

interface HeaderProps {
    onSearchPerformed: (query: string) => void;
    onAddClicked: () => void;
    onImportClicked: () => void;
}

export default function Header(props: HeaderProps): JSX.Element {
    const intervalDuration = 1000;
    let interval: NodeJS.Timer;

    const onSearchTyped = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (interval)
            clearInterval(interval);

        interval = setInterval(() => {
            props.onSearchPerformed(e.target.value);
        }, intervalDuration);
    }, [props]);

    return (
        <Navbar sticky="top" className="header">
            <Container fluid>
                <Nav>
                    <Nav.Item className="me-2">
                        <Button variant="primary" onClick={props.onAddClicked}>{LocalizationService.addTask}</Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="secondary" onClick={props.onImportClicked}>{LocalizationService.importTask}</Button>
                    </Nav.Item>
                </Nav>
                <Nav className="d-flex">
                    <Form.Control type="text" placeholder={`${LocalizationService.search}`} onChange={onSearchTyped} />
                </Nav>
            </Container>
        </Navbar>
    );
}