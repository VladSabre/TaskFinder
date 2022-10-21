import React from 'react';

import { Spinner } from 'react-bootstrap';
import LocalizationService from '../../helpers/localizationService';

import './LoaderComponent.scss';

export default function Loader(): JSX.Element {
    return (
        <Spinner animation="border" role="status" className="loader">
            <span className="visually-hidden">{LocalizationService.loading}</span>
        </Spinner>
    );
}