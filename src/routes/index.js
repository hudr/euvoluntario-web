import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Charity from '../pages/Charity'
import Charities from '../pages/Charities'
import Volunteers from '../pages/Volunteers'
import Entities from '../pages/Entities'
import CreateCharity from '../pages/CreateCharity'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

import Teste from '../pages/Teste'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Teste} />
    <Route path="/entrar" exact component={SignIn} />
    <Route path="/cadastrar" exact component={SignUp} />
    <Route path="/esqueci-minha-senha" exact component={ForgotPassword} />
    <Route path="/resetar-senha" exact component={ResetPassword} />
    <Route path="/painel" exact component={Dashboard} isPrivate />
    <Route path="/painel/perfil" exact component={Profile} isPrivate />
    <Route path="/painel/cadastrar" exact component={CreateCharity} isPrivate />
    <Route path="/painel/caridades" exact component={Charities} isPrivate />
    <Route path="/painel/voluntarios" exact component={Volunteers} isPrivate />
    <Route path="/painel/entidades" exact component={Entities} isPrivate />

    <Route
      path="/painel/caridade/:charityId"
      exact
      component={Charity}
      isPrivate
    />
  </Switch>
)

export default Routes
