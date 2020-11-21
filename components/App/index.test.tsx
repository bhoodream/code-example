import React from 'react';
import renderer from 'react-test-renderer';
import { render, waitForElement } from '@testing-library/react';

import createTestServer from '../../utils/tests/createTestServer';

import App from './index';

const server = createTestServer();

server.get('http://localhost:7421/rat-names', () => ['rat1', 'rat2', 'rat3']);

describe('App', () => {
    it('renders without crashing', async () => {
        const { getByText } = render(<App />);

        await waitForElement(() => getByText('rat1'));
    });

    it('get rats', async () => {
        const { getByText } = render(<App />);

        expect(getByText('Loading...')).toBeDefined();

        await waitForElement(() => getByText('No Rat'));

        const selectedOption = getByText('No Rat') as HTMLOptionElement;

        expect(selectedOption.selected).toBe(true);

        await waitForElement(() => getByText('rat1'));
        await waitForElement(() => getByText('rat2'));
        await waitForElement(() => getByText('rat3'));
    });

    it('snapshots', async () => {
        const tree = renderer.create(<App />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
