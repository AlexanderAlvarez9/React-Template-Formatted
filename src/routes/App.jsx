import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../assets/styles/containers/App.scss'
import Layout from '../containers/Layout'
import Error404 from '../pages/Error404';
import Login from '../components/Login/Login';
import Index from '../components/Index';
import Users from '../components/Users/Users';
import { UserContexts } from '../utils/UserContexts'

const App = () => {

  return (
    <UserContexts.Provider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/error" component={Error404} />
            <Route component={Index} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </UserContexts.Provider>
  )
}

export default App;