import React from 'react';
import { Form, Nav, Button, Navbar } from 'react-bootstrap';

import LocalizationService from '../../helpers/localizationService';

import './HeaderComponent.scss';

interface HeaderProps {
    onSearchPerformed: (query: string) => void;
    onAddClicked: () => void;
}

export default function Header(props: HeaderProps): JSX.Element {
    const intervalDuration = 2000;
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
            <Nav>
                <Nav.Item>
                    <Button variant="primary" onClick={props.onAddClicked}>{LocalizationService.addTask}</Button>
                </Nav.Item>
            </Nav>
            <Nav className="justify-content-end">
                <Form.Control type="text" placeholder={`${LocalizationService.search}`} onChange={onSearchTyped} />
            </Nav>
        </Navbar>
    );
}