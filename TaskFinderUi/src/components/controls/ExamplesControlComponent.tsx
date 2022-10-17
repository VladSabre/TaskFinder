import React from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

import LocalizationService from '../../helpers/localizationService';
import { NewExample } from '../../models/Example';

import './ExamplesControlComponent.scss';

interface ExamplesControlProps {
    values: NewExample[];
    areExamplesInvalid: boolean[];
    onChange: (values: NewExample[]) => void;
}

enum ExamplePart {
    Input,
    Output,
    Explanation
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
            case ExamplePart.Explanation:
                example.explanation = newValue;
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
        const examples = props.values;
        examples.splice(index, 1);
        props.onChange(examples);
    }, [props]);

    const [expandedPart, setExpandedPart] = React.useState<ExamplePart | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const example = (example: NewExample, index: number): JSX.Element => (
        <Form.Group className="mb-3 example-row" key={index}>
            <InputGroup.Text className="me-2">{`${LocalizationService.example} ${index + 1}:`}</InputGroup.Text>
            {getControl(ExamplePart.Input, index, example.inputText, LocalizationService.exampleInputPlaceholder)}
            {getControl(ExamplePart.Output, index, example.outputText, LocalizationService.exampleOutputPlaceholder)}
            {getControl(ExamplePart.Explanation, index, example.explanation, LocalizationService.exampleExplanationPlaceholder)}
            <Button variant={index === 0 ? 'outline-secondary' : 'outline-danger'}
                disabled={index === 0}
                onClick={() => onRemoveExample(index)}>
                {<X />}
            </Button>
        </Form.Group >
    );

    const getControl = (part: ExamplePart, index: number, text: string | undefined, placeholder: string) => {
        return (
            <Form.Control className={`me-2 example-row__field ${getControlClass(part, index)}`}
                type="text"
                value={text}
                placeholder={placeholder}
                isInvalid={part == ExamplePart.Explanation ? false : !!props.areExamplesInvalid[index]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index, part)}
                onFocus={() => setExpanded(part, index)}
                onBlur={() => setExpanded(null, null)}
            />
        );
    };

    const getControlClass = (part: ExamplePart, index: number): string => {
        return activeIndex === index && expandedPart === part ? 'example-row__field_active' : '';
    };

    const setExpanded = (part: ExamplePart | null, index: number | null) => {
        setExpandedPart(part);
        setActiveIndex(index);
    };

    return (<>
        {props.values.map((x, i) => example(x, i))}
        <Form.Group>
            <Button onClick={onAddExample}>{LocalizationService.addExample}</Button>
        </Form.Group>
    </>);
}
