import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'
import ProjectAdd from '../pages/ProjectAdd'
import IssueAdd from '../pages/IssueAdd'
import CommentAdd from '../pages/CommentAdd'
import Issue from '../pages/Issue'

import NotFound from '../pages/NotFound'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/project/:slug+/new" component={IssueAdd} isPrivate />
        <Route path="/project/:slug+" component={Project} isPrivate />
        <Route path="/newProject" component={ProjectAdd} isPrivate />
        <Route path="/issue/:slugNumber+/new" component={CommentAdd} isPrivate />
        <Route path="/issue/:slugNumber+" component={Issue} isPrivate />
        <Route path="/newIssue" component={IssueAdd} isPrivate />

        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
    </Switch>
)

export default Routes
