import { AddTrailingSlash } from '../../helpers/urlHelper';

describe('urlHelper tests', () => {
    it('AddTrailingSlash - trailinig slash is added', () => {
        // Arrange & Act
        const result = AddTrailingSlash('some/url');

        // Arrange
        expect(result).toBe('some/url/');
    });

    it('AddTrailingSlash - trailinig slash is not added', () => {
        // Arrange & Act
        const result = AddTrailingSlash('some/url/');

        // Arrange
        expect(result).toBe('some/url/');
    });
});


