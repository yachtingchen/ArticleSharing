import React, { PropTypes } from 'react';
import ForgetPasswordForm from '../components/ForgetPasswordForm';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';


class ForgetPasswordPage extends React.Component {

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
      email: ''
    };

    this.processForm = this.processForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.email);
    const captchaText =  encodeURIComponent(this.state.captchaText);
    const captchaCipherText = encodeURIComponent(this.state.captchaInfo.cipherText);
    const formData = `email=${email}&captchaText=${captchaText}&captchaCipherText=${captchaCipherText}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_SRV_ORIGIN}/auth/forget_pwd`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // change the current URL to /
        this.context.router.replace('/');
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
   * @param {object} event - the JavaScript event object
   */
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <ForgetPasswordForm
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        onRefreshCaptcha={this.refreshCaptcha}
        captchaInfo={this.state.captchaInfo}
      />
    );
  }

}

ForgetPasswordPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ForgetPasswordPage;
