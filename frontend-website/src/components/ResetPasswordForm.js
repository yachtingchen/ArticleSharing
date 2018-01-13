import React, { PropTypes } from 'react';
import { Button, Form, Message, Container } from 'semantic-ui-react';
import intl from '../utils/intl';

const ResetPasswordForm = ({
  onSubmit,
  onChange,
  errors
}) => (
  <Container>
    <Form error onSubmit={onSubmit}>
      <Message error content={errors.summary}/>

      <Form.Input name="password" type="password" label={intl.PASSWORD} onChange={onChange}/>
      <Message error content={errors.password}/>

      <Form.Input name="passwordConfirm" type="password" label={intl.PASSWORD_CONFIRM} onChange={onChange}/>
      <Message error content={errors.passwordConfirm}/>

      <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>

    </Form>
  </Container> 
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default ResetPasswordForm;
