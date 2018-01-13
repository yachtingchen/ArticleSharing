import React, { PropTypes } from 'react';
import { Container, Form, Button, Dropdown, Label, Message, Dimmer, Loader } from 'semantic-ui-react';
import intl from '../utils/intl';
import QuillEditor from './QuillEditor';
import ImageUpload from './ImageUpload';

const dimmerStyle = {
    backgroundColor: 'rgba(80,80,80,0.8)'
};

const WorkEditForm = (props) => (
  <Container>
    <Form error onSubmit={props.onSubmit}>

      <Form.Field>
        <label>{intl.STATUS}</label>
        <Form.Group inline>
          <Form.Radio label={intl.VISIBLE} name="isVisible" value="true"
            checked={props.isVisible === true} onChange={props.onChange} />
          <Form.Radio label={intl.HIDDEN} name="isVisible" value="false"
            checked={props.isVisible === false} onChange={props.onChange} />
        </Form.Group>
      </Form.Field>

      <Form.Field>
        <label>{intl.SHOW_IN_FRONT_PAGE}</label>
        <Form.Group inline>
          <Form.Radio label={intl.NO} name="showInFrontPage" value="false"
            checked={props.showInFrontPage === false} onChange={props.onChange} />
          <Form.Radio label={intl.YES} name="showInFrontPage" value="true" 
            checked={props.showInFrontPage === true} onChange={props.onChange} />
        </Form.Group>
      </Form.Field>

      <Form.Field control={Dropdown} text={intl.MAIN_CATEGORY} >
        <Dropdown.Menu>
          <Dropdown.Divider><Label>Category Number 1</Label></Dropdown.Divider>
          <Dropdown.Item text="" disabled/>
          <Dropdown.Item text="AAA" />
          <Dropdown.Item text="AAA" />
          <Dropdown.Divider><Label>Category Number 2</Label></Dropdown.Divider>
          <Dropdown.Item text="" disabled/>
          <Dropdown.Item text="AAA" />
          <Dropdown.Item text="AAA" />
        </Dropdown.Menu>
      </Form.Field>

      <Form.Input name="title" label={intl.WORK_NAME} onChange={props.onChange} value={props.title}/>
      <Message error content={props.errors.title}/>

      <Form.Input name="serial" label={intl.WORK_SERIAL_AND_MODEL + '(' + intl.OPTIONAL + ')'} onChange={props.onChange} value={props.serial}/>
      <Message error content={props.errors.serial}/>

      <Form.Field>
        <label>{intl.WORK_PICTURE}</label>
        <ImageUpload name="workImgUrl" onChange={props.onChange} imgUrl={props.workImgUrl}/>
        <Message error content={props.errors.workImgUrl}/>
      </Form.Field>

      <Form.Field>
        <label>{intl.WORK_DETAIL_DESCRIPTION}</label>      
        <QuillEditor name="workDesc" onChange={props.onChange} value={props.workDesc}/>
        <Message error content={props.errors.workDesc}/>
      </Form.Field>

      <Form.Field>
        <label>{intl.DOWNLOAD_INSTRUCTION}</label>
        <QuillEditor name="downloadInstruction" onChange={props.onChange} value={props.downloadInstruction}/>
        <Message error content={props.errors.downloadInstruction}/>
      </Form.Field>
      
      <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>
    </Form>
    <Dimmer style={dimmerStyle}
      active={props.isProcessing}
      page
    >
      <Loader indeterminate size="massive">{intl.SAVING}</Loader>
    </Dimmer>
  </Container>
);

WorkEditForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  showInFrontPage: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  serial: PropTypes.string.isRequired,
  workImgUrl: PropTypes.string.isRequired,
  workDesc: PropTypes.object.isRequired,
  downloadInstruction: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
    serial: PropTypes.string,
    workImgUrl: PropTypes.string,
    workDesc: PropTypes.string,
    downloadInstruction: PropTypes.string,
  }).isRequired,
};

export default WorkEditForm;
