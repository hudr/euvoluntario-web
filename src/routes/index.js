import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'

const Routes = () => (
  <Switch>
    <Route path="/entrar" exact component={SignIn} />
    <Route path="/cadastrar" exact component={SignUp} />
    <Route path="/painel" exact component={Dashboard} isPrivate />
  </Switch>
)

export default Routes
