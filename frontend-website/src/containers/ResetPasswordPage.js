import React, { PropTypes } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import {API_SRV_ORIGIN} from '../constants/envConfig';

class ResetPasswordPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      email: ''
    };

    this.processForm = this.processForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const password = encodeURIComponent(this.state.password);    
    const passwordConfirm = encodeURIComponent(this.state.passwordConfirm);
    /*eslint-disable react/prop-types */
    const token = encodeURIComponent(this.props.params.token);
    /*eslint-enable react/prop-types */
    const formData = `password=${password}&passwordConfirm=${passwordConfirm}&token=${token}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_SRV_ORIGIN}/auth/reset_pwd`);
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
      <ResetPasswordForm
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
        errors={this.state.errors}
      />
    );
  }

}

ResetPasswordPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ResetPasswordPage;
