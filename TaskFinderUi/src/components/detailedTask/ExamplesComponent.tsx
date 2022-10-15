import React from 'react';
import { Alert } from 'react-bootstrap';
import LocalizationService from '../../helpers/localizationService';
import { Example } from '../../models/Example';

import './ExamplesComponent.scss';

interface ExamplesProps {
    data: Example[];
}

export default function Examples(props: ExamplesProps): JSX.Element {
    const renderExplanation = React.useCallback((explanation: string | undefined) => {
        if (!!explanation && explanation.trim() === '')
            return (
                <p><strong>{LocalizationService.explanation}</strong>{explanation}</p>
            );
    }, []);

    const examples = props.data
        .map(x => {
            return (<div key={x.id}>
                <strong>{`${LocalizationService.example} ${x.index + 1}:`}</strong>
                <Alert key={x.id} variant="secondary" className="examples-container">
                    <p><strong>{LocalizationService.input}</strong> {x.inputText}</p>
                    <p><strong>{LocalizationService.output}</strong> {x.outputText}</p>
                    {renderExplanation(x.explanation)}
                </Alert>
            </div>);
        });

    return (<>
        {examples}
    </>);
}