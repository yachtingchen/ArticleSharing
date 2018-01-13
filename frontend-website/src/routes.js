import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import ForgetPasswordPage from './containers/ForgetPasswordPage';
import ResetPasswordPage from './containers/ResetPasswordPage';
import DashboardPage from './containers/DashboardPage';
import MemberEditPage from './containers/MemberEditPage';
import MemberEditSuccessPage from './components/MemberEditSuccessPage';
import WorkEditPage from './containers/WorkEditPage';
import WorkViewPage from './containers/WorkViewPage';
import CategoryMgmtPage from './containers/CategoryMgmtPage';
import WorkMgmtPage from './containers/WorkMgmtPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={(nextState, replace) => {replace('/');}}/>
    <Route path="signup" component={SignUpPage}/>
    <Route path="forget_pwd" component={ForgetPasswordPage}/>
    <Route path="reset_pwd/:token" component={ResetPasswordPage}/>
    <Route path="dashboard" component={DashboardPage}/>
    <Route path="member_edit" component={MemberEditPage}/>
    <Route path="member_edit_success" component={MemberEditSuccessPage}/>
    <Route path="work_edit" component={WorkEditPage}/>
    <Route path="work_edit/:id" component={WorkEditPage}/>
    <Route path="works/:id" component={WorkViewPage}/>
    <Route path="work_mgmt" component={WorkMgmtPage}/>
    <Route path="category_mgmt" component={CategoryMgmtPage}/>    
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
