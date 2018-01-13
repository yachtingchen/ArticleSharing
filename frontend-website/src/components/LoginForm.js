import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import intl from '../utils/intl';
import { Button, Form, Message, Container, Divider, Image } from 'semantic-ui-react';
/*eslint-disable react/no-danger*/

const linkStyle = {
  padding: '5px',
  textDecoration: 'underline'
};

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  signupSuccessMessage,
  onChangeCaptchaText,
  onRefreshCaptcha,
  captchaInfo
}) => (
  <Container>
    <Form error onSubmit={onSubmit}>
      <Image src={require('../images/login_title.png')} centered />

      {signupSuccessMessage &&<Message positive content={signupSuccessMessage}/>}
      <Message error content={errors.summary}/>

      <Form.Input name="email" label={intl.EMAIL} onChange={onChange} value="test3@g.com"/>
      <Message error content={errors.email}/>

      <Form.Input name="password" type="password" label={intl.PASSWORD} onChange={onChange} value="1234"/>
      <Message error content={errors.password}/>

      {/* OOO <Form.Input name="captchaText" label={intl.CAPTCHA_CODE} onChange={onChangeCaptchaText}/>
      <Message error content={errors.captcha}/>

      <div>
        <span dangerouslySetInnerHTML={{__html: captchaInfo.svgImg}} />
        <Button size="tiny" onClick={onRefreshCaptcha}>{intl.REFRESH}</Button>
      </div>      */}

      <Button primary type="submit">{intl.LOGIN}</Button>

      <Divider/>
      <div/>
      <Link style={linkStyle} to={'/forget_pwd'}>{intl.FORGET_PWD_Q}</Link>
      <Link style={linkStyle} to={'/signup'}>{intl.CREATE_AN_ACCOUNT_FAST}</Link>
    </Form>
  </Container>  
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  signupSuccessMessage: PropTypes.string.isRequired,
  onChangeCaptchaText: PropTypes.func.isRequired,
  onRefreshCaptcha: PropTypes.func.isRequired,
  captchaInfo: PropTypes.object.isRequired
};

export default LoginForm;
