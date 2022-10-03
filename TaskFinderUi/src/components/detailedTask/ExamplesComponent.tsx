import React from 'react';
import { Alert } from 'react-bootstrap';
import LocalizationService from '../../helpers/localizationService';
import { Example } from '../../models/Example';

interface ExamplesProps {
    data: Example[];
}

export default function Examples(props: ExamplesProps): JSX.Element {
    const examples = props.data
        .map(x => {
            return (<div key={x.id}>
                <strong>{`${LocalizationService.example} ${x.index}:`}</strong>
                <Alert key={x.id} variant="secondary">
                    <p><strong>{LocalizationService.input}</strong> {x.inputText}</p>
                    <p><strong>{LocalizationService.output}</strong> {x.outputText}</p>
                    <p><strong>{LocalizationService.explanation}</strong> {x.explanation}</p>
                </Alert>
            </div>);
        });

    return (<>
        {examples}
    </>);
}