import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './components/home'
import Layout from './hoc/layout';
import RegisterLogin from './components/register_login'
import Register from './components/register_login/register'
import UserDashboard from './components/user/index'
import Auth from './hoc/auth'


const Routes = () => {
  return (
    <Layout>
        <Switch>
           <Route path="/" exact component={Auth(Home,null)} />
           <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
           <Route path="/register" exact component={Auth(Register,false)} />
           <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
       </Switch>
    </Layout>
  )
}
export default Routes