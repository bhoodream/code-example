import React from 'react';
import renderer from 'react-test-renderer';
import { render, act, fireEvent, waitForElement } from '@testing-library/react';

import createTestServer from '../../utils/tests/createTestServer';

import InspectRats from './index';

const RATS = ['rat1', 'rat2', 'rat3'];
const server = createTestServer();

describe('InspectRats', () => {
    it('renders without crashing', () => {
        render(<InspectRats rats={RATS} />);
    });

    it('get rat data', async () => {
        server.get('http://localhost:7421/rat/rat2', () => ({
            width: 3,
            height: 4,
            nickname: 'nick of rat2',
        }));

        const { getByRole, getByText, queryByText } = render(
            <InspectRats rats={RATS} />
        );
        const select = getByRole('combobox');

        act(() => {
            fireEvent.change(select, { target: { value: 'rat2' } });
        });

        const selectedOption = getByText('rat2') as HTMLOptionElement;

        expect(select.hasAttribute('disabled')).toBe(true);
        expect(selectedOption.selected).toBe(true);
        expect(getByText('Loading...')).toBeDefined();

        await waitForElement(() => getByText('width: 3'));
        await waitForElement(() => getByText('height: 4'));
        await waitForElement(() => getByText('nickname: nick of rat2'));

        expect(queryByText('Loading...')).toBeNull();
    });

    it('snapshots', () => {
        const tree = renderer.create(<InspectRats rats={RATS} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
