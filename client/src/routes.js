import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/Register_login/register';
import Shop from './components/Shop';
import ProductPage from './components/Product';

import UserDashboard from './components/user';
import AddProduct from './components/user/Admin/add_product';
import ManageCategories from './components/user/Admin/manage_categories';
import UserCart from './components/user/cart';
import UpdateProfile from './components/user/update_profile';
import ManageSite from './components/user/Admin/manage_site';
const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>

        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>

  )
}

export default Routes;
