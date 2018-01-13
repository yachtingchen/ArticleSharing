import React, { PropTypes } from 'react';
import { Segment, Container, Image, Header, Divider, Button, Icon } from "semantic-ui-react";
import Config from '../constants/Config';
import QuillView from './QuillView';

const defaultFontStyle = {
  fontFamily: Config.DEFAULT_FONT_FAMILIES + ' !important'
};

const WorkView = (props) => (
    <div style={defaultFontStyle}>
    <Container>

      <Segment raised textAlign="left">
          <Header as="span" size="large" color="green">Movie</Header>
          <Header as="span" size="large">&nbsp;&nbsp;|&nbsp;&nbsp;</Header>
          <Header as="span" size="large">{props.title}</Header>
          {
            props.isAdmin ? 
              <Button icon floated="right" size="tiny" onClick={props.onEdit}>
                Edit{' '}
                <Icon name="edit" />
              </Button> 
              : null
          }
          <Divider/>  
          <Image size="huge" centered src={props.workImgUrl}/>                    
      </Segment>
      
      <Segment padded raised size="large">
          <QuillView delta={props.workDesc} />
      </Segment>
      

      <Segment padded raised size="large">
          <QuillView delta={props.downloadInstruction} />
      </Segment>
            
    </Container>
    </div>
);

WorkView.propTypes = {    
    title: PropTypes.string.isRequired,
    workImgUrl: PropTypes.string.isRequired,
    workDesc: PropTypes.object.isRequired,    
    downloadInstruction: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default WorkView;