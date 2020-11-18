import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'
import Issue from '../pages/Issue'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/project/:slug+" component={Project} isPrivate />
        <Route path="/issue/:slugNumber+" component={Issue} isPrivate />
    </Switch>
)

export default Routes
