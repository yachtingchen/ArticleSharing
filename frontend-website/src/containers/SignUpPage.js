import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import objectAssign from 'object-assign';

class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      captchaInfo: {
        svgImg: '',
        cipherText: '',
        text: ''
      },
      errors: {},
      user: {
        email: '',
        emailConfirm: '',
        name: '',
        password: '',
        passwordConfirm: ''
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

  /*eslint-enable react/sort-comp */

  componentDidMount() {
    this.refreshCaptcha();
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const passwordConfirm = encodeURIComponent(this.state.user.passwordConfirm);
    const emailConfirm = encodeURIComponent(this.state.user.emailConfirm);
    const captchaText =  encodeURIComponent(this.state.captchaInfo.text);
    const captchaCipherText = encodeURIComponent(this.state.captchaInfo.cipherText);
    const formData = `name=${name}&email=${email}&emailConfirm=${emailConfirm}&password=${password}&passwordConfirm=${passwordConfirm}&captchaText=${captchaText}&captchaCipherText=${captchaCipherText}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_SRV_ORIGIN}/auth/signup`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        const responseObject = typeof xhr.response === 'string' ?
          JSON.parse(xhr.response) : //for IE11
          xhr.response;
        localStorage.setItem('signupSuccessMessage', responseObject.message);

        // make a redirect
        this.context.router.replace('/login');
      } else {
        // failure
        const responseObject = typeof xhr.response === 'string' ?
            JSON.parse(xhr.response) : //for IE11
            xhr.response;
        
        const errors = responseObject.errors ? responseObject.errors : {};
        errors.summary = responseObject.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const user = this.state.user;
    user[event.target.name] = event.target.value;//update name, email, emailConfirm, password and passwordConfirm

    this.setState({ user });
  }

  changeCaptchaText(event) {
    this.setState({ captchaInfo:  objectAssign(this.state.captchaInfo, { text: event.target.value}) });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        onChangeCaptchaText={this.changeCaptchaText}
        onRefreshCaptcha={this.refreshCaptcha}
        errors={this.state.errors}        
        user={this.state.user}    
        captchaInfo={this.state.captchaInfo}      
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
