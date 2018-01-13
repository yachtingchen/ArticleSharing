import React, { PropTypes } from 'react';
import intl from '../utils/intl';
import { Button, Form, Message, Container, Image, Header } from 'semantic-ui-react';

const MemberEditForm = ({
  onSubmit,
  onChange,
  errors,
  name,
  email
}) => (
<Container>
    <Form error onSubmit={onSubmit}>
      <Header as="h2">
        <Image src={require('../images/reminder_ic.png')} />
        {' ' + intl.EDIT_DATA_PWD}
      </Header>

      <Message error content={errors.summary}/>

      <Form.Input name="name" label={intl.NICK_NAME} onChange={onChange}
        value={name}/>
      <Message error content={errors.name}/>

      <Form.Input name="email" label={intl.EMAIL} onChange={onChange}
        value={email}/>
      <Message error content={errors.email}/>

      <Form.Input name="oldPassword" type="password" label={intl.PLZ_INPUT_OLD_PWD} onChange={onChange}/>
      <Message error content={errors.oldPassword}/>

      <Form.Input name="newPassword" type="password" label={intl.PLZ_INPUT_NEW_PWD} onChange={onChange}/>
      <Message error content={errors.newPassword}/>

      <Form.Input name="newPasswordConfrim" type="password" label={intl.PLZ_INPUT_NEW_PWD_AGAIN} onChange={onChange}/>
      <Message error content={errors.newPasswordConfrim}/>

      <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>
    </Form>
  </Container> 
);

MemberEditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default MemberEditForm;
