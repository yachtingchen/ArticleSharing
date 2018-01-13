import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import objectAssign from 'object-assign';
import {Label} from 'semantic-ui-react';

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('signupSuccessMessage');
    let signupSuccessMessage = '';

    if (storedMessage) {
      signupSuccessMessage = storedMessage;
      localStorage.removeItem('signupSuccessMessage');
    }

    // set the initial component state
    this.state = {
      captchaInfo: {
        svgImg: '',
        cipherText: '',
        text: ''
      },
      errors: {},
      signupSuccessMessage,
      user: {
        email: 'test3@g.com',
        password: '1234'
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

    this.changeCaptchaText = this.changeCaptchaText.bind(this);
    this.refreshCaptcha = this.refreshCaptcha.bind(this);    
  }

  /*eslint-disable react/sort-comp */

  refreshCaptcha(event) {
    if (event) event.preventDefault();
    axios.get(`${API_SRV_ORIGIN}/auth/captcha?time=${new Date().getMilliseconds().toString()}`) //add time param to prevent cache in IE11, see http://stackoverflow.com/questions/26973097/jquery-ajax-only-works-in-ie-when-the-ie-debugger-is-open
      .then(res => {
        this.setState({ captchaInfo: res.data });
      });
  }

  componentDidMount() {
    this.refreshCaptcha();
  }
  /*eslint-enable react/sort-comp */

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    axios.post(`${API_SRV_ORIGIN}/auth/login`, {
      email: this.state.user.email,
      password: this.state.user.password,
      captchaText: this.state.captchaInfo.text,
      captchaCipherText: this.state.captchaInfo.cipherText
    })
    .then((response) => {

      this.setState({
        errors: {}
      });
      const userInfo = {
        name: response.data.user.name,
        email: this.state.user.email,
        isAdmin: response.data.user.isAdmin
      };
      Auth.authenticateUser(response.data.token, userInfo);
      this.props.actions.setAuth(userInfo);
      // change the current URL to /
      return this.context.router.replace('/');
    })
    .catch((axiosErr) => {
      const errors = axiosErr.response.data.errors ? axiosErr.response.data.errors : {};
      errors.summary = axiosErr.response.data.message;
      this.setState({
        errors
      });
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  changeCaptchaText(event) {
    this.setState({ captchaInfo:  objectAssign(this.state.captchaInfo, { text: event.target.value}) });
  }

  render() {
    return (
      <div>
        <Label>&nbsp;&nbsp; Click "Login" to login as default admin user (test3@g.com/1234) </Label>
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        signupSuccessMessage={this.state.signupSuccessMessage}
        onChangeCaptchaText={this.changeCaptchaText}
        onRefreshCaptcha={this.refreshCaptcha}
        captchaInfo={this.state.captchaInfo}
      />
      </div>
    );
  }

}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
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
)(LoginPage);
