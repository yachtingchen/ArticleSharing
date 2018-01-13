import React, { PropTypes } from 'react';
import intl from '../utils/intl';
import { Button, Form, Message, Container, Image } from 'semantic-ui-react';
/*eslint-disable react/no-danger*/

const ForgetPasswordForm = ({
  onSubmit,
  onChange,
  errors,
  onRefreshCaptcha,
  captchaInfo
}) => (
  <Container>
    <Form error onSubmit={onSubmit}>
      <Image src={require('../images/forgot_title.png')} centered />

      <Message error content={errors.summary}/>

      <Form.Input name="email" label={intl.EMAIL} onChange={onChange}/>
      <Message error content={errors.email}/>

      {/* OOO <Form.Input name="captchaText" label={intl.CAPTCHA_CODE} onChange={onChange}/>
      <Message error content={errors.captcha}/>

      <div>
        <span dangerouslySetInnerHTML={{__html: captchaInfo.svgImg}} />
        <Button size="tiny" onClick={onRefreshCaptcha}>{intl.REFRESH}</Button>
      </div>      */}

      <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>
    </Form>
  </Container>  
);

ForgetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onRefreshCaptcha: PropTypes.func.isRequired,
  captchaInfo: PropTypes.object.isRequired
};

export default ForgetPasswordForm;
