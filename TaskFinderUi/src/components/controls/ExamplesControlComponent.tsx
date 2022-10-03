import React from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

import LocalizationService from '../../helpers/localizationService';
import { NewExample } from '../../models/Example';

interface ExamplesControlProps {
    values: NewExample[];
    isValid: boolean;
    onChange: (values: NewExample[]) => void;
}

enum ExamplePart {
    Input,
    Output
}

export default function ExamplesControl(props: ExamplesControlProps): JSX.Element {
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number, part: ExamplePart) => {
        const values = props.values;
        const example = values[index];
        const newValue = e.target.value;
        switch (part) {
                case ExamplePart.Input:
                    example.inputText = newValue;
                    break;
                case ExamplePart.Output:
                    example.outputText = newValue;
                    break;
        }

        values.splice(index, 1, example);

        props.onChange(values);
    }, [props]);

    const onAddExample = React.useCallback(() => {
        const newExample: NewExample = {
            inputText: '',
            outputText: ''
        };
        props.onChange(props.values.concat([newExample]));
    }, [props]);

    const onRemoveExample = React.useCallback((index: number) => {
        const filtered = props.values.splice(index, 1);
        props.onChange(filtered);
    }, [props]);

    const example = (example: NewExample, index: number): JSX.Element => (
        <Form.Group className="mb-3" key={index}>
            <InputGroup hasValidation>
                <InputGroup.Text>{`${LocalizationService.example} ${index + 1}:`}</InputGroup.Text>
                <Form.Control
                    type="text"
                    value={example.inputText}
                    placeholder={LocalizationService.exampleInputPlaceholder}
                    isValid={props.isValid ? undefined : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index, ExamplePart.Input)}
                />
                <Form.Control
                    type="text"
                    value={example.outputText}
                    placeholder={LocalizationService.exampleOutputPlaceholder}
                    isValid={props.isValid ? undefined : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index, ExamplePart.Output)}
                />
                <Button variant={index === 0 ? 'outline-secondary' : 'outline-danger'}
                    disabled={index === 0}
                    onClick={() => onRemoveExample(index)}>
                    {<X />}
                </Button>
            </InputGroup>
        </Form.Group>
    );

    return (<>
        {props.values.map((x, i) => example(x, i))}
        <Form.Group>
            <Button onClick={onAddExample}>{LocalizationService.addExample}</Button>
        </Form.Group>
    </>);
}
