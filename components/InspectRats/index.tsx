import React, { Component } from 'react';
import axios from 'axios';

import Rat from '../Rat/index';

import { RatName, RatData, RatDataMap } from '../../types';
import { EMPTY_RAT_OPTION } from '../../Const';

import getKeyValue from '../../utils/types/getKeyValue';

import './styles.css';

type InspectRatsProps = {
    rats: string[];
};

interface InspectRatsState {
    currentRatName: RatName;
    ratDataMap: RatDataMap;
    loading: boolean;
}

class InspectRats extends Component<InspectRatsProps, InspectRatsState> {
    state = {
        currentRatName: EMPTY_RAT_OPTION.val,
        loading: false,
        ratDataMap: {},
    };

    static defaultProps = {
        rats: [],
    };

    loadRatData(name: RatName) {
        if (!name || this.getRatData(name)) {
            return this.setState({ currentRatName: name });
        }

        this.setState({ currentRatName: name, loading: true }, () => {
            axios
                .get(`http://localhost:7421/rat/${name}`)
                .then(({ data }) => this.onRatDataLoaded(name, data))
                .catch((e) => console.error(e));
        });
    }

    onRatDataLoaded(name: RatName, data: RatData) {
        this.setState((state: InspectRatsState) => {
            loading: false,
            ratDataMap: {
                ...state.ratDataMap,
                [name]: data,
            },
        });
    }

    getRatData(name: RatName) {
        return getKeyValue<RatDataMap, keyof RatDataMap>(
            this.state.ratDataMap,
            name
        );
    }

    render() {
        const { rats } = this.props;
        const { currentRatName, loading } = this.state;
        const currentRatData: RatData | undefined = this.getRatData(
            currentRatName
        );

        return (
            <div className={'InspectRats'}>
                <div className={'InspectRat__select'}>
                    <select
                        disabled={loading}
                        onChange={(e) => this.loadRatData(e.target.value)}
                        defaultValue={EMPTY_RAT_OPTION.val}
                    >
                        <option
                            key={EMPTY_RAT_OPTION.label}
                            value={EMPTY_RAT_OPTION.val}
                        >
                            {EMPTY_RAT_OPTION.label}
                        </option>
                        {rats.map((r: string) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>
                {loading && 'Loading...'}
                {currentRatData && (
                    <div className={'InspectRat__data'}>
                        <Rat {...currentRatData} />
                    </div>
                )}
            </div>
        );
    }
}

export default InspectRats;
