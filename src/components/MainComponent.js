import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingScreen from './landing-screen/LandingPage';
import BranchCommits from './branch-commits/BranchCommits';

function MainComponent() {
    return (
        <Switch>
            <Route exact path="/landing-screen" component={LandingScreen} />
            <Route exact path="/landing-screen/branch-commits" component={BranchCommits} />

            <Redirect to="/landing-screen" />
        </Switch>
    )
}

export default MainComponent;