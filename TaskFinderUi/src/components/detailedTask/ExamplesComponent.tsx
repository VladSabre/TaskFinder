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
            return (<div key={x.Id}>
                <strong>{`${LocalizationService.example} ${x.Index}:`}</strong>
                <Alert key={x.Id} variant="secondary">
                    <p><strong>{LocalizationService.input}</strong> {x.InputText}</p>
                    <p><strong>{LocalizationService.output}</strong> {x.OutputText}</p>
                    <p><strong>{LocalizationService.explanation}</strong> {x.Explanation}</p>
                </Alert>
            </div>);
        });

    return (<>
        {examples}
    </>);
}