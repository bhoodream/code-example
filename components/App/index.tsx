import 'destyle.css';
import React, { Component } from 'react';
import axios from 'axios';

import InspectRats from '../InspectRats/index';

import { Rats } from '../../types';

type AppProps = {
    [K in any]: never;
};

interface AppState {
    rats: Rats;
}

class App extends Component<AppProps, AppState> {
    state = {
        rats: [],
    };

    componentDidMount() {
        this.loadRats();
    }

    loadRats() {
        axios
            .get('http://localhost:7421/rat-names')
            .then(({ data }) => this.onRatsLoaded(data))
            .catch((e) => console.error(e));
    }

    onRatsLoaded(rats: Rats) {
        this.setState({ rats });
    }

    render() {
        const { rats } = this.state;

        if (!rats.length) {
            return 'Loading...';
        }

        return (
            <div className={'App'}>
                <InspectRats rats={rats} />
            </div>
        );
    }
}

export default App;
