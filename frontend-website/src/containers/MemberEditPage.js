import React, { PropTypes } from 'react';
import MemberEditForm from '../components/MemberEditForm';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Auth from '../modules/Auth';
import {API_SRV_ORIGIN} from '../constants/envConfig';

class MemberEditPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    // set the initial component state
    this.state = {
      errors: {},
      //properties below are for storing user input
      name: this.props.loggedInUser.name,
      email: this.props.loggedInUser.email,
      oldPassword: '',
      newPassword: '',
      newPasswordConfrim: ''
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
    const name = encodeURIComponent(this.state.name);
    const email = encodeURIComponent(this.state.email);
    const oldPassword = encodeURIComponent(this.state.oldPassword);
    const newPassword =  encodeURIComponent(this.state.newPassword);
    const newPasswordConfrim = encodeURIComponent(this.state.newPasswordConfrim);
    const formData = `name=${name}&email=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}&newPasswordConfrim=${newPasswordConfrim}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_SRV_ORIGIN}/api/member_edit`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        const userInfo = {
          name: this.state.name,
          email: this.state.email
        };

        this.props.actions.setAuth(userInfo);
        this.context.router.replace('/member_edit_success');
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
      <MemberEditForm
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        name={this.state.name}
        email={this.state.email}
      />
    );
  }

}

MemberEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired
};

MemberEditPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      loggedInUser: state.loggedInUser
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
)(MemberEditPage);
