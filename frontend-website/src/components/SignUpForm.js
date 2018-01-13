import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import intl from '../utils/intl';
import { Button, Form, Message, Container, Divider, Image } from 'semantic-ui-react';
/*eslint-disable react/no-danger*/

const linkStyle = {
  padding: '5px',
  textDecoration: 'underline'
};

const SignUpForm = ({
  onSubmit,
  onChange,
  onChangeCaptchaText,
  onRefreshCaptcha,
  errors,
  captchaInfo
}) => (
  <Container>
    <Form error onSubmit={onSubmit}>
      <Image src={require('../images/register_title.png')} centered />

      <Message error content={errors.summary}/>

      <Form.Input name="name" label={intl.NICK_NAME} onChange={onChange}/>
      <Message error content={errors.name}/>

      <Form.Input name="email" label={intl.EMAIL} onChange={onChange}/>
      <Message error content={errors.email}/>

      <Form.Input name="emailConfirm" label={intl.EMAIL_CONFIRM} onChange={onChange}/>
      <Message error content={errors.emailConfirm}/>

      <Form.Input name="password" type="password" label={intl.PASSWORD} onChange={onChange}/>
      <Message error content={errors.password}/>

      <Form.Input name="passwordConfirm" type="password" label={intl.PASSWORD_CONFIRM} onChange={onChange}/>
      <Message error content={errors.passwordConfirm}/>

      {/* OOO <Form.Input name="captchaText" label={intl.CAPTCHA_CODE} onChange={onChangeCaptchaText}/>
      <Message error content={errors.captcha}/>

      <div>
        <span dangerouslySetInnerHTML={{__html: captchaInfo.svgImg}} />
        <Button size="tiny" onClick={onRefreshCaptcha}>{intl.REFRESH}</Button>
      </div>      */}

      <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>

      <Divider/>
      <div/>
      <Link style={linkStyle} to={'/forget_pwd'}>{intl.ALREADY_HAVE_ACCOUNT_Q}</Link>
    </Form>
  </Container> 
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCaptchaText: PropTypes.func.isRequired,
  onRefreshCaptcha: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  captchaInfo: PropTypes.object.isRequired
};

export default SignUpForm;
