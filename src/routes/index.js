import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './route'

import Login from '../pages/Login'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    {/* <Route path="/dashboard" exact component={Dashboard} isPrivate /> */}
  </Switch>
)

export default Routes
