import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Rat from './index';

import { DEFAULT_NICK_NAME } from '../../Const';

const DATA = { width: 1, height: 2, nickname: 'test' };
const { nickname, ...DATA_NO_NICKNAME } = DATA;

describe('Rat', () => {
    it('renders without crashing', () => {
        render(<Rat {...DATA} />);
    });

    it('renders default nickname', () => {
        expect(
            render(<Rat {...DATA_NO_NICKNAME} />).getByText(
                `nickname: ${DEFAULT_NICK_NAME}`
            )
        ).toBeDefined();
    });

    it('snapshots', () => {
        const tree = renderer.create(<Rat {...DATA} />).toJSON();

        const treeWithoutNickName = renderer
            .create(<Rat {...DATA_NO_NICKNAME} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
        expect(treeWithoutNickName).toMatchSnapshot();
    });
});
