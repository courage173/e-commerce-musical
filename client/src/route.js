import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './components/home'
import Layout from './hoc/layout';
import RegisterLogin from './components/register_login'
import Register from './components/register_login/register'
import UserDashboard from './components/user/index'
import Auth from './hoc/auth'
import Shop from './components/Shop'
import AddProduct from './components/user/Admin/addProducts'


const Routes = () => {
  return (
    <Layout>
        <Switch>
           <Route path="/user/add_product" exact component={Auth(AddProduct,true)} />
           <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />

           <Route path="/" exact component={Auth(Home,null)} />
           <Route path="/shop" exact component={Auth(Shop,null)} />
           <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
           <Route path="/register" exact component={Auth(Register,false)} />
       </Switch>
    </Layout>
  )
}
export default Routes