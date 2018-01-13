import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import * as actions from '../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import intl from '../utils/intl';
import { Menu } from 'semantic-ui-react';
import isMobile from '../utils/isMobile';

// const backgroundStyle = {
//   background: `url(../images/body_bg.png) rgb(238, 238, 238)`,
// };

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.logoutLogic = this.logoutLogic.bind(this);    
  }

  componentDidMount() {
    isMobile();
  }

  logoutLogic() {
    Auth.deauthenticateUser();
    this.props.actions.setAuth(null);
  }

  render() {        

    return (
      <div>
        <Menu stackable>
          <Menu.Item as={IndexLink} to="/">Home</Menu.Item>
          {Auth.isAdminLoggedIn()? <Menu.Item as={Link} to="/work_mgmt">Dashboard</Menu.Item> : null}
          {Auth.isUserAuthenticated() ? <Menu.Item as={Link} to="/work_edit">Add New Card</Menu.Item> : null}
          {Auth.isUserAuthenticated() ? <Menu.Item as={Link} to="/logout" onClick={this.logoutLogic}>{intl.LOGOUT}</Menu.Item> : null}
          {Auth.isUserAuthenticated() ? <Menu.Item as={Link} to="/member_edit">{intl.EDIT_DATA_PWD}</Menu.Item> : null}
          {Auth.isUserAuthenticated() ? null : <Menu.Item as={Link} to="/login">{intl.LOGIN}</Menu.Item>}
          {Auth.isUserAuthenticated() ? null : <Menu.Item as={Link} to="/signup">{intl.SIGN_UP}</Menu.Item>}
          <Menu.Item as={Link} to="/about">About</Menu.Item>
        </Menu>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);