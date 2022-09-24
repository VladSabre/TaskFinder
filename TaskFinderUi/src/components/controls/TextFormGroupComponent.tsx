import React from 'react';
import { Form } from 'react-bootstrap';

interface ForGroupProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    useTextArea?: boolean;
}

export default function TextFormGroup(props: ForGroupProps): JSX.Element {
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value), [props]);

    const renderControl = React.useCallback(() =>
        props.useTextArea ?
            <Form.Control
                as="textarea"
                value={props.value}
                placeholder={props.placeholder}
                onChange={onChange}
            /> :
            <Form.Control
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                onChange={onChange}
            />
    , [props]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            {renderControl()}
        </Form.Group>
    );
}