import React from 'react';

import { RatData } from '../../types';
import { DEFAULT_NICK_NAME } from '../../Const';

const Rat = (props: RatData) => {
    const { width, height, nickname = DEFAULT_NICK_NAME } = props;

    return (
        <div>
            <div>width: {width}</div>
            <div>height: {height}</div>
            <div>nickname: {nickname}</div>
        </div>
    );
};

export default Rat;
