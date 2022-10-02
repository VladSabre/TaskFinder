import React from 'react';
import { Form } from 'react-bootstrap';

interface FormGroupProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    useTextArea?: boolean;
    isValid: boolean;
}

const defaultProps = {
    isValid: true,
};

const textFormGroup = function TextFormGroup(props: FormGroupProps): JSX.Element {
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value), [props]);

    const renderControl = React.useCallback(() =>
        props.useTextArea ?
            <Form.Control
                as="textarea"
                rows={6}
                value={props.value}
                placeholder={props.placeholder}
                onChange={onChange}
                isValid={props.isValid ? undefined : false}
            /> :
            <Form.Control
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                onChange={onChange}
                isValid={props.isValid ? undefined : false}
            />
    , [props]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            {renderControl()}
        </Form.Group>
    );
};

textFormGroup.defaultProps = defaultProps;

export default textFormGroup;